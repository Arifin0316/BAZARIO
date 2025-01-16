// AddProdak.tsx
"use client";

import { useState } from "react";
import { createProdakAction } from "@/lib/data";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { FormLayout } from "@/components/ui/FormLayout";
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
        router.push("/prodak");
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
    <FormLayout
      title="Add New Product"
      subtitle="Fill in the details below to add a new product."
      error={error}
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Product Name"
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter product name"
          />

          <Input
            label="Price"
            id="price"
            name="price"
            type="text" // Ubah ke type text untuk mendukung format koma
            required
            placeholder="Enter price"
            value={priceValue}
            onChange={handlePriceChange}
          />

          <Input
            label="Stock"
            id="stock"
            name="stock"
            type="number"
            required
            min="0"
            placeholder="Enter stock quantity"
          />

          <ImageUpload
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onImageRemove={() => setImagePreview(null)}
            error={imageError ?? undefined}
          />

          <CategorySelect
            value={selectedCategory ?? ""}
            onChange={setSelectedCategory}
            label="Category"
          />
        </div>

        <Input
          label="Description"
          id="description"
          name="description"
          type="textarea"
          required
          placeholder="Enter product description"
        />

        <div className="flex justify-end space-x-3 pt-6">
          <Button
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            loadingText="Creating..."
          >
            Create Product
          </Button>
        </div>
      </form>
    </FormLayout>
  );
};

export default AddProdak;