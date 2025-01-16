'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { FormLayout } from '@/components/ui/FormLayout';
import { updateProdakAction } from "@/lib/data";
import CategorySelect from "./ui/CategorySelect";

interface ProdakInterface {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
  category?: { name: string; id: string } | null;
  userId: string;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface EditProdakFormProps {
  initialProduct: ProdakInterface;
}

const EditProdakForm = ({ initialProduct }: EditProdakFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialProduct.image);
  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceValue, setPriceValue] = useState<string>(initialProduct.price.toLocaleString());

  const formatPrice = (value: string) => {
    // Hapus semua karakter non-digit
    const numbers = value.replace(/\D/g, "");
    
    // Format angka dengan koma
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPrice(e.target.value);
    setPriceValue(formattedValue);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        setImageError("Image size should be less than 2MB");
        return;
      }
      setImageError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      // Hapus koma dari nilai price sebelum parsing
      const priceStr = priceValue.replace(/,/g, "");
      const price = parseFloat(priceStr);
      const stock = parseInt(formData.get("stock") as string);

      if (isNaN(price) || isNaN(stock)) {
        throw new Error("Invalid price or stock value");
      }

      const productData = {
        id: initialProduct.id,
        name: formData.get("name") as string,
        price,
        categoryId: selectedCategory || initialProduct.categoryId,
        stock,
        description: formData.get("description") as string,
        image: imagePreview ?? undefined,
      };

      const response = await updateProdakAction(productData);

      if (response.success) {
        router.push("/prodak");
        router.refresh();
      } else {
        setError(response.error ?? "An unknown error occurred");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError(error instanceof Error ? error.message : "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
    title="Edit Product"
    subtitle="Update your product details below."
    error={error}
  >
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
      <form onSubmit={handleSubmit} className="p-8">
        <div className="space-y-8">
          {/* Product Details Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Product Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <Input
                label="Product Name"
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter product name"
                defaultValue={initialProduct.name}
                className="bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />

              <Input
                label="Price"
                id="price"
                name="price"
                type="text"
                required
                placeholder="Enter price"
                value={priceValue}
                onChange={handlePriceChange}
                className="bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />

              <Input
                label="Stock"
                id="stock"
                name="stock"
                type="number"
                required
                min="0"
                placeholder="Enter stock quantity"
                defaultValue={initialProduct.stock}
                className="bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />

              <CategorySelect
                value={selectedCategory ?? ""}
                onChange={setSelectedCategory}
                defaultValue={initialProduct.categoryId ?? ""}
                label="Category"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 w-full sm:w-[50%] md:w-[40%]">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Product Image
            </h3>
            <ImageUpload
              imagePreview={imagePreview}
              onImageChange={handleImageChange}
              onImageRemove={() => setImagePreview(null)}
              error={imageError ?? undefined}
            />
          </div>

          {/* Description Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Product Description
            </h3>
            <Input
              label="Description"
              id="description"
              name="description"
              type="textarea"
              required
              placeholder="Enter product description"
              defaultValue={initialProduct.description ?? ""}
              className="bg-white min-h-[120px] focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Form Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            className="px-6 py-2 hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            loadingText="Updating..."
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
            disabled={loading}
          >
            Update Product
          </Button>
        </div>
      </form>
    </div>
  </FormLayout>
  );
};

export default EditProdakForm;