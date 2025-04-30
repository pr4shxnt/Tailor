import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
 

const VideoComp = () => {
   const sectionRef = useRef(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false); // Tracks if seen once

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true); // Set true permanently when seen
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasBeenVisible]); // Dependency ensures effect runs only if `hasBeenVisible` changes


  return (
    <div className="py-10 h-screen w-[85%] container pt-16 flex flex-col">
      <div>
        {/* Heading */}
        <h1
          className={`text-2xl md:text-4xl uppercase tracking-wider font-bold opacity-0 ${
            hasBeenVisible ? "animate-fade-left-right" : ""
          }`}
        >
          <div className="flex gap-3">
            Short <span className="text-purple-500">Glimpse.</span>
          </div>
          <p className="text-[10px] md:text-[13px] leading-4 font-light">
            Enjoy Shopping and subscribe for free coupons.
          </p>
        </h1>

        {/* Featured Product Grid */}
      <div className="h-full w-full ">
        <div
          ref={sectionRef}
          className="w-full h-full mt-8"
        >
<iframe
  className={`w-full h-[70vh] opacity-0 transition-opacity duration-1000 ${
    hasBeenVisible ? "animate-fade-in-up animation-delay-200" : ""
  }`}
  src="https://www.youtube.com/embed/RFFPS-TwXBI"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>

 </div>
      </div>
      </div>
    </div>
  );
};

export default VideoComp;
