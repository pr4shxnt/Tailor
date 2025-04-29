import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubCategorySelect = () => {
    const [masterCategories, setMasterCategories] = useState([]);
    const [categories, setCategories] = useState([]); // Store categories for the selected master category
    const [selectedMasterCategory, setSelectedMasterCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newSubCategoryName, setNewSubCategoryName] = useState('');
    const [subcategories, setSubCategories] = useState([]);

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

    useEffect(() => {
        const getSubCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/subcategories`);
                setSubCategories(response.data);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        }
        getSubCategories();
    }, []);

    console.log('subcategories', subcategories); // Debugging line to check fetched subcategories
    console.log('masterCategories', masterCategories); // Debugging line to check fetched master categories
    

    // Fetch categories when a master category is selected
    useEffect(() => {
        if (selectedMasterCategory) {
            // If you're sending ID, you should pass selectedMasterCategoryId here
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
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Subcategory</h2>

                {/* Master Category Select */}
                <div className="mb-4">
                 
                    <select
                        id="master-category"
                        onChange={(e) => setSelectedMasterCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Master Category</option>
                        {masterCategories.map((cat) => (
                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Category Select */}
                {selectedMasterCategory && categories.length > 0 && (
                    <div className="mb-4">
                        
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Subcategory Name Input */}
                <div className="mb-4">
                     
                    <input
                        id="new-subcategory"
                        type="text"
                        value={newSubCategoryName}
                        onChange={(e) => setNewSubCategoryName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter subcategory name"
                    />
                </div>

                {/* Create Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleCreateSubCategory}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Create Subcategory
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubCategorySelect;
