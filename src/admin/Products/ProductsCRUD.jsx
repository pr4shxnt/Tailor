import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsCRUD = () => {
    const [products, setProducts] = useState([]);
    const [masterCategories, setMasterCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        masterCategory: "",
        category: "",
        subCategory: "",
        size: "",
        brand: "",
        avgRating: "",
        stock: "",
        images: []
    });

    // Fetch master categories
    const fetchMasterCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/masterCategories`);
            setMasterCategories(response.data);
        } catch (error) {
            console.error('Error fetching master categories', error);
        }
    };

    // Fetch categories based on selected master category
    const fetchCategories = async (masterCategoryName) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories`);
            const filteredCategories = response.data.filter(
                (category) => category.masterCategoryName === masterCategoryName
            );
            setCategories(filteredCategories);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    // Fetch subcategories based on selected category
    const fetchSubCategories = async (categoryName) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/subCategories`);
            const filteredSubCategories = response.data.filter(
                (subCategory) => subCategory.categoryName === categoryName
            );
            setSubCategories(filteredSubCategories);
        } catch (error) {
            console.error('Error fetching subcategories', error);
        }
    };

    // Fetch products
    const productsFetch = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };

    // Handle master category selection
    const handleMasterCategoryChange = (e) => {
        const selectedMasterCategory = e.target.value;
        setFormData((prev) => ({ ...prev, masterCategory: selectedMasterCategory }));
        fetchCategories(selectedMasterCategory);
        setFormData((prev) => ({ ...prev, category: "", subCategory: "" }));
    };

    // Handle category selection
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setFormData((prev) => ({ ...prev, category: selectedCategory }));
        fetchSubCategories(selectedCategory);
        setFormData((prev) => ({ ...prev, subCategory: "" }));
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const files = e.target.files;
        setFormData((prevState) => ({
            ...prevState,
            images: [...prevState.images, ...Array.from(files)],
        }));
    };

    // Handle form submission for creating a product
    const handleCreate = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('masterCategory', formData.masterCategory);
        data.append('category', formData.category);
        data.append('subCategory', formData.subCategory);
        data.append('size', formData.size);
        data.append('brand', formData.brand);
        data.append('stock', formData.stock);

        // Append images
        formData.images.forEach((image) => {
            data.append('images', image);
        });

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products/create`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const newProduct = response.data;
            console.log(newProduct);
            productsFetch();
            // Reset form after successful submission
            setFormData({
                name: "",
                description: "",
                price: "",
                masterCategory: "",
                category: "",
                subCategory: "",
                size: "",
                brand: "",
                avgRating: "",
                stock: "",
                images: []
            });
        } catch (error) {
            console.error('Error creating product', error);
        }
    };

    useEffect(() => {
        fetchMasterCategories();
        productsFetch();
    }, []);

    return (
        <div className="pt-16">
            <form onSubmit={handleCreate}>
                <div>
                    <label>Product Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label>Master Category</label>
                    <select value={formData.masterCategory} onChange={handleMasterCategoryChange}>
                        <option value="">Select Master Category</option>
                        {masterCategories.map((masterCategory) => (
                            <option key={masterCategory._id} value={masterCategory.name}>
                                {masterCategory.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Category</label>
                    <select value={formData.category} onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Sub Category</label>
                    <select
                        value={formData.subCategory}
                        onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    >
                        <option value="">Select Sub Category</option>
                        {subCategories.map((subCategory) => (
                            <option key={subCategory._id} value={subCategory.name}>
                                {subCategory.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                </div>

                <div>
                    <label>Size</label>
                    <input
                        type="text"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    />
                </div>

                <div>
                    <label>Brand</label>
                    <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    />
                </div>

                <div>
                    <label>Stock</label>
                    <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div>
                    <label>Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    <div className="image-previews">
                        {formData.images.map((image, index) => (
                            <img key={index} src={URL.createObjectURL(image)} alt={`preview-${index}`} width="100" />
                        ))}
                    </div>
                </div>

                <button type="submit">Create Product</button>
            </form>

            <div>
                <h2>All Products</h2>
                {products.map((product) => (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsCRUD;
