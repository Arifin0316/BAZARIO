'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { GetCategories, GetProdakByCatagoriId } from '@/lib/data';

export default function ProductsCategory() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<{ id: string; name: string; price: number; createdAt: Date; updatedAt: Date; userId: string; categoryId: string | null; description: string | null; image: string | null; stock: number; user: { id: string; name: string; } }[]>([]);

  // Ambil daftar kategori
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await GetCategories(); // Ambil semua kategori
        if (categoriesData) {
          setCategories(categoriesData);
        }
        if (categoriesData && categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id); // Set kategori pertama sebagai default
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Ambil produk berdasarkan kategori aktif
  useEffect(() => {
    if (!activeCategory) return;

    const fetchProducts = async () => {
      try {
        const category = await GetProdakByCatagoriId(activeCategory);
        const productsWithUser = category?.prodaks.map((product) => ({
          ...product,
          user: { id: product.userId, name: 'User Name' } // Replace 'User Name' with actual user data if available
        })) || [];
        setProducts(productsWithUser);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // Handle kategori aktif ketika tombol diklik
  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
  };

  return (
    <div className="container mx-auto px-20 py-8">
      {/* Tombol Kategori */}
      <div className="mb-6 flex space-x-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-2 rounded ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Produk */}
      <div className="grid mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products available in this category.
          </p>
        )}
      </div>
    </div>
  );
}
