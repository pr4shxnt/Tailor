import React from 'react';
import { Link } from 'react-router-dom';

 
const Homepage = () => {
  return (
    <>
      <section className="header-container bg-gray-300 h-screen flex items-center justify-center relative overflow-hidden">
        <div className=" text-center">
          <h1 className="text-4xl font-bold  text-gray-700">Tailor-Made Elegance</h1>
          <p className="text-sm mb-6 text-gray-600">Crafted with precision, designed for you.</p>
          <Link to="/category/all_collection" className="text-sm font-semibold border-solid border-2 rounded-md p-3 hover:bg-gray-400 transition-all duration-700 border-gray-400 hover:text-black bg-transparent text-gray-400">
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Homepage;
