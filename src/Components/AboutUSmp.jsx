import React from 'react';
import { Scissors, Star, Clock, Medal, Users, ThumbsUp } from 'lucide-react';

function AboutUSmp() {
  return (
    <div className="min-h-screen  bg-white">
      {/* Hero Section */}
      <div
        className="h-[60vh] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://imgs.search.brave.com/UBTtnte-2v_tuoBxwbBjd4pX0CNi89S3W1DQvBOpOXk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/b2ZmaWNlLXdvbWFu/LWhhbmRzLW9uLXJl/cG9ydC5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Scissors className="w-10 h-10" />
              Shanta Tailorings
            </h1>
            <p className="text-xl">Explore the elegance !!</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              For over three decades, Shanta Tailors has been the epitome of bespoke tailoring excellence. 
              Founded in 1985 by Master Tailor Shanta Kumar, our establishment has dressed generations of 
              clients with impeccable style and precision.
            </p>
            <p className="text-gray-600 mb-4">
              We take pride in our heritage of craftsmanship, combining traditional techniques with modern 
              styling to create garments that are both timeless and contemporary.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <Star className="w-8 h-8 text-amber-600 mb-2" />
              <h3 className="font-semibold mb-2">Excellence</h3>
              <p className="text-sm text-gray-600">Committed to delivering the highest quality</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <Clock className="w-8 h-8 text-amber-600 mb-2" />
              <h3 className="font-semibold mb-2">Timely</h3>
              <p className="text-sm text-gray-600">Punctual delivery without compromising quality</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <Medal className="w-8 h-8 text-amber-600 mb-2" />
              <h3 className="font-semibold mb-2">Expertise</h3>
              <p className="text-sm text-gray-600">35+ years of tailoring experience</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <Users className="w-8 h-8 text-amber-600 mb-2" />
              <h3 className="font-semibold mb-2">Personal</h3>
              <p className="text-sm text-gray-600">Individualized attention to every client</p>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600">The trust of our clients speaks volumes about our work</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg">
                <ThumbsUp className="w-6 h-6 text-amber-600 mb-4" />
                <p className="text-gray-600 mb-4">
                  "Exceptional craftsmanship and attention to detail. My suits from Shanta Tailors 
                  always receive compliments."
                </p>
                <p className="font-semibold">- Satisfied Client {i}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Visit Our Shop</h2>
          <p className="text-gray-600 mb-4">123 Fashion Street, Textile District</p>
          <p className="text-gray-600 mb-4">Monday - Saturday: 10:00 AM - 7:00 PM</p>
          <p className="text-gray-600">Contact: (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUSmp;