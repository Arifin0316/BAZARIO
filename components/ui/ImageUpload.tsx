// components/ImageUpload.tsx
import { FiUpload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

interface ImageUploadProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  error?: string;
}

export const ImageUpload = ({ imagePreview, onImageChange, onImageRemove, error }: ImageUploadProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
        {imagePreview ? (
          <div className="relative w-full h-40">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-cover rounded-lg "
            />
            <button
              type="button"
              onClick={onImageRemove}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
            >
              <IoMdClose size={16} />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="image-upload"
                className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={onImageChange}
                />
              </label>
            </div>
          </div>
        )}
      </div>
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};