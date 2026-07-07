/**
 * 图片处理工具
 * 用于上传照片时的压缩和格式转换
 */

/**
 * 将图片文件压缩为指定宽度的 base64 JPEG
 * @param file 图片文件
 * @param maxWidth 最大宽度 (默认 400px)
 * @param quality JPEG 质量 0-1 (默认 0.7)
 * @returns base64 数据 URL
 */
export function compressImage(
  file: File,
  maxWidth: number = 400,
  quality: number = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('文件不是图片格式'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ratio = maxWidth / img.width;
        const width = Math.min(maxWidth, img.width);
        const height = img.height * (width / img.width);

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('无法创建 Canvas 上下文'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('图片加载失败'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsDataURL(file);
  });
}

/**
 * 批量压缩图片文件
 */
export async function compressImages(
  files: File[],
  maxWidth: number = 400,
  quality: number = 0.7
): Promise<string[]> {
  const results: string[] = [];
  for (const file of files) {
    try {
      const compressed = await compressImage(file, maxWidth, quality);
      results.push(compressed);
    } catch (error) {
      console.error('图片压缩失败:', error);
    }
  }
  return results;
}
