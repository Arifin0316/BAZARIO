import { Camera, X, Upload, AlertCircle } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  error?: string;
}

export const ImageUpload = ({ imagePreview, onImageChange, onImageRemove, error }: ImageUploadProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Product Image
        </label>
        {imagePreview && (
          <button
            type="button"
            onClick={onImageRemove}
            className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 
                     flex items-center gap-1 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            Remove Image
          </button>
        )}
      </div>

      <div className={`relative group ${!imagePreview ? 'cursor-pointer' : ''}`}>
        <div className={`
          relative overflow-hidden rounded-lg
          ${imagePreview 
            ? 'border-2 border-gray-200 dark:border-gray-700' 
            : 'border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
          }
          transition-all duration-200
        `}>
          {imagePreview ? (
            <div className="relative aspect-video">
              <Image
                src={imagePreview}
                alt="Preview"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-200 flex items-center justify-center">
                <label className="cursor-pointer px-4 py-2 bg-white/90 dark:bg-gray-800/90 rounded-lg 
                                shadow-lg backdrop-blur-sm flex items-center gap-2 
                                hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Change Image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={onImageChange}
                  />
                </label>
              </div>
            </div>
          ) : (
            <label className="block cursor-pointer">
              <div className="p-8 space-y-4">
                <div className="relative mx-auto w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30">
                  <Camera className="absolute inset-0 m-auto w-8 h-8 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-blue-500 dark:text-blue-400">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (Max. 2MB)
                  </p>
                </div>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onImageChange}
              />
            </label>
          )}
        </div>

        {error && (
          <div className="absolute -bottom-8 left-0 right-0">
            <div className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;