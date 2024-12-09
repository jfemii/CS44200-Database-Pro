import React, { useState } from 'react';

const ReviewForm = ({ itemId, userId, orderId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8800/api/reviews/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    itemId,
                    orderId,
                    rating,
                    message
                }),
            });

            if (response.ok) {
                onReviewSubmitted();
                setMessage('');
                setRating(5);
            } else {
                console.error('Error submitting review');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="review-form">
            <h4>Write a Review</h4>
            <div className="rating-select">
                <label>Rating:</label>
                <select 
                    value={rating} 
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    <option value="5">5 stars</option>
                    <option value="4">4 stars</option>
                    <option value="3">3 stars</option>
                    <option value="2">2 stars</option>
                    <option value="1">1 star</option>
                </select>
            </div>
            <div className="review-message">
                <label>Your Review:</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength="250"
                    placeholder="Write your review here..."
                />
            </div>
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="submit-review-btn"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
};

export default ReviewForm; 