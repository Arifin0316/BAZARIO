import React, { useEffect, useState } from "react";
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
  label,
  defaultValue
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [defaultCategory, setDefaultCategory] = useState<Category | null>(null);

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

  if (loading) {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <p className="text-gray-500 text-sm">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  // Filter categories to exclude the default category
  const filteredCategories = categories.filter(
    category => !defaultCategory || category.id !== defaultCategory.id
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value={defaultCategory?.id || ""}>
          {defaultCategory ? defaultCategory.name : "Select Category"}
        </option>
        {filteredCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;