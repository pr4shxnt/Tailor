import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InitialResults = ({ query, setQuery }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/search/name`, {
                    params: { name: query },
                });
                setResults(response.data);
            } catch (err) {
                console.error('Search fetch failed:', err.message || err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    // ✨ Highlight matched query in product name
    const highlightQuery = (text) => {
        const regex = new RegExp(`(${query})`, 'ig');
        const parts = text.split(regex);
        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="text-blue-500 font-semibold">
                    {part}
                </span>
            ) : (
                <span key={index}>{part}</span>
            )
        );
    };

    return (
        <div className="bg-primary shadow-lg rounded-md p-2 ">
            <div className="max-h-72 overflow-y-auto custom-scrollbar">
            {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : results.length === 0 ? (
                <p className="text-sm text-gray-500">No products found</p>
            ) : (
                results.map((item) => (
                    <Link
                        key={item._id}
                        onClick={() => setQuery("")}
                        to={`/product/${item._id}`}
                        className="px-2 py-1 flex flex-col  hover:bg-secondary text-sm text-tertiary"
                    >
                        <div className="flex items-center gap-3">
                            <img src={item.images?.[0]} alt={item.name} className="w-10 h-10 object-cover rounded" />
                            <h1 className="text-lg">{highlightQuery(item.name)}</h1>
                        </div>
                        <div>
                            <h1 className="text-xs text-gray-500">
                                {item.masterCategory} &gt; {item.category} &gt; {item.subCategory}
                            </h1>
                        </div>
                     
                    </Link>
                ))
            )}
            </div>
            <div className="w-full flex gap-2">
                <button
                    onClick={() => setQuery("")}
                    className="w-full mt-2 py-2 text-sm bg-secondary text-tertiary rounded-md hover:bg-second-primary transition duration-300"
                >
                    Clear Search
                </button>
                <button className="w-full">
                    Search
                </button>
            </div>
        </div>
    );
};

export default InitialResults;
