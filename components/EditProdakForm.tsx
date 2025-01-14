// components/EditProdakForm.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { FormLayout } from '@/components/ui/FormLayout';
import { updateProdakAction } from "@/lib/data";

interface ProdakInterface {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
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

  // Hapus state product dan useEffect karena sudah tidak diperlukan
  // Data produk sudah tersedia dari prop initialProduct

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
      const price = parseFloat(formData.get("price") as string);
      const stock = parseInt(formData.get("stock") as string);

      if (isNaN(price) || isNaN(stock)) {
        throw new Error("Invalid price or stock value");
      }

      const productData = {
        id: initialProduct.id,
        name: formData.get("name") as string,
        price,
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
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Product Name"
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter product name"
            defaultValue={initialProduct.name}
          />

          <Input
            label="Price"
            id="price"
            name="price"
            type="number"
            required
            min="0"
            step="0.01"
            placeholder="Enter price"
            defaultValue={initialProduct.price}
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
          />

          <ImageUpload
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onImageRemove={() => setImagePreview(null)}
            error={imageError ?? undefined}
          />
        </div>

        <Input
          label="Description"
          id="description"
          name="description"
          type="textarea"
          required
          placeholder="Enter product description"
          defaultValue={initialProduct.description ?? ""}
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
            loadingText="Updating..."
          >
            Update Product
          </Button>
        </div>
      </form>
    </FormLayout>
  );
};

export default EditProdakForm;