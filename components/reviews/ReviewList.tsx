/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { createReview } from '@/lib/data';
import { toast } from 'react-hot-toast';
import { formatDate } from '@/lib/utils';

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface ReviewListProps {
  productId: string;
  reviews: Review[];
  userReview: Review | null; // Review dari user saat ini jika ada
  userId: string | null; // ID user yang sedang login
}

export default function ReviewList({ productId, reviews, userReview, userId }: ReviewListProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      toast.error('Please login to add a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setLoading(true);
    try {
      const result = await createReview({
        productId,
        rating,
        comment
      });

      if (result.success) {
        toast.success('Review added successfully');
        // Refresh page untuk menampilkan review baru
        window.location.reload();
      } else {
        toast.error(result.message || 'Failed to add review');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';
  
    const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 1);
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Review Summary */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold">{averageRating}</div>
          <div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(Number(averageRating))
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Add Review Form */}
      {userId && !userReview && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Share your thoughts about the product..."
              />
            </div>

            <button
              type="submit"
              disabled={loading || rating === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={review.user.image || '/avatar.svg'}
                alt={review.user.name || 'User'}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{review.user.name || 'Anonymous'}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(review.createdAt.toString())}
                </p>
              </div>
            </div>

            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= review.rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            {review.comment && (
              <p className="text-gray-700">{review.comment}</p>
            )}
          </div>
        ))}

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No reviews yet. Be the first to review this product!
          </p>
        ) : reviews.length > 1 && (
          <div className="text-center">
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 
                         rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white 
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-blue-500 transition-colors duration-200"
            >
              {showAllReviews ? 'Show Less' : `View All Reviews (${reviews.length})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}