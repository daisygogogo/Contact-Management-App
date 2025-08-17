import React, { useRef } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';
import { uploadService } from '@/services/upload';



interface UploadImageGridProps {
  value?: string | null;
  onChange?: (file: string | null) => void;
  uploadUrl: string;
}

export default function UploadImageGrid({ value = null, onChange, uploadUrl }: UploadImageGridProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const res = await uploadService.uploadFile(file, uploadUrl);
        if (onChange) onChange(res.path);
      } catch (err) {
        alert('Upload failed');
        if (onChange) onChange(null);
      }
    }
    e.target.value = '';
  };

  const handleRemove = () => {
    if (onChange) onChange(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 w-32">
        <div className="relative aspect-square border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-muted overflow-hidden w-32 h-32">
          {value ? (
            <>
              {/* Can only preview image here, assume path is image url */}
              <img
                src={value}
                alt="upload photo"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 hover:bg-white"
                onClick={handleRemove}
                tabIndex={-1}
              >
                <XIcon className="w-4 h-4 text-red-500" />
              </button>
            </>
          ) : (
            <button
              type="button"
              className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary"
              onClick={handleAdd}
              tabIndex={-1}
            >
              <PlusIcon className="w-10 h-10" />
              <span className="text-xs mt-1">Upload</span>
            </button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFiles}
      />
    </div>
  );
} 