import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2 className='pt-32'>Categories</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New category"
      />
      <select
        value={selectedMasterCategory}
        onChange={(e) => setSelectedMasterCategory(e.target.value)}
      >
        <option value="">Select Master Category</option>
        {masterCategories.map((masterCategory) => (
          <option key={masterCategory._id} value={masterCategory._id}>
            {masterCategory.name}
          </option>
        ))}
      </select>
      <button onClick={handleCreate}>Add Category</button>

      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => handleDelete(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
