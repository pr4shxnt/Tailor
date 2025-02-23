import axios from "axios";
import { MoreVertical } from "lucide-react";
import React, { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
    const [menuOpen, setMenuOpen] = useState(false);


    const handleAddToFeatured = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/featured`, {
                productId: product._id, // Properly sending the ID inside an object
            });
            alert("Product added to featured successfully!");
        } catch (error) {
            console.error("Error adding to featured:", error);
            alert("Failed to add product to featured.");
        }
    };
    

    return (
        <div key={product._id} className="p-4 bg-gray-100 rounded-lg relative">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            <p className="text-sm text-gray-500">Price: ${product.price}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>

            {/* Product Images */}
            <div className="flex space-x-2 mt-2">
                {product.images.slice(0, 3).map((image, index) => (
                    <img key={index} src={`${import.meta.env.VITE_BACKEND_URL}/${image}`} alt="Product" className="w-12 h-12 rounded" />
                ))}
            </div>

            {/* More Options Button */}
            <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="absolute top-2 right-2"
            >
                <MoreVertical />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
                <div className="absolute z-20 top-8 right-2 bg-white shadow-md p-2 rounded-md w-48">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                        Add to Recommended
                    </button>
                    <button onClick={handleAddToFeatured} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                        Add to Featured
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                        Add to Best Selling
                    </button>
                    <div className="border-t mt-2 pt-2">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                            Edit
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200">
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProductsManager = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [error, setError] = useState("");

    const [selectedMasterCategory, setSelectedMasterCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const [categories, setCategories] = useState({});
    
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
            setAllProducts(response.data);

            // Create a structured category mapping
            const categoryStructure = response.data.reduce((acc, product) => {
                const { masterCategory, category, subCategory } = product;
                if (!acc[masterCategory]) acc[masterCategory] = {};
                if (!acc[masterCategory][category]) acc[masterCategory][category] = new Set();
                acc[masterCategory][category].add(subCategory);
                return acc;
            }, {});

            setCategories(categoryStructure);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter products based on selected filters
    const filteredProducts = allProducts.filter((product) => {
        return (
            (!selectedMasterCategory || product.masterCategory === selectedMasterCategory) &&
            (!selectedCategory || product.category === selectedCategory) &&
            (!selectedSubCategory || product.subCategory === selectedSubCategory)
        );
    });

    return (
        <div className="p-5">
            {error && <p className="text-red-500">{error}</p>}

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                {/* Master Category Selector */}
                <div>
                    <label className="block text-lg font-semibold mb-2">Master Category:</label>
                    <select
                        value={selectedMasterCategory}
                        onChange={(e) => {
                            setSelectedMasterCategory(e.target.value);
                            setSelectedCategory("");
                            setSelectedSubCategory("");
                        }}
                        className="p-2 border rounded-md w-full"
                    >
                        <option value="">All Master Categories</option>
                        {Object.keys(categories).map((masterCategory) => (
                            <option key={masterCategory} value={masterCategory}>
                                {masterCategory}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category Selector */}
                <div>
                    <label className="block text-lg font-semibold mb-2">Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setSelectedSubCategory("");
                        }}
                        className="p-2 border rounded-md w-full"
                        disabled={!selectedMasterCategory}
                    >
                        <option value="">All Categories</option>
                        {selectedMasterCategory &&
                            Object.keys(categories[selectedMasterCategory] || {}).map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Subcategory Selector */}
                <div>
                    <label className="block text-lg font-semibold mb-2">Subcategory:</label>
                    <select
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                        className="p-2 border rounded-md w-full"
                        disabled={!selectedCategory}
                    >
                        <option value="">All Subcategories</option>
                        {selectedMasterCategory &&
                            selectedCategory &&
                            Array.from(categories[selectedMasterCategory][selectedCategory] || []).map(
                                (subCategory) => (
                                    <option key={subCategory} value={subCategory}>
                                        {subCategory}
                                    </option>
                                )
                            )}
                    </select>
                </div>
            </div>

            {/* Display Products */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No products found for the selected filters.</p>
            )}
        </div>
    );
};

export default ProductsManager;
