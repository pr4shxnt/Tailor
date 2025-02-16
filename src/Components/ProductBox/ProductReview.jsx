import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import axios from "axios";

const ProductReview = ({ productId, token }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState([]);


  const user = localStorage.getItem('user')

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/${productId}`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in to submit a review");
      return;
    }
    if (review.trim() === "" || rating === 0) {
      alert("Please enter a review and select a rating before submitting.");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/review`, {
        product: productId,
        user: user, // Replace with actual user ID from token
        rating,
        comment: review,
        token,
      });
      fetchReviews(); // Refresh reviews
      setReview("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Review of Product</h1>

      {/* Star Rating System */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <Star
              key={index}
              size={30}
              className={`cursor-pointer transition ${
                currentRating <= (hover || rating)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(currentRating)}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            />
          );
        })}
      </div>

      {/* Review Input */}
      <form onSubmit={handleSubmit}>
        <textarea
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>

      {/* Display Reviews */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">User Reviews:</h2>
        {reviews.length > 0 ? (
          reviews.map((r, index) => (
            <div key={index} className="border-b py-3">
              <p className="text-yellow-500">Rating: {r.rating} ⭐</p>
              <p className="text-gray-700">{r.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
