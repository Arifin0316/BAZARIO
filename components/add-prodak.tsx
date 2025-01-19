"use client";

import { useState } from "react";
import { createProdakAction } from "@/lib/data";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";

import CategorySelect from "@/components/ui/CategorySelect";

const AddProdak = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceValue, setPriceValue] = useState<string>("");

  const formatPrice = (value: string) => {
    const numbers = value.replace(/\D/g, "");
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
      const priceStr = priceValue.replace(/,/g, "");
      const price = parseFloat(priceStr);
      const stock = parseInt(formData.get("stock") as string);

      if (isNaN(price) || isNaN(stock)) {
        throw new Error("Invalid price or stock value");
      }

      if (!selectedCategory) {
        throw new Error("Please select a category");
      }

      const productData = {
        name: formData.get("name") as string,
        price,
        stock,
        description: formData.get("description") as string,
        image: imagePreview ?? undefined,
        categoryId: selectedCategory,
      };

      const response = await createProdakAction(productData);

      if (response.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(response.error ?? "An unknown error occurred");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError(error instanceof Error ? error.message : "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Product Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Product Name"
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter product name"
            className="w-full"
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
            className="w-full"
          />

          <Input
            label="Stock"
            id="stock"
            name="stock"
            type="number"
            required
            min="0"
            placeholder="Enter stock quantity"
            className="w-full"
          />

          <CategorySelect
            value={selectedCategory ?? ""}
            onChange={setSelectedCategory}
            label="Category"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Product Image
        </h3>
        <ImageUpload
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onImageRemove={() => setImagePreview(null)}
          error={imageError ?? undefined}
        />
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Product Description
        </h3>
        <div className="space-y-2">
          <textarea
            id="description"
            name="description"
            required
            placeholder="Enter product description"
            className="w-full p-3 rounded-lg border border-gray-200 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     min-h-[120px] resize-y"
            rows={4}
          />
          <p className="text-sm text-gray-500">
            Describe your product in detail
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          className="px-6 py-2"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
          loadingText="Creating..."
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700"
        >
          Create Product
        </Button>
      </div>
    </form>
  </div>
  );
};

export default AddProdak;