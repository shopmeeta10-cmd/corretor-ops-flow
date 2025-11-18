/**
 * Compress an image file if it's larger than the specified size
 * @param file The image file to compress
 * @param maxSizeKB Maximum size in KB before compression (default: 500KB)
 * @param quality Compression quality between 0 and 1 (default: 0.8)
 * @returns Compressed file or original if smaller than maxSize
 */
export async function compressImage(
  file: File,
  maxSizeKB: number = 500,
  quality: number = 0.8
): Promise<File> {
  // If file is already small enough, return it
  if (file.size <= maxSizeKB * 1024) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions while maintaining aspect ratio
        const maxDimension = 1920;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not compress image'));
              return;
            }
            
            // Create a new file from the blob
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            
            console.log(`Compressed ${file.name} from ${(file.size / 1024).toFixed(2)}KB to ${(compressedFile.size / 1024).toFixed(2)}KB`);
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Could not load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Compress multiple image files
 * @param files Array of image files to compress
 * @param maxSizeKB Maximum size in KB before compression
 * @param quality Compression quality between 0 and 1
 * @returns Array of compressed files
 */
export async function compressImages(
  files: File[],
  maxSizeKB: number = 500,
  quality: number = 0.8
): Promise<File[]> {
  const compressionPromises = files.map(file => compressImage(file, maxSizeKB, quality));
  return Promise.all(compressionPromises);
}
