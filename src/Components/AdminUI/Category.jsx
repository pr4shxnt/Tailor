import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { div } from 'framer-motion/client';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [masterCategories, setMasterCategories] = useState([]);
  const [selectedMasterCategory, setSelectedMasterCategory] = useState('');

  // Fetch categories and master categories on initial load
  useEffect(() => {
    const loadCategories = async () => {
      const categoryResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories`);
      setCategories(categoryResponse.data);

      const masterCategoryResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/masterCategories`);
      setMasterCategories(masterCategoryResponse.data);
    };
    loadCategories();
  }, []);

  // Handle creating a new category
  const handleCreate = async () => {
    if (newCategory.trim() && selectedMasterCategory) {
      try {
        const response = await axios.post('http://localhost:3500/api/categories/create', {
          name: newCategory,
          masterCategoryId: selectedMasterCategory, // Ensure this is the ID of the master category
        });
        setNewCategory('');
        setSelectedMasterCategory('');
        const updatedCategories = await axios.get('http://localhost:3500/api/categories');
        setCategories(updatedCategories.data);
      } catch (error) {
        console.error('Error creating category:', error);
        alert('An error occurred while creating the category.');
      }
    } else {
      alert("Both name and master category are required");
    }
  };
  

  // Handle deleting a category
  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/categories/${id}`);
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories`);
    setCategories(response.data);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Category</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category Name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedMasterCategory}
            onChange={(e) => setSelectedMasterCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Master Category</option>
            {masterCategories.map((masterCategory) => (
              <option key={masterCategory._id} value={masterCategory._id}>
                {masterCategory.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Category
          </button>
        </div>
      </div>
  
      <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Categories</h3>
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories found</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {categories.map((category) => (
              <li
                key={category._id}
                className="flex items-center justify-between py-3"
              >
                <span className="text-gray-700 flex items-center gap-1 justify-center  uppercase">{category.name } <div className="h-1 w-1 rounded-full bg-tertiary"></div> <li className="text-blue-500 text-xs">{category.masterCategoryName}</li></span>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
  
};

export default Category;
