import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubCategorySelect = () => {
    const [masterCategories, setMasterCategories] = useState([]);
    const [categories, setCategories] = useState([]); // Store categories for the selected master category
    const [selectedMasterCategory, setSelectedMasterCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newSubCategoryName, setNewSubCategoryName] = useState('');

    // Fetch master categories on component mount
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/masterCategories`)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setMasterCategories(res.data);
                } else {
                    setMasterCategories([]);
                }
            })
            .catch(err => console.error('Error fetching master categories:', err));
    }, []);

    // Fetch categories when a master category is selected
    useEffect(() => {
        if (selectedMasterCategory) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/subcategories/by-master-category/${selectedMasterCategory}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setCategories(res.data);
                    } else {
                        setCategories([]);
                    }
                })
                .catch(err => console.error('Error fetching categories:', err));
        } else {
            setCategories([]);
        }
    }, [selectedMasterCategory]);

    // Handle the creation of a new subcategory
    const handleCreateSubCategory = () => {
        if (!newSubCategoryName || !selectedMasterCategory || !selectedCategory) {
            alert('Please select a master category, a category, and provide a subcategory name.');
            return;
        }
    
        // Find the selected master category ID
        const selectedMasterCategoryId = masterCategories.find(
            (cat) => cat.name === selectedMasterCategory
        )?._id;
    
        // Find the selected category ID
        const selectedCategoryId = categories.find(
            (cat) => cat.name === selectedCategory
        )?._id;
    
        if (!selectedMasterCategoryId || !selectedCategoryId) {
            alert('Invalid master category or category selection.');
            return;
        }
    
        const payload = {
            name: newSubCategoryName,
            masterCategoryId: selectedMasterCategoryId,
            categoryId: selectedCategoryId
        };
    
        console.log('Payload:', payload); // Add this line to debug the request payload
    
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/subcategories/create`, payload)
            .then(res => {
                console.log('Subcategory created:', res.data);
                setNewSubCategoryName('');
                setSelectedCategory('');
            })
            .catch(err => {
                console.error('Error creating subcategory:', err);
            });
    };
    

    return (
        <div className="p-4 pt-16">
            <h2 className="text-xl font-semibold mb-4">Create Subcategory</h2>

            {/* Master Category Select */}
            <label htmlFor="master-category" className="block text-sm font-medium mb-2">Master Category</label>
            <select 
                id="master-category"
                onChange={(e) => setSelectedMasterCategory(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            >
                <option value="">Select Master Category</option>
                {masterCategories.map((cat) => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
            </select>

            {/* Category Select (based on selected master category) */}
            {selectedMasterCategory && categories.length > 0 && (
                <>
                    <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
                    <select 
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border p-2 rounded w-full mb-4"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </>
            )}

            {/* Input for New Subcategory Name */}
            <div className="mt-4">
                <label htmlFor="new-subcategory" className="block text-sm font-medium mb-2">New Subcategory Name</label>
                <input 
                    id="new-subcategory"
                    type="text"
                    value={newSubCategoryName}
                    onChange={(e) => setNewSubCategoryName(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                    placeholder="Enter subcategory name"
                />
            </div>

            {/* Create Subcategory Button */}
            <button 
                onClick={handleCreateSubCategory}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Create Subcategory
            </button>
        </div>
    );
};

export default SubCategorySelect;
