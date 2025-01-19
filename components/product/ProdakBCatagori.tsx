'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { GetCategories, GetProdakByCatagoriId } from '@/lib/data';
import { 
  ShoppingBag, 
  Shirt,
  CircuitBoard,
  Sandwich,
  Crown,
  LucideIcon,
  PackageOpen
} from 'lucide-react';

// Type definition for category configuration
type CategoryConfig = {
  icon: LucideIcon;
  gradient: string;
};

// Configuration for categories with icons and gradients
const categoryConfig: Record<string, CategoryConfig> = {
  'kaos': {
    icon: Shirt,
    gradient: 'from-pink-500 to-rose-500',
  },
  'celana': {
    icon: PackageOpen,
    gradient: 'from-blue-500 to-indigo-500',
  },
  'sepatu': {
    icon: ShoppingBag,
    gradient: 'from-green-500 to-emerald-500',
  },
  'elektronik': {
    icon: CircuitBoard,
    gradient: 'from-purple-500 to-violet-500',
  },
  'makanan': {
    icon: Sandwich,
    gradient: 'from-yellow-500 to-orange-500',
  },
  'topi': {
    icon: Crown,
    gradient: 'from-red-500 to-pink-500',
  }
};

// Default configuration
const defaultConfig: CategoryConfig = {
  icon: ShoppingBag,
  gradient: 'from-gray-500 to-gray-700'
};

export default function ProductsCategory() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<{ id: string; name: string; price: number; createdAt: Date; updatedAt: Date; userId: string; categoryId: string | null; description: string | null; image: string | null; stock: number; user: { id: string; name: string; } }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await GetCategories();
        if (categoriesData) {
          setCategories(categoriesData);
          if (categoriesData.length > 0) {
            setActiveCategory(categoriesData[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!activeCategory) return;

    const fetchProducts = async () => {
      try {
        const category = await GetProdakByCatagoriId(activeCategory);
        const productsWithUser = category?.prodaks.map((product) => ({
          ...product,
          user: { id: product.userId, name: 'User Name' }
        })) || [];
        setProducts(productsWithUser);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8">
      {/* Category Buttons - Scrollable on mobile */}
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-max">
          {categories.map((category) => {
            const config = categoryConfig[category.name.toLowerCase()] || defaultConfig;
            const Icon = config.icon;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-lg
                  transform transition-all duration-200
                  shadow-md hover:shadow-lg
                  text-sm md:text-base
                  ${activeCategory === category.id
                    ? `bg-gradient-to-r ${config.gradient} text-white scale-105`
                    : 'bg-white text-gray-700 hover:scale-105'
                  }
                `}
              >
                <Icon 
                  className={`w-5 h-5 ${
                    activeCategory === category.id ? 'text-white' : 'text-gray-600'
                  }`} 
                />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg text-center">
              No products available in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}