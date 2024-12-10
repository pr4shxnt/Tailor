import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import video from '../../../assets/background-video-header.mp4'; // Update with your video path

const Homepage = () => {
  return (
    <>
      <section className="header-container h-screen flex items-center justify-center relative overflow-hidden">
        <video autoPlay loop muted className="absolute inset-0 object-cover w-full h-full">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-white opacity-5" ></div> {/* Adjust opacity as needed */}

        <div className="txtBox1 text-center z-50">
          <h1 className="text-4xl font-bold  text-gray-100">Tailor-Made Elegance</h1>
          <p className="text-sm mb-6 text-gray-400">Crafted with precision, designed for you.</p>
          <Link to="/category/all_collection" className="text-sm font-semibold border-solid border-2 rounded-md p-3 hover:bg-gray-400 transition-all duration-700 border-gray-400 hover:text-black bg-transparent text-gray-400">
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Homepage;
