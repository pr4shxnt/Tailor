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
    <div className="category-manager">
      <h2 className="text-center mb-4">{isEditing ? 'Edit Category' : 'Add New Category'}</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
          {isLoading ? 'Saving...' : isEditing ? 'Update Category' : 'Add Category'}
        </button>
      </form>

      <div className="category-list mt-4">
        <h3>Categories</h3>
        {isLoading ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          <ul className="list-group">
            {categories.map((category) => (
              <li key={category._id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{category.name}</span>
                <div>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
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
};

export default MasterCategory;
