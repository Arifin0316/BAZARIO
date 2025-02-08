'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import { GetCategories, GetProdakByCatagoriId } from '@/lib/data';
import { 
  ShoppingBag, 
  Shirt,
  CircuitBoard,
  Sandwich,
  Crown,
  LucideIcon,
  PackageOpen,
  Loader2
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

// Loader Component
const ProductLoader = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-12">
    <motion.div 
      animate={{ 
        rotate: 360,
        scale: [1, 1.2, 1]
      }}
      transition={{ 
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Loader2 className="w-16 h-16 text-blue-500 mb-4" />
    </motion.div>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-gray-500 text-lg text-center"
    >
      Memuat produk...
    </motion.p>
  </div>
);

export default function ProductsCategory() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<{ id: string; name: string; price: number; createdAt: Date; updatedAt: Date; userId: string; categoryId: string | null; description: string | null; image: string | null; stock: number; user: { id: string; name: string; } }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      try {
        const category = await GetProdakByCatagoriId(activeCategory);
        const productsWithUser = category?.prodaks.map((product) => ({
          ...product,
          user: { id: product.userId, name: 'User Name' }
        })) || [];
        
        // Menambahkan delay artifisial untuk menunjukkan animasi loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProducts(productsWithUser);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
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
              <motion.button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-lg
                  transform transition-all duration-200
                  shadow-md hover:shadow-lg
                  text-sm md:text-base
                  ${activeCategory === category.id
                    ? `bg-gradient-to-r ${config.gradient} text-white`
                    : 'bg-white text-gray-700'
                  }
                `}
              >
                <Icon 
                  className={`w-5 h-5 ${
                    activeCategory === category.id ? 'text-white' : 'text-gray-600'
                  }`} 
                />
                <span className="font-medium">{category.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Products Grid with Animated Loading */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <ProductLoader />
          </motion.div>
        ) : (
          <motion.div 
            key="products"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg text-center">
                  Tidak ada produk dalam kategori ini.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}