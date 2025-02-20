import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

const categories = [
  { id: 1, name: "Electronics", img: "https://via.placeholder.com/150" },
  { id: 2, name: "Clothing", img: "https://via.placeholder.com/150" },
  { id: 3, name: "Home & Kitchen", img: "https://via.placeholder.com/150" },
  { id: 4, name: "Beauty & Health", img: "https://via.placeholder.com/150" },
];

const BrowseByCategory = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);



  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className=" py-10 container w-[85%] pt-16 flex flex-col items-center">
      <div className="">
        <h1 className={`text-4xl uppercase tracking-wider font-bold opacity-0 ${
               isVisible
                 ? `animate-fade-left-right`
                 : ""
             }`}>
                <div className="flex gap-3 ">
          Browse by 
          <h1 className="text-purple-500">Category.</h1></div>
          <p className="text-[13px] leading-4 font-light">Enjoy Shopping and subscribe for free coupons.</p>
        </h1>

        {/* Category Cards */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
        >
         

           <div
             
             className={` bg-gray-200 text-gray-800 rounded-[3px] shadow-lg text-center opacity-0 ${
               isVisible
                 ? `animate-fade-in-up`
                 : ""
             }`}
           >
            <div className="">
                <img src="https://imgs.search.brave.com/aecOkH35TEUPtieqe1o7o4Y6Kkb8__pZklBQrKhttsA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyNS8w/Mi8wMi8xNC8wNi9i/aXJkLTkzNzY4MzFf/NjQwLmpwZw" alt="" className="w-full object-cover h-[300px]"/>
            </div>
            <div className="p-5">
             <h2 className="text-xl uppercase font-semibold ">Kids</h2>
             <p className="text-purple-500 text-sm tracking-wider font-extralight underline">Visit</p>
           </div>
</div>

<div
             
             className={` bg-gray-200 text-gray-800 rounded-[3px]  shadow-lg text-center opacity-0 ${
               isVisible
                 ? `animate-fade-in-up animation-delay-300`
                 : ""
             }`}
           >
            <div className="">
                <img src="https://imgs.search.brave.com/aecOkH35TEUPtieqe1o7o4Y6Kkb8__pZklBQrKhttsA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyNS8w/Mi8wMi8xNC8wNi9i/aXJkLTkzNzY4MzFf/NjQwLmpwZw" alt="" className="w-full object-cover h-[300px]"/>
            </div>
            <div className="p-5">
             <h2 className="text-xl uppercase font-semibold ">Kids</h2>
             <p className="text-purple-500 text-sm tracking-wider font-extralight underline">Visit</p>
           </div>
</div>

<div
             
             className={` bg-gray-200 text-gray-800 rounded-[3px] shadow-lg text-center opacity-0 ${
               isVisible
                 ? `animate-fade-in-up animation-delay-600`
                 : ""
             }`}
           >
            <div className="">
                <img src="https://imgs.search.brave.com/aecOkH35TEUPtieqe1o7o4Y6Kkb8__pZklBQrKhttsA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyNS8w/Mi8wMi8xNC8wNi9i/aXJkLTkzNzY4MzFf/NjQwLmpwZw" alt="" className="w-full object-cover h-[300px]"/>
            </div>
            <div className="p-5">
             <h2 className="text-xl uppercase font-semibold ">Kids</h2>
             <p className="text-purple-500 text-sm tracking-wider font-extralight underline">Visit</p>
           </div>
</div>

<div
             
             className={` bg-gray-200 text-gray-800 rounded-[3px] shadow-lg text-center opacity-0 ${
               isVisible
                 ? `animate-fade-in-up animation-delay-900`
                 : ""
             }`}
           >
            <div className="">
                <img src="https://imgs.search.brave.com/aecOkH35TEUPtieqe1o7o4Y6Kkb8__pZklBQrKhttsA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyNS8w/Mi8wMi8xNC8wNi9i/aXJkLTkzNzY4MzFf/NjQwLmpwZw" alt="" className="w-full object-cover h-[300px]"/>
            </div>
            <div className="p-5">
             <h2 className="text-xl uppercase font-semibold ">Kids</h2>
             <p className="text-purple-500 text-sm tracking-wider font-extralight underline">Visit</p>
           </div>
</div>
  
         
        </div>
      </div>
    </div>
  );
};

export default BrowseByCategory;
