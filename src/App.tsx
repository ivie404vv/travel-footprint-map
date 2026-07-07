import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { MapView } from './components/MapView';
import { StatsPanel } from './components/StatsPanel';
import { RecentTravels } from './components/RecentTravels';
import { Timeline } from './components/Timeline';
import { TravelForm } from './components/TravelForm';
import { DetailCard } from './components/DetailCard';
import { useAuth } from './context/AuthContext';
import * as db from './services/supabase';
import type { TravelRecord, FormInitialData, LatLng } from './types';

export default function App() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const navigate = useNavigate();

  // Records state
  const [records, setRecords] = useState<TravelRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Load records from Supabase
  const loadRecords = useCallback(async () => {
    setDataLoading(true);
    try {
      const data = await db.getRecords();
      setRecords(data);
    } catch (err) {
      console.error('Failed to load records:', err);
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadRecords();
    }
  }, [isAuthenticated, loadRecords]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [formInitialData, setFormInitialData] = useState<FormInitialData | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<TravelRecord | null>(null);
  const [flyTarget, setFlyTarget] = useState<LatLng | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Loading state
  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen bg-[#f5f1eb] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-amber-300 border-t-amber-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  // Click country -> open add form
  const handleCountryClick = useCallback(
    (country: string, countryCode: string, lat: number, lng: number) => {
      setFormInitialData({ country, countryCode, location: { lat, lng } });
      setShowForm(true);
    },
    []
  );

  // Click city marker -> open detail card
  const handleCityClick = useCallback((record: TravelRecord) => {
    setSelectedRecord(record);
    setFlyTarget(record.location);
  }, []);

  // Click map -> close detail
  const handleMapClick = useCallback(() => {
    setSelectedRecord(null);
  }, []);

  // Manual add
  const handleAddClick = useCallback(() => {
    setFormInitialData(null);
    setShowForm(true);
  }, []);

  // Map search → auto-fill form
  const handleCitySearch = useCallback(
    (city: string, country: string, countryCode: string, location: LatLng) => {
      setFlyTarget(location);
      setFormInitialData({ city, country, countryCode, location });
      setShowForm(true);
    },
    []
  );

  // Save record (create or update)
  const handleSave = useCallback(
    async (data: Omit<TravelRecord, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        if (formInitialData?.editId) {
          await db.updateRecord(formInitialData.editId, data);
        } else {
          await db.createRecord(data);
        }
        await loadRecords();
      } catch (err) {
        console.error('Failed to save record:', err);
      }
      setShowForm(false);
      setFormInitialData(null);
    },
    [formInitialData, loadRecords]
  );

  // Edit record
  const handleEdit = useCallback((record: TravelRecord) => {
    setSelectedRecord(null);
    setFormInitialData({ editId: record.id, existingRecord: record });
    setShowForm(true);
  }, []);

  // Delete record
  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await db.deleteRecord(id);
        setRecords(prev => prev.filter(r => r.id !== id));
      } catch (err) {
        console.error('Failed to delete:', err);
      }
      setSelectedRecord(null);
    },
    []
  );

  // Logout
  const handleLogout = useCallback(() => {
    logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header with user info */}
      <Header
        onAddClick={handleAddClick}
        onClearClick={() => setShowClearConfirm(true)}
        hasRecords={records.length > 0}
        userEmail={user?.email}
        onLogout={handleLogout}
        onRefresh={loadRecords}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        <StatsPanel records={records} onCityClick={handleCityClick} />

        <MapView
          records={records}
          flyTarget={flyTarget}
          onCountryClick={handleCountryClick}
          onCityClick={handleCityClick}
          onMapClick={handleMapClick}
          onCitySearch={handleCitySearch}
        />

        <RecentTravels records={records} onCityClick={handleCityClick} />
      </main>

      {/* Timeline */}
      <Timeline records={records} onCityClick={handleCityClick} />

      {/* Form modal */}
      {showForm && (
        <TravelForm
          initialData={formInitialData}
          onClose={() => { setShowForm(false); setFormInitialData(null); }}
          onSave={handleSave}
        />
      )}

      {/* Detail card */}
      {selectedRecord && (
        <DetailCard
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Clear confirm */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowClearConfirm(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 animate-slide-up">
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">清空所有旅行记录？</h3>
              <p className="text-sm text-gray-400">此操作不可恢复，{records.length} 条记录将被永久删除</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                取消
              </button>
              <button
                onClick={async () => {
                  for (const r of records) {
                    try { await db.deleteRecord(r.id); } catch {}
                  }
                  setRecords([]);
                  setShowClearConfirm(false);
                  setSelectedRecord(null);
                }}
                className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors active:scale-[0.98]"
              >
                确认清空
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
