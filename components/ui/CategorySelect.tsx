import React, { useEffect, useState } from "react";
import { ChevronDown, Loader2, AlertCircle, FolderIcon } from "lucide-react";
import { GetCategories, GetCategoryById } from "@/lib/data";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  defaultValue?: string;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  onChange,
  label = "Category",
  defaultValue
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [defaultCategory, setDefaultCategory] = useState<Category | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        // Fetch default category if defaultValue is provided
        if (defaultValue) {
          try {
            const defaultCat = await GetCategoryById(defaultValue);
            setDefaultCategory(defaultCat);
          } catch (err) {
            console.error("Failed to fetch default category:", err);
          }
        }

        // Fetch all categories
        const data = await GetCategories();
        setCategories(data || []);
        setError("");
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Unable to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [defaultValue]);

  // Filter categories based on search term and exclude default category
  const filteredCategories = categories
    .filter(category => 
      !defaultCategory || category.id !== defaultCategory.id)
    .filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const selectedCategory = categories.find(cat => cat.id === value) || defaultCategory;

  const handleSelectCategory = (categoryId: string) => {
    onChange(categoryId);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>

      {/* Main Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className={`
          relative w-full px-4 py-2.5 text-left
          border rounded-lg shadow-sm
          bg-white dark:bg-gray-800
          transition-all duration-200
          ${error 
            ? 'border-red-300 dark:border-red-700' 
            : 'border-gray-300 dark:border-gray-600'
          }
          ${!loading && !error && 'hover:border-blue-500 dark:hover:border-blue-400'}
          focus:outline-none focus:ring-2 focus:ring-blue-500
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <FolderIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            <span className="block truncate text-gray-700 dark:text-gray-200">
              {loading ? 'Loading categories...' : 
               error ? 'Error loading categories' :
               selectedCategory ? selectedCategory.name : 
               'Select category'}
            </span>
          </div>
          {loading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200
                ${isOpen ? 'transform rotate-180' : ''}`}
            />
          )}
        </div>
      </button>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Dropdown */}
      {isOpen && !loading && !error && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search categories..."
              className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 
                       rounded-md bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-gray-100
                       placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categories List */}
          <div className="max-h-60 overflow-y-auto">
            {defaultCategory && (
              <button
                type="button"
                onClick={() => handleSelectCategory(defaultCategory.id)}
                className="w-full px-4 py-2 text-left flex items-center gap-2 
                         hover:bg-blue-50 dark:hover:bg-blue-900/30
                         text-gray-900 dark:text-gray-100"
              >
                <FolderIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                {defaultCategory.name}
              </button>
            )}
            
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleSelectCategory(category.id)}
                  className={`
                    w-full px-4 py-2 text-left flex items-center gap-2
                    hover:bg-blue-50 dark:hover:bg-blue-900/30
                    ${category.id === value 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-900 dark:text-gray-100'
                    }
                  `}
                >
                  <FolderIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  {category.name}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No categories found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelect;