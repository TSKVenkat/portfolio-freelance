import { useState, useCallback, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { FiUpload, FiImage, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  initialImage?: string;
  className?: string;
  maxWidth?: number;
  maxHeight?: number;
}

export default function CloudinaryUpload({
  onUpload,
  initialImage = '',
  className = '',
  maxWidth = 500,
  maxHeight = 500
}: CloudinaryUploadProps) {
  const [image, setImage] = useState(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'portfolio');
      formData.append('max_width', maxWidth.toString());
      formData.append('max_height', maxHeight.toString());

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setImage(data.secure_url);
      onUpload(data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = useCallback(() => {
    setImage('');
    onUpload('');
  }, [onUpload]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {image ? (
        <div className="relative w-full">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
            <Image
              src={image}
              alt="Uploaded image"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
            aria-label="Remove image"
          >
            <FiTrash2 className="w-4 h-4" />
          </motion.button>
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
          <motion.button
            onClick={triggerFileInput}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isUploading}
            className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 bg-gray-50 dark:bg-gray-800 disabled:opacity-70"
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-t-primary-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Uploading...</p>
              </div>
            ) : (
              <>
                <FiUpload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload image</p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  SVG, PNG, JPG or GIF (max {maxWidth}x{maxHeight}px)
                </p>
              </>
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
} 