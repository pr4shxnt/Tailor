import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MasterCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch all categories
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/masterCategories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
   
    fetchCategories();
  }, []);

  // Handle category creation and updating
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    setIsLoading(true);

    try {
      if (isEditing) {
        // Update category
        await axios.put(`${API_URL}/masterCategories/${editingCategoryId}`, { name: categoryName });
      } else {
        // Create category
        await axios.post(`${API_URL}/masterCategories/create`, { name: categoryName });
      }

      setCategoryName('');
      setIsEditing(false);
      setEditingCategoryId('');
      fetchCategories(); // Re-fetch categories
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle category deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${API_URL}/masterCategories/delete/${id}`);
        fetchCategories(); // Re-fetch categories
      } catch (error) {
        console.error('Error deleting category:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle category edit
  const handleEdit = (category) => {
    setCategoryName(category.name);
    setIsEditing(true);
    setEditingCategoryId(category._id);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {isEditing ? 'Edit Category' : 'Add New Master Category'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : isEditing ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      </div>
  
      <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Master Categories</h3>
        {isLoading ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500">No categories found</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {categories.map((category) => (
              <li
                key={category._id}
                className="flex items-center justify-between py-3"
              >
                <span className="text-gray-700">{category.name}</span>
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}  

export default MasterCategory;
