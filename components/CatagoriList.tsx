'use client';

import React, { useEffect, useState } from 'react';
import { GetCategories, createCategoryAction, updateCategoryAction, deleteCategoryAction } from '@/lib/data';

const CategoryList = () => {
  interface Category {
    id: string;
    name: string;
  }
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ id: '', name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await GetCategories();
      setCategories(data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submit for creating/updating category
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isEditing) {
        const response = await updateCategoryAction(form);
        if (response.success) {
          setCategories((prev) =>
            prev.map((cat) => (cat.id === form.id ? response.data! : cat))
          );
        } else {
          setError(response.error || '');
        }
      } else {
        const response = await createCategoryAction(form);
        if (response.success) {
          if (response.data) {
            setCategories((prev) => [...prev, response.data]);
          }
        } else {
          setError(response.error || '');
        }
      }

      setForm({ id: '', name: '' });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to submit category:', err);
    }
  };

  // Handle delete category
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteCategoryAction(id);
      if (response.success) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      } else {
        setError(response.error || '');
      }
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  // Handle edit button
  const handleEdit = (category: Category) => {
    setForm(category);
    setIsEditing(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? 'Update Category' : 'Add Category'}
        </button>
      </form>

      {/* Categories List */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border border-gray-300 px-4 py-2">{category.name}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
