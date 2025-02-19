import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    alt: 'Scenic mountain landscape',
    text: 'Men Collection'
  },
  {
    url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
    alt: 'Women Collection',
    text: 'Women Collection'
  },
  {
    url: 'https://images.unsplash.com/photo-1682687220795-796d3f6f7000',
    alt: 'Unisex',
    text: 'Unisex Collection'
  },
  
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="relative w-[80%] rounded-xl mx-auto h-[350px] overflow-hidden">
      {/* Image Slider */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full relative h-[350px]">
            <img
              src={`${image.url}?auto=format&fit=crop&w=1600&h=900`}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center text-white bg-black/30">
              <div className="text-center">
                <div className="text-3xl font-medium mb-4">{image.text}</div>
                <Link
                  to="/shop"
                  className="inline-block text-sm uppercase border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
