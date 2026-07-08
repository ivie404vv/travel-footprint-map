/**
 * 全球城市数据库
 *
 * 包含 250+ 个主要城市，支持中英文搜索
 * 每个城市包含：名称、中文名、国家、国家代码、经纬度坐标
 */

export interface CityData {
  /** 英文城市名 */
  name: string;
  /** 中文城市名 */
  nameZh: string;
  /** 国家名称 */
  country: string;
  /** 国家中文名 */
  countryZh: string;
  /** ISO 3166-1 alpha-3 国家代码 */
  countryCode: string;
  /** 纬度 */
  lat: number;
  /** 经度 */
  lng: number;
}

/**
 * 全球主要城市列表
 * 按地区排列
 */
export const CITIES: CityData[] = [
  // ========================
  // 东亚 · East Asia
  // ========================
  { name: 'Beijing', nameZh: '北京', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 39.9042, lng: 116.4074 },
  { name: 'Shanghai', nameZh: '上海', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 31.2304, lng: 121.4737 },
  { name: 'Guangzhou', nameZh: '广州', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 23.1291, lng: 113.2644 },
  { name: 'Shenzhen', nameZh: '深圳', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 22.5431, lng: 114.0579 },
  { name: 'Chengdu', nameZh: '成都', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 30.5728, lng: 104.0668 },
  { name: 'Hangzhou', nameZh: '杭州', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 30.2741, lng: 120.1551 },
  { name: 'Nanjing', nameZh: '南京', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 32.0603, lng: 118.7969 },
  { name: 'Xi\'an', nameZh: '西安', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 34.3416, lng: 108.9398 },
  { name: 'Chongqing', nameZh: '重庆', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 29.4316, lng: 106.9123 },
  { name: 'Wuhan', nameZh: '武汉', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 30.5928, lng: 114.3055 },
  { name: 'Suzhou', nameZh: '苏州', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 31.2990, lng: 120.5853 },
  { name: 'Xiamen', nameZh: '厦门', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 24.4798, lng: 118.0894 },
  { name: 'Kunming', nameZh: '昆明', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 25.0389, lng: 102.7183 },
  { name: 'Lhasa', nameZh: '拉萨', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 29.6500, lng: 91.1000 },
  { name: 'Harbin', nameZh: '哈尔滨', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 45.8038, lng: 126.5350 },
  { name: 'Dalian', nameZh: '大连', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 38.9140, lng: 121.6147 },
  { name: 'Qingdao', nameZh: '青岛', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 36.0671, lng: 120.3826 },
  { name: 'Sanya', nameZh: '三亚', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 18.2528, lng: 109.5120 },
  { name: 'Changsha', nameZh: '长沙', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 28.2282, lng: 112.9388 },
  { name: 'Guilin', nameZh: '桂林', country: 'China', countryZh: '中国', countryCode: 'CHN', lat: 25.2345, lng: 110.1800 },
  { name: 'Hong Kong', nameZh: '香港', country: 'Hong Kong', countryZh: '中国香港', countryCode: 'HKG', lat: 22.3193, lng: 114.1694 },
  { name: 'Macau', nameZh: '澳门', country: 'Macau', countryZh: '中国澳门', countryCode: 'MAC', lat: 22.1987, lng: 113.5439 },
  { name: 'Taipei', nameZh: '台北', country: 'Taiwan', countryZh: '中国台湾', countryCode: 'TWN', lat: 25.0330, lng: 121.5654 },
  { name: 'Kaohsiung', nameZh: '高雄', country: 'Taiwan', countryZh: '中国台湾', countryCode: 'TWN', lat: 22.6273, lng: 120.3014 },
  { name: 'Hualien', nameZh: '花莲', country: 'Taiwan', countryZh: '中国台湾', countryCode: 'TWN', lat: 23.9769, lng: 121.6037 },
  { name: 'Tokyo', nameZh: '东京', country: 'Japan', countryZh: '日本', countryCode: 'JPN', lat: 35.6762, lng: 139.6503 },
  { name: 'Osaka', nameZh: '大阪', country: 'Japan', countryZh: '日本', countryCode: 'JPN', lat: 34.6937, lng: 135.5023 },
  { name: 'Kyoto', nameZh: '京都', country: 'Japan', countryZh: '日本', countryCode: 'JPN', lat: 35.0116, lng: 135.7681 },
  { name: 'Sapporo', nameZh: '札幌', country: 'Japan', countryZh: '日本', countryCode: 'JPN', lat: 43.0618, lng: 141.3545 },
  { name: 'Fukuoka', nameZh: '福冈', country: 'Japan', countryZh: '日本', countryCode: 'JPN', lat: 33.5904, lng: 130.4017 },
  { name: 'Nagoya', nameZh: '名古屋', country: 'Japan', countryZh: '日本', countryCode: 'JPN', lat: 35.1815, lng: 136.9066 },
  { name: 'Okinawa', nameZh: '冲绳', country: 'Japan', countryZh: '日本', countryCode: 'JPN', lat: 26.2124, lng: 127.6809 },
  { name: 'Seoul', nameZh: '首尔', country: 'South Korea', countryZh: '韩国', countryCode: 'KOR', lat: 37.5665, lng: 126.9780 },
  { name: 'Busan', nameZh: '釜山', country: 'South Korea', countryZh: '韩国', countryCode: 'KOR', lat: 35.1796, lng: 129.0756 },
  { name: 'Jeju', nameZh: '济州', country: 'South Korea', countryZh: '韩国', countryCode: 'KOR', lat: 33.4890, lng: 126.4983 },
  { name: 'Ulaanbaatar', nameZh: '乌兰巴托', country: 'Mongolia', countryZh: '蒙古', countryCode: 'MNG', lat: 47.8864, lng: 106.9057 },

  // ========================
  // 东南亚 · Southeast Asia
  // ========================
  { name: 'Bangkok', nameZh: '曼谷', country: 'Thailand', countryZh: '泰国', countryCode: 'THA', lat: 13.7563, lng: 100.5018 },
  { name: 'Chiang Mai', nameZh: '清迈', country: 'Thailand', countryZh: '泰国', countryCode: 'THA', lat: 18.7883, lng: 98.9853 },
  { name: 'Phuket', nameZh: '普吉岛', country: 'Thailand', countryZh: '泰国', countryCode: 'THA', lat: 7.8804, lng: 98.3923 },
  { name: 'Pattaya', nameZh: '芭提雅', country: 'Thailand', countryZh: '泰国', countryCode: 'THA', lat: 12.9236, lng: 100.8825 },
  { name: 'Singapore', nameZh: '新加坡', country: 'Singapore', countryZh: '新加坡', countryCode: 'SGP', lat: 1.3521, lng: 103.8198 },
  { name: 'Kuala Lumpur', nameZh: '吉隆坡', country: 'Malaysia', countryZh: '马来西亚', countryCode: 'MYS', lat: 3.1390, lng: 101.6869 },
  { name: 'Penang', nameZh: '槟城', country: 'Malaysia', countryZh: '马来西亚', countryCode: 'MYS', lat: 5.4141, lng: 100.3288 },
  { name: 'Kota Kinabalu', nameZh: '亚庇', country: 'Malaysia', countryZh: '马来西亚', countryCode: 'MYS', lat: 5.9804, lng: 116.0735 },
  { name: 'Hanoi', nameZh: '河内', country: 'Vietnam', countryZh: '越南', countryCode: 'VNM', lat: 21.0278, lng: 105.8342 },
  { name: 'Ho Chi Minh City', nameZh: '胡志明市', country: 'Vietnam', countryZh: '越南', countryCode: 'VNM', lat: 10.8231, lng: 106.6297 },
  { name: 'Da Nang', nameZh: '岘港', country: 'Vietnam', countryZh: '越南', countryCode: 'VNM', lat: 16.0544, lng: 108.2022 },
  { name: 'Nha Trang', nameZh: '芽庄', country: 'Vietnam', countryZh: '越南', countryCode: 'VNM', lat: 12.2388, lng: 109.1967 },
  { name: 'Jakarta', nameZh: '雅加达', country: 'Indonesia', countryZh: '印度尼西亚', countryCode: 'IDN', lat: -6.2088, lng: 106.8456 },
  { name: 'Bali', nameZh: '巴厘岛', country: 'Indonesia', countryZh: '印度尼西亚', countryCode: 'IDN', lat: -8.3405, lng: 115.0920 },
  { name: 'Manila', nameZh: '马尼拉', country: 'Philippines', countryZh: '菲律宾', countryCode: 'PHL', lat: 14.5995, lng: 120.9842 },
  { name: 'Cebu', nameZh: '宿务', country: 'Philippines', countryZh: '菲律宾', countryCode: 'PHL', lat: 10.3157, lng: 123.8854 },
  { name: 'Boracay', nameZh: '长滩岛', country: 'Philippines', countryZh: '菲律宾', countryCode: 'PHL', lat: 11.9674, lng: 121.9248 },
  { name: 'Siem Reap', nameZh: '暹粒', country: 'Cambodia', countryZh: '柬埔寨', countryCode: 'KHM', lat: 13.3633, lng: 103.8564 },
  { name: 'Yangon', nameZh: '仰光', country: 'Myanmar', countryZh: '缅甸', countryCode: 'MMR', lat: 16.8661, lng: 96.1951 },
  { name: 'Vientiane', nameZh: '万象', country: 'Laos', countryZh: '老挝', countryCode: 'LAO', lat: 17.9757, lng: 102.6331 },

  // ========================
  // 南亚 · South Asia
  // ========================
  { name: 'New Delhi', nameZh: '新德里', country: 'India', countryZh: '印度', countryCode: 'IND', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', nameZh: '孟买', country: 'India', countryZh: '印度', countryCode: 'IND', lat: 19.0760, lng: 72.8777 },
  { name: 'Agra', nameZh: '阿格拉', country: 'India', countryZh: '印度', countryCode: 'IND', lat: 27.1767, lng: 78.0081 },
  { name: 'Jaipur', nameZh: '斋普尔', country: 'India', countryZh: '印度', countryCode: 'IND', lat: 26.9124, lng: 75.7873 },
  { name: 'Goa', nameZh: '果阿', country: 'India', countryZh: '印度', countryCode: 'IND', lat: 15.4909, lng: 73.8278 },
  { name: 'Kathmandu', nameZh: '加德满都', country: 'Nepal', countryZh: '尼泊尔', countryCode: 'NPL', lat: 27.7172, lng: 85.3240 },
  { name: 'Colombo', nameZh: '科伦坡', country: 'Sri Lanka', countryZh: '斯里兰卡', countryCode: 'LKA', lat: 6.9271, lng: 79.8612 },
  { name: 'Malé', nameZh: '马累', country: 'Maldives', countryZh: '马尔代夫', countryCode: 'MDV', lat: 4.1755, lng: 73.5093 },

  // ========================
  // 中东 · Middle East
  // ========================
  { name: 'Dubai', nameZh: '迪拜', country: 'United Arab Emirates', countryZh: '阿联酋', countryCode: 'ARE', lat: 25.2048, lng: 55.2708 },
  { name: 'Abu Dhabi', nameZh: '阿布扎比', country: 'United Arab Emirates', countryZh: '阿联酋', countryCode: 'ARE', lat: 24.4539, lng: 54.3773 },
  { name: 'Doha', nameZh: '多哈', country: 'Qatar', countryZh: '卡塔尔', countryCode: 'QAT', lat: 25.2854, lng: 51.5310 },
  { name: 'Riyadh', nameZh: '利雅得', country: 'Saudi Arabia', countryZh: '沙特阿拉伯', countryCode: 'SAU', lat: 24.7136, lng: 46.6753 },
  { name: 'Istanbul', nameZh: '伊斯坦布尔', country: 'Turkey', countryZh: '土耳其', countryCode: 'TUR', lat: 41.0082, lng: 28.9784 },
  { name: 'Antalya', nameZh: '安塔利亚', country: 'Turkey', countryZh: '土耳其', countryCode: 'TUR', lat: 36.8969, lng: 30.7133 },
  { name: 'Cappadocia', nameZh: '卡帕多奇亚', country: 'Turkey', countryZh: '土耳其', countryCode: 'TUR', lat: 38.6431, lng: 34.8334 },
  { name: 'Jerusalem', nameZh: '耶路撒冷', country: 'Israel', countryZh: '以色列', countryCode: 'ISR', lat: 31.7683, lng: 35.2137 },
  { name: 'Tel Aviv', nameZh: '特拉维夫', country: 'Israel', countryZh: '以色列', countryCode: 'ISR', lat: 32.0853, lng: 34.7818 },
  { name: 'Amman', nameZh: '安曼', country: 'Jordan', countryZh: '约旦', countryCode: 'JOR', lat: 31.9451, lng: 35.9284 },
  { name: 'Petra', nameZh: '佩特拉', country: 'Jordan', countryZh: '约旦', countryCode: 'JOR', lat: 30.3285, lng: 35.4444 },
  { name: 'Muscat', nameZh: '马斯喀特', country: 'Oman', countryZh: '阿曼', countryCode: 'OMN', lat: 23.5880, lng: 58.3829 },

  // ========================
  // 西欧 · Western Europe
  // ========================
  { name: 'London', nameZh: '伦敦', country: 'United Kingdom', countryZh: '英国', countryCode: 'GBR', lat: 51.5074, lng: -0.1278 },
  { name: 'Edinburgh', nameZh: '爱丁堡', country: 'United Kingdom', countryZh: '英国', countryCode: 'GBR', lat: 55.9533, lng: -3.1883 },
  { name: 'Manchester', nameZh: '曼彻斯特', country: 'United Kingdom', countryZh: '英国', countryCode: 'GBR', lat: 53.4808, lng: -2.2426 },
  { name: 'Liverpool', nameZh: '利物浦', country: 'United Kingdom', countryZh: '英国', countryCode: 'GBR', lat: 53.4084, lng: -2.9916 },
  { name: 'Oxford', nameZh: '牛津', country: 'United Kingdom', countryZh: '英国', countryCode: 'GBR', lat: 51.7520, lng: -1.2577 },
  { name: 'Cambridge', nameZh: '剑桥', country: 'United Kingdom', countryZh: '英国', countryCode: 'GBR', lat: 52.2053, lng: 0.1218 },
  { name: 'Paris', nameZh: '巴黎', country: 'France', countryZh: '法国', countryCode: 'FRA', lat: 48.8566, lng: 2.3522 },
  { name: 'Lyon', nameZh: '里昂', country: 'France', countryZh: '法国', countryCode: 'FRA', lat: 45.7640, lng: 4.8357 },
  { name: 'Nice', nameZh: '尼斯', country: 'France', countryZh: '法国', countryCode: 'FRA', lat: 43.7102, lng: 7.2620 },
  { name: 'Marseille', nameZh: '马赛', country: 'France', countryZh: '法国', countryCode: 'FRA', lat: 43.2965, lng: 5.3698 },
  { name: 'Bordeaux', nameZh: '波尔多', country: 'France', countryZh: '法国', countryCode: 'FRA', lat: 44.8378, lng: -0.5792 },
  { name: 'Berlin', nameZh: '柏林', country: 'Germany', countryZh: '德国', countryCode: 'DEU', lat: 52.5200, lng: 13.4050 },
  { name: 'Munich', nameZh: '慕尼黑', country: 'Germany', countryZh: '德国', countryCode: 'DEU', lat: 48.1351, lng: 11.5820 },
  { name: 'Frankfurt', nameZh: '法兰克福', country: 'Germany', countryZh: '德国', countryCode: 'DEU', lat: 50.1109, lng: 8.6821 },
  { name: 'Hamburg', nameZh: '汉堡', country: 'Germany', countryZh: '德国', countryCode: 'DEU', lat: 53.5511, lng: 9.9937 },
  { name: 'Cologne', nameZh: '科隆', country: 'Germany', countryZh: '德国', countryCode: 'DEU', lat: 50.9375, lng: 6.9603 },
  { name: 'Amsterdam', nameZh: '阿姆斯特丹', country: 'Netherlands', countryZh: '荷兰', countryCode: 'NLD', lat: 52.3676, lng: 4.9041 },
  { name: 'Rotterdam', nameZh: '鹿特丹', country: 'Netherlands', countryZh: '荷兰', countryCode: 'NLD', lat: 51.9244, lng: 4.4777 },
  { name: 'Brussels', nameZh: '布鲁塞尔', country: 'Belgium', countryZh: '比利时', countryCode: 'BEL', lat: 50.8503, lng: 4.3517 },
  { name: 'Bruges', nameZh: '布鲁日', country: 'Belgium', countryZh: '比利时', countryCode: 'BEL', lat: 51.2093, lng: 3.2247 },
  { name: 'Luxembourg', nameZh: '卢森堡', country: 'Luxembourg', countryZh: '卢森堡', countryCode: 'LUX', lat: 49.6117, lng: 6.1300 },
  { name: 'Zurich', nameZh: '苏黎世', country: 'Switzerland', countryZh: '瑞士', countryCode: 'CHE', lat: 47.3769, lng: 8.5417 },
  { name: 'Geneva', nameZh: '日内瓦', country: 'Switzerland', countryZh: '瑞士', countryCode: 'CHE', lat: 46.2044, lng: 6.1432 },
  { name: 'Interlaken', nameZh: '因特拉肯', country: 'Switzerland', countryZh: '瑞士', countryCode: 'CHE', lat: 46.6863, lng: 7.8632 },
  { name: 'Vienna', nameZh: '维也纳', country: 'Austria', countryZh: '奥地利', countryCode: 'AUT', lat: 48.2082, lng: 16.3738 },
  { name: 'Salzburg', nameZh: '萨尔茨堡', country: 'Austria', countryZh: '奥地利', countryCode: 'AUT', lat: 47.8095, lng: 13.0550 },
  { name: 'Hallstatt', nameZh: '哈尔施塔特', country: 'Austria', countryZh: '奥地利', countryCode: 'AUT', lat: 47.5622, lng: 13.6493 },

  // ========================
  // 南欧 · Southern Europe
  // ========================
  { name: 'Rome', nameZh: '罗马', country: 'Italy', countryZh: '意大利', countryCode: 'ITA', lat: 41.9028, lng: 12.4964 },
  { name: 'Milan', nameZh: '米兰', country: 'Italy', countryZh: '意大利', countryCode: 'ITA', lat: 45.4642, lng: 9.1900 },
  { name: 'Venice', nameZh: '威尼斯', country: 'Italy', countryZh: '意大利', countryCode: 'ITA', lat: 45.4408, lng: 12.3155 },
  { name: 'Florence', nameZh: '佛罗伦萨', country: 'Italy', countryZh: '意大利', countryCode: 'ITA', lat: 43.7696, lng: 11.2558 },
  { name: 'Naples', nameZh: '那不勒斯', country: 'Italy', countryZh: '意大利', countryCode: 'ITA', lat: 40.8518, lng: 14.2681 },
  { name: 'Cinque Terre', nameZh: '五渔村', country: 'Italy', countryZh: '意大利', countryCode: 'ITA', lat: 44.1278, lng: 9.7097 },
  { name: 'Barcelona', nameZh: '巴塞罗那', country: 'Spain', countryZh: '西班牙', countryCode: 'ESP', lat: 41.3874, lng: 2.1686 },
  { name: 'Madrid', nameZh: '马德里', country: 'Spain', countryZh: '西班牙', countryCode: 'ESP', lat: 40.4168, lng: -3.7038 },
  { name: 'Seville', nameZh: '塞维利亚', country: 'Spain', countryZh: '西班牙', countryCode: 'ESP', lat: 37.3891, lng: -5.9845 },
  { name: 'Granada', nameZh: '格拉纳达', country: 'Spain', countryZh: '西班牙', countryCode: 'ESP', lat: 37.1773, lng: -3.5986 },
  { name: 'Valencia', nameZh: '瓦伦西亚', country: 'Spain', countryZh: '西班牙', countryCode: 'ESP', lat: 39.4699, lng: -0.3763 },
  { name: 'Ibiza', nameZh: '伊比萨', country: 'Spain', countryZh: '西班牙', countryCode: 'ESP', lat: 38.9067, lng: 1.4206 },
  { name: 'Lisbon', nameZh: '里斯本', country: 'Portugal', countryZh: '葡萄牙', countryCode: 'PRT', lat: 38.7223, lng: -9.1393 },
  { name: 'Porto', nameZh: '波尔图', country: 'Portugal', countryZh: '葡萄牙', countryCode: 'PRT', lat: 41.1579, lng: -8.6291 },
  { name: 'Athens', nameZh: '雅典', country: 'Greece', countryZh: '希腊', countryCode: 'GRC', lat: 37.9838, lng: 23.7275 },
  { name: 'Santorini', nameZh: '圣托里尼', country: 'Greece', countryZh: '希腊', countryCode: 'GRC', lat: 36.3932, lng: 25.4615 },
  { name: 'Mykonos', nameZh: '米克诺斯', country: 'Greece', countryZh: '希腊', countryCode: 'GRC', lat: 37.4467, lng: 25.3289 },
  { name: 'Zagreb', nameZh: '萨格勒布', country: 'Croatia', countryZh: '克罗地亚', countryCode: 'HRV', lat: 45.8150, lng: 15.9819 },
  { name: 'Dubrovnik', nameZh: '杜布罗夫尼克', country: 'Croatia', countryZh: '克罗地亚', countryCode: 'HRV', lat: 42.6507, lng: 18.0944 },
  { name: 'Ljubljana', nameZh: '卢布尔雅那', country: 'Slovenia', countryZh: '斯洛文尼亚', countryCode: 'SVN', lat: 46.0569, lng: 14.5058 },

  // ========================
  // 北欧 · Northern Europe
  // ========================
  { name: 'Copenhagen', nameZh: '哥本哈根', country: 'Denmark', countryZh: '丹麦', countryCode: 'DNK', lat: 55.6761, lng: 12.5683 },
  { name: 'Stockholm', nameZh: '斯德哥尔摩', country: 'Sweden', countryZh: '瑞典', countryCode: 'SWE', lat: 59.3293, lng: 18.0686 },
  { name: 'Oslo', nameZh: '奥斯陆', country: 'Norway', countryZh: '挪威', countryCode: 'NOR', lat: 59.9139, lng: 10.7522 },
  { name: 'Bergen', nameZh: '卑尔根', country: 'Norway', countryZh: '挪威', countryCode: 'NOR', lat: 60.3913, lng: 5.3221 },
  { name: 'Helsinki', nameZh: '赫尔辛基', country: 'Finland', countryZh: '芬兰', countryCode: 'FIN', lat: 60.1699, lng: 24.9384 },
  { name: 'Reykjavik', nameZh: '雷克雅未克', country: 'Iceland', countryZh: '冰岛', countryCode: 'ISL', lat: 64.1466, lng: -21.9426 },
  { name: 'Dublin', nameZh: '都柏林', country: 'Ireland', countryZh: '爱尔兰', countryCode: 'IRL', lat: 53.3498, lng: -6.2603 },
  { name: 'Tallinn', nameZh: '塔林', country: 'Estonia', countryZh: '爱沙尼亚', countryCode: 'EST', lat: 59.4370, lng: 24.7536 },

  // ========================
  // 东欧 · Eastern Europe
  // ========================
  { name: 'Moscow', nameZh: '莫斯科', country: 'Russia', countryZh: '俄罗斯', countryCode: 'RUS', lat: 55.7558, lng: 37.6173 },
  { name: 'Saint Petersburg', nameZh: '圣彼得堡', country: 'Russia', countryZh: '俄罗斯', countryCode: 'RUS', lat: 59.9343, lng: 30.3351 },
  { name: 'Warsaw', nameZh: '华沙', country: 'Poland', countryZh: '波兰', countryCode: 'POL', lat: 52.2297, lng: 21.0122 },
  { name: 'Krakow', nameZh: '克拉科夫', country: 'Poland', countryZh: '波兰', countryCode: 'POL', lat: 50.0647, lng: 19.9450 },
  { name: 'Prague', nameZh: '布拉格', country: 'Czech Republic', countryZh: '捷克', countryCode: 'CZE', lat: 50.0755, lng: 14.4378 },
  { name: 'CK', nameZh: '克鲁姆洛夫', country: 'Czech Republic', countryZh: '捷克', countryCode: 'CZE', lat: 48.8126, lng: 14.3174 },
  { name: 'Budapest', nameZh: '布达佩斯', country: 'Hungary', countryZh: '匈牙利', countryCode: 'HUN', lat: 47.4979, lng: 19.0402 },
  { name: 'Kiev', nameZh: '基辅', country: 'Ukraine', countryZh: '乌克兰', countryCode: 'UKR', lat: 50.4501, lng: 30.5234 },
  { name: 'Bucharest', nameZh: '布加勒斯特', country: 'Romania', countryZh: '罗马尼亚', countryCode: 'ROU', lat: 44.4268, lng: 26.1025 },
  { name: 'Belgrade', nameZh: '贝尔格莱德', country: 'Serbia', countryZh: '塞尔维亚', countryCode: 'SRB', lat: 44.7866, lng: 20.4489 },

  // ========================
  // 北美 · North America
  // ========================
  { name: 'New York', nameZh: '纽约', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 40.7128, lng: -74.0060 },
  { name: 'Los Angeles', nameZh: '洛杉矶', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 34.0522, lng: -118.2437 },
  { name: 'San Francisco', nameZh: '旧金山', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 37.7749, lng: -122.4194 },
  { name: 'Las Vegas', nameZh: '拉斯维加斯', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 36.1716, lng: -115.1391 },
  { name: 'Chicago', nameZh: '芝加哥', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 41.8781, lng: -87.6298 },
  { name: 'Washington DC', nameZh: '华盛顿', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 38.9072, lng: -77.0369 },
  { name: 'Boston', nameZh: '波士顿', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 42.3601, lng: -71.0589 },
  { name: 'Miami', nameZh: '迈阿密', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 25.7617, lng: -80.1918 },
  { name: 'Orlando', nameZh: '奥兰多', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 28.5383, lng: -81.3792 },
  { name: 'Seattle', nameZh: '西雅图', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 47.6062, lng: -122.3321 },
  { name: 'Honolulu', nameZh: '檀香山', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 21.3069, lng: -157.8583 },
  { name: 'New Orleans', nameZh: '新奥尔良', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 29.9511, lng: -90.0715 },
  { name: 'Yellowstone', nameZh: '黄石公园', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 44.4280, lng: -110.5885 },
  { name: 'Grand Canyon', nameZh: '大峡谷', country: 'United States', countryZh: '美国', countryCode: 'USA', lat: 36.1069, lng: -112.1129 },
  { name: 'Toronto', nameZh: '多伦多', country: 'Canada', countryZh: '加拿大', countryCode: 'CAN', lat: 43.6532, lng: -79.3832 },
  { name: 'Vancouver', nameZh: '温哥华', country: 'Canada', countryZh: '加拿大', countryCode: 'CAN', lat: 49.2827, lng: -123.1207 },
  { name: 'Montreal', nameZh: '蒙特利尔', country: 'Canada', countryZh: '加拿大', countryCode: 'CAN', lat: 45.5017, lng: -73.5673 },
  { name: 'Calgary', nameZh: '卡尔加里', country: 'Canada', countryZh: '加拿大', countryCode: 'CAN', lat: 51.0447, lng: -114.0719 },
  { name: 'Banff', nameZh: '班夫', country: 'Canada', countryZh: '加拿大', countryCode: 'CAN', lat: 51.1784, lng: -115.5708 },
  { name: 'Quebec City', nameZh: '魁北克城', country: 'Canada', countryZh: '加拿大', countryCode: 'CAN', lat: 46.8139, lng: -71.2080 },
  { name: 'Mexico City', nameZh: '墨西哥城', country: 'Mexico', countryZh: '墨西哥', countryCode: 'MEX', lat: 19.4326, lng: -99.1332 },
  { name: 'Cancun', nameZh: '坎昆', country: 'Mexico', countryZh: '墨西哥', countryCode: 'MEX', lat: 21.1619, lng: -86.8515 },

  // ========================
  // 南美 · South America
  // ========================
  { name: 'Rio de Janeiro', nameZh: '里约热内卢', country: 'Brazil', countryZh: '巴西', countryCode: 'BRA', lat: -22.9068, lng: -43.1729 },
  { name: 'São Paulo', nameZh: '圣保罗', country: 'Brazil', countryZh: '巴西', countryCode: 'BRA', lat: -23.5505, lng: -46.6333 },
  { name: 'Salvador', nameZh: '萨尔瓦多', country: 'Brazil', countryZh: '巴西', countryCode: 'BRA', lat: -12.9714, lng: -38.5014 },
  { name: 'Buenos Aires', nameZh: '布宜诺斯艾利斯', country: 'Argentina', countryZh: '阿根廷', countryCode: 'ARG', lat: -34.6037, lng: -58.3816 },
  { name: 'Ushuaia', nameZh: '乌斯怀亚', country: 'Argentina', countryZh: '阿根廷', countryCode: 'ARG', lat: -54.8019, lng: -68.3030 },
  { name: 'Santiago', nameZh: '圣地亚哥', country: 'Chile', countryZh: '智利', countryCode: 'CHL', lat: -33.4489, lng: -70.6693 },
  { name: 'Easter Island', nameZh: '复活节岛', country: 'Chile', countryZh: '智利', countryCode: 'CHL', lat: -27.1127, lng: -109.3497 },
  { name: 'Lima', nameZh: '利马', country: 'Peru', countryZh: '秘鲁', countryCode: 'PER', lat: -12.0464, lng: -77.0428 },
  { name: 'Cusco', nameZh: '库斯科', country: 'Peru', countryZh: '秘鲁', countryCode: 'PER', lat: -13.5320, lng: -71.9675 },
  { name: 'Machu Picchu', nameZh: '马丘比丘', country: 'Peru', countryZh: '秘鲁', countryCode: 'PER', lat: -13.1631, lng: -72.5450 },
  { name: 'Bogota', nameZh: '波哥大', country: 'Colombia', countryZh: '哥伦比亚', countryCode: 'COL', lat: 4.7110, lng: -74.0721 },
  { name: 'Cartagena', nameZh: '卡塔赫纳', country: 'Colombia', countryZh: '哥伦比亚', countryCode: 'COL', lat: 10.3910, lng: -75.4794 },
  { name: 'Quito', nameZh: '基多', country: 'Ecuador', countryZh: '厄瓜多尔', countryCode: 'ECU', lat: -0.1807, lng: -78.4678 },
  { name: 'Galapagos', nameZh: '加拉帕戈斯', country: 'Ecuador', countryZh: '厄瓜多尔', countryCode: 'ECU', lat: -0.8293, lng: -90.9821 },
  { name: 'La Paz', nameZh: '拉巴斯', country: 'Bolivia', countryZh: '玻利维亚', countryCode: 'BOL', lat: -16.5000, lng: -68.1500 },
  { name: 'Uyuni', nameZh: '乌尤尼', country: 'Bolivia', countryZh: '玻利维亚', countryCode: 'BOL', lat: -20.4609, lng: -66.8250 },

  // ========================
  // 大洋洲 · Oceania
  // ========================
  { name: 'Sydney', nameZh: '悉尼', country: 'Australia', countryZh: '澳大利亚', countryCode: 'AUS', lat: -33.8688, lng: 151.2093 },
  { name: 'Melbourne', nameZh: '墨尔本', country: 'Australia', countryZh: '澳大利亚', countryCode: 'AUS', lat: -37.8136, lng: 144.9631 },
  { name: 'Brisbane', nameZh: '布里斯班', country: 'Australia', countryZh: '澳大利亚', countryCode: 'AUS', lat: -27.4698, lng: 153.0251 },
  { name: 'Gold Coast', nameZh: '黄金海岸', country: 'Australia', countryZh: '澳大利亚', countryCode: 'AUS', lat: -28.0167, lng: 153.4000 },
  { name: 'Cairns', nameZh: '凯恩斯', country: 'Australia', countryZh: '澳大利亚', countryCode: 'AUS', lat: -16.9186, lng: 145.7781 },
  { name: 'Perth', nameZh: '珀斯', country: 'Australia', countryZh: '澳大利亚', countryCode: 'AUS', lat: -31.9505, lng: 115.8605 },
  { name: 'Adelaide', nameZh: '阿德莱德', country: 'Australia', countryZh: '澳大利亚', countryCode: 'AUS', lat: -34.9285, lng: 138.6007 },
  { name: 'Uluru', nameZh: '乌鲁鲁', country: 'Australia', countryZh: '澳大利亚', countryCode: 'AUS', lat: -25.3444, lng: 131.0369 },
  { name: 'Auckland', nameZh: '奥克兰', country: 'New Zealand', countryZh: '新西兰', countryCode: 'NZL', lat: -36.8509, lng: 174.7645 },
  { name: 'Queenstown', nameZh: '皇后镇', country: 'New Zealand', countryZh: '新西兰', countryCode: 'NZL', lat: -45.0312, lng: 168.6626 },
  { name: 'Christchurch', nameZh: '基督城', country: 'New Zealand', countryZh: '新西兰', countryCode: 'NZL', lat: -43.5321, lng: 172.6362 },
  { name: 'Wellington', nameZh: '惠灵顿', country: 'New Zealand', countryZh: '新西兰', countryCode: 'NZL', lat: -41.2866, lng: 174.7756 },
  { name: 'Rotorua', nameZh: '罗托鲁瓦', country: 'New Zealand', countryZh: '新西兰', countryCode: 'NZL', lat: -38.1368, lng: 176.2497 },
  { name: 'Nadi', nameZh: '楠迪', country: 'Fiji', countryZh: '斐济', countryCode: 'FJI', lat: -17.7765, lng: 177.4360 },

  // ========================
  // 非洲 · Africa
  // ========================
  { name: 'Cairo', nameZh: '开罗', country: 'Egypt', countryZh: '埃及', countryCode: 'EGY', lat: 30.0444, lng: 31.2357 },
  { name: 'Luxor', nameZh: '卢克索', country: 'Egypt', countryZh: '埃及', countryCode: 'EGY', lat: 25.6872, lng: 32.6396 },
  { name: 'Sharm El Sheikh', nameZh: '沙姆沙伊赫', country: 'Egypt', countryZh: '埃及', countryCode: 'EGY', lat: 27.9158, lng: 34.3299 },
  { name: 'Cape Town', nameZh: '开普敦', country: 'South Africa', countryZh: '南非', countryCode: 'ZAF', lat: -33.9249, lng: 18.4241 },
  { name: 'Johannesburg', nameZh: '约翰内斯堡', country: 'South Africa', countryZh: '南非', countryCode: 'ZAF', lat: -26.2041, lng: 28.0473 },
  { name: 'Marrakech', nameZh: '马拉喀什', country: 'Morocco', countryZh: '摩洛哥', countryCode: 'MAR', lat: 31.6295, lng: -7.9811 },
  { name: 'Casablanca', nameZh: '卡萨布兰卡', country: 'Morocco', countryZh: '摩洛哥', countryCode: 'MAR', lat: 33.5731, lng: -7.5898 },
  { name: 'Fes', nameZh: '菲斯', country: 'Morocco', countryZh: '摩洛哥', countryCode: 'MAR', lat: 34.0331, lng: -5.0000 },
  { name: 'Chefchaouen', nameZh: '舍夫沙万', country: 'Morocco', countryZh: '摩洛哥', countryCode: 'MAR', lat: 35.1654, lng: -5.2637 },
  { name: 'Nairobi', nameZh: '内罗毕', country: 'Kenya', countryZh: '肯尼亚', countryCode: 'KEN', lat: -1.2921, lng: 36.8219 },
  { name: 'Mombasa', nameZh: '蒙巴萨', country: 'Kenya', countryZh: '肯尼亚', countryCode: 'KEN', lat: -4.0435, lng: 39.6682 },
  { name: 'Tunis', nameZh: '突尼斯', country: 'Tunisia', countryZh: '突尼斯', countryCode: 'TUN', lat: 36.8065, lng: 10.1815 },
  { name: 'Victoria Falls', nameZh: '维多利亚瀑布', country: 'Zimbabwe', countryZh: '津巴布韦', countryCode: 'ZWE', lat: -17.9243, lng: 25.8567 },
  { name: 'Dar es Salaam', nameZh: '达累斯萨拉姆', country: 'Tanzania', countryZh: '坦桑尼亚', countryCode: 'TZA', lat: -6.7924, lng: 39.2083 },
  { name: 'Zanzibar', nameZh: '桑给巴尔', country: 'Tanzania', countryZh: '坦桑尼亚', countryCode: 'TZA', lat: -6.1659, lng: 39.2026 },
  { name: 'Addis Ababa', nameZh: '亚的斯亚贝巴', country: 'Ethiopia', countryZh: '埃塞俄比亚', countryCode: 'ETH', lat: 9.1450, lng: 40.4897 },
  { name: 'Accra', nameZh: '阿克拉', country: 'Ghana', countryZh: '加纳', countryCode: 'GHA', lat: 5.6037, lng: -0.1870 },

  // ========================
  // 中亚 · Central Asia
  // ========================
  { name: 'Almaty', nameZh: '阿拉木图', country: 'Kazakhstan', countryZh: '哈萨克斯坦', countryCode: 'KAZ', lat: 43.2220, lng: 76.8512 },
  { name: 'Tashkent', nameZh: '塔什干', country: 'Uzbekistan', countryZh: '乌兹别克斯坦', countryCode: 'UZB', lat: 41.2995, lng: 69.2401 },
  { name: 'Samarkand', nameZh: '撒马尔罕', country: 'Uzbekistan', countryZh: '乌兹别克斯坦', countryCode: 'UZB', lat: 39.6270, lng: 66.9750 },
  { name: 'Baku', nameZh: '巴库', country: 'Azerbaijan', countryZh: '阿塞拜疆', countryCode: 'AZE', lat: 40.4093, lng: 49.8671 },
  { name: 'Tbilisi', nameZh: '第比利斯', country: 'Georgia', countryZh: '格鲁吉亚', countryCode: 'GEO', lat: 41.7151, lng: 44.8271 },
  { name: 'Yerevan', nameZh: '埃里温', country: 'Armenia', countryZh: '亚美尼亚', countryCode: 'ARM', lat: 40.1792, lng: 44.4991 },
  { name: 'Tehran', nameZh: '德黑兰', country: 'Iran', countryZh: '伊朗', countryCode: 'IRN', lat: 35.6892, lng: 51.3890 },
];

/**
 * 根据搜索关键词查找匹配的城市
 * 支持中文和英文搜索，模糊匹配
 */
export function searchCities(query: string, limit: number = 8): CityData[] {
  if (!query || query.trim().length === 0) return [];

  const q = query.trim().toLowerCase();

  // 先用精确包含匹配
  let results = CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(q) ||
      city.nameZh.includes(q) ||
      city.countryZh.includes(q) ||
      city.country.toLowerCase().includes(q)
  );

  // 按匹配质量排序 (名称匹配优先)
  results.sort((a, b) => {
    const aNameMatch = a.name.toLowerCase().startsWith(q) || a.nameZh.startsWith(q);
    const bNameMatch = b.name.toLowerCase().startsWith(q) || b.nameZh.startsWith(q);
    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;

    // 完整匹配优先于部分匹配
    const aExact =
      a.name.toLowerCase() === q || a.nameZh === q;
    const bExact =
      b.name.toLowerCase() === q || b.nameZh === q;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    return 0;
  });

  return results.slice(0, limit);
}

/**
 * 根据名称精确查找城市
 */
export function findCityByName(name: string): CityData | undefined {
  const lower = name.toLowerCase();
  return CITIES.find(
    (city) =>
      city.name.toLowerCase() === lower || city.nameZh === lower
  );
}
