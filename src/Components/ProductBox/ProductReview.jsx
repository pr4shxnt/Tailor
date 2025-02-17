import React, { useState, useEffect, useRef, useCallback } from "react";
import { Star, MoreHorizontal, AlertCircle } from "lucide-react";
import axios from "axios";

const MAX_CHARS = 500;

const ProductReview = ({ productId, productName, setReviewsCount, token, isUserAuthenticated }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showOptions, setShowOptions] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(true);
  
  const optionsRef = useRef(null);
  const modalRef = useRef(null);
  const userId = localStorage.getItem('user');

  useEffect(() => {
    const hasRepeatedChars = /(.)\1{4,}/.test(review);
    const hasValidLength = review.length >= 15;
    setIsValid(hasValidLength && !hasRepeatedChars);
  }, [review]);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/${productId}`);
      if (response.data && response.data.reviews) {
        setReviews(response.data.reviews);
        setReviewsCount(response.data.reviews.length)
      } else {
        setReviews([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setReviews([]);
      } else {
        setError("Failed to fetch reviews. Please try again later.");
        console.error("Error fetching reviews:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [productId]);


  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(null);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAllReviews(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleReviewChange = (e) => {
    const input = e.target.value;
    if (input.length <= MAX_CHARS) {
      setReview(input);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isUserAuthenticated) {
      setError("Please log in to submit a review");
      return;
    }
    if (!isValid || rating === 0) {
      setError("Please enter a valid review and select a rating before submitting.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/review`, {
        product: productId,
        user: userId,
        rating,
        comment: review,
        token,
      });
      await fetchReviews();
      setReview("");
      setRating(0);
    } catch (error) {
      setError("Failed to submit review. Please try again.");
      console.error("Error submitting review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!isUserAuthenticated) {
      setError("Please log in to delete your review.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/review/${productId}`, {
        data: {
          userId,
          token,
          reviewId 
        }
      });
      await fetchReviews();
      setShowOptions(null);
    } catch (error) {
      if (error.response?.status === 404) {
        setError("Review not found or already deleted.");
      } else if (error.response?.status === 403) {
        setError("You are not authorized to delete this review.");
      } else {
        setError("Failed to delete review. Please try again.");
      }
      console.error("Error deleting review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ReviewItem = ({ review, index, showOptionsMenu }) => (
    <div className="border-b py-3">
      {
        console.log(review)
        
      }
      <div className="flex justify-between items-center">
      <div>
      <p className="text-yellow-500">
  Rating: <div className="flex">{Array.from({ length: review.rating }).map((_, index) => (
    <div key={index}>⭐</div>
  ))}</div>
</p>

  
  <p className="text-gray-400 flex items-center text-sm gap-1">
    <div className="text-green-900 ">{review.user.name}</div> at{" "}
    {new Date(review.createdAt).toLocaleString()}
  </p>
  <p className="text-gray-700 ">{review.comment}</p>
</div>

        {isUserAuthenticated && review.user._id === userId && (
          <div className="relative">
            <MoreHorizontal
              size={20}
              className="cursor-pointer"
              onClick={() => showOptionsMenu(index)}
            />
            {showOptions === index && (
              <div className="absolute top-0 right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
                <button
                  className="block w-full text-left px-4 rounded-t-lg py-2 text-red-600 hover:bg-gray-100"
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </button>
                <button onClick={() => showOptionsMenu(false)} className="block w-full rounded-b-lg text-left px-4 py-2 text-blue-600 hover:bg-gray-100">
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 mt-3 bg-white shadow-lg">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Review of {productName}</h1>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Rate this product</h3>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;
                return (
                  <Star
                    key={index}
                    size={28}
                    className={`cursor-pointer transition-colors duration-200 ${
                      currentRating <= (hover || rating) 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(currentRating)}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(0)}
                  />
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea
                rows={5}
                className={`w-full p-4 border rounded-lg resize-y focus:outline-none 
                  ${!isValid ? 'border-red-300' : 'border-gray-200'}
                  focus:ring-2 focus:ring-blue-500
                  transition-colors duration-200`}
                placeholder="Share your experience with this product... (minimum 10 characters)"
                value={review}
                onChange={handleReviewChange}
                disabled={isLoading}
              />
              
              <div className="absolute bottom-3 right-3 flex items-center space-x-3 text-sm">
                {!isValid && review.length > 0 && (
                  <div className="flex items-center text-red-500">
                    <AlertCircle size={14} className="mr-1" />
                    <span>Please write a meaningful review</span>
                  </div>
                )}
                <span className={`${
                  review.length > MAX_CHARS - 100 
                    ? 'text-red-500' 
                    : 'text-gray-400'
                }`}>
                  {review.length}/{MAX_CHARS}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {rating > 0 ? `You rated this ${rating} star${rating > 1 ? 's' : ''}` : 'Select a rating'}
              </div>
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg transition-colors duration-200
                  ${isValid && rating > 0 && review.length >= 10
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!isValid || rating === 0 || review.length < 10 || isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 w-full">
          <h2 className="text-xl font-semibold mb-3">User Reviews:</h2>
          {isLoading && <p>Loading reviews...</p>}
          {!isLoading && reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}
          {!isLoading && reviews.length > 0 && (
            <>
              {reviews.slice(0, 2).map((review, index) => (
                <ReviewItem
                  key={review._id}
                  review={review}
                  index={index}
                  showOptionsMenu={setShowOptions}
                />
              ))}
              {reviews.length > 2 && (
                <button
                  className="mt-4 text-blue-600 hover:underline"
                  onClick={() => setShowAllReviews(true)}
                >
                  See All Reviews
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {showAllReviews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div ref={modalRef} className="bg-white pt-6 pl-6 pb-6 mx-2 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-semibold mb-4">All Reviews</h2>

            <div className="h-96 md:px-6 pr-6  overflow-auto">
              {reviews.map((review, index) => (
                <ReviewItem
                  key={review._id}
                  review={review}
                  index={index}
                  showOptionsMenu={setShowOptions}
                />
              ))}
            </div>

            <button
              className="mt-4 text-red-600 hover:underline"
              onClick={() => setShowAllReviews(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReview;