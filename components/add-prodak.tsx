"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, DollarSign, LayoutGrid, ShoppingCart, AlertCircle, ArrowLeft, Save } from "lucide-react";
import { createProdakAction } from "@/lib/data";
import {Input} from '@/components/ui/input'
import { ImageUpload } from "@/components/ui/ImageUpload";
import  CategorySelect  from "@/components/ui/CategorySelect";


const AddProduct = () => {
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

    try {
      const formData = new FormData(e.currentTarget);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300
                       bg-white dark:bg-gray-800 rounded-lg shadow-sm
                       hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Details */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-500" />
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
                startIcon={<LayoutGrid className="w-5 h-5" />}
              />

              <Input
                label="Price"
                id="price"
                name="price"
                type="text"
                required
                placeholder="0"
                value={priceValue}
                onChange={handlePriceChange}
                startIcon={<DollarSign className="w-5 h-5" />}
              />

              <Input
                label="Stock"
                id="stock"
                name="stock"
                type="number"
                required
                min="0"
                placeholder="Enter stock quantity"
                startIcon={<ShoppingCart className="w-5 h-5" />}
              />

              <CategorySelect
                value={selectedCategory ?? ""}
                onChange={setSelectedCategory}
                label="Category"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-500" />
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-500" />
              Product Description
            </h3>
            
            <div className="space-y-2">
              <textarea
                id="description"
                name="description"
                required
                placeholder="Describe your product in detail..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         min-h-[120px] resize-y"
                rows={4}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Provide a detailed description of your product to help customers understand its features and benefits
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800
                          flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800 dark:text-red-300">
                  There was an error creating the product
                </p>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                       text-gray-700 dark:text-gray-200 font-medium
                       hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                       flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium
                       hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">
                    <Package className="w-4 h-4" />
                  </span>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Create Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;