import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';

const ReviewSection = ({ itemId }) => {
    console.log('ReviewSection rendered with itemId:', itemId);
    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState({ average_rating: 0, review_count: 0 });
    const [canReview, setCanReview] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const userData = JSON.parse(localStorage.getItem('user'));

    const handleReviewSubmitted = () => {
        // Refresh reviews and stats after new review
        fetch(`http://localhost:8800/api/reviews/${itemId}`)
            .then(res => res.json())
            .then(data => setReviews(data));
        
        fetch(`http://localhost:8800/api/reviews/stats/${itemId}`)
            .then(res => res.json())
            .then(data => setStats(data));
        
        setCanReview(false);
    };

    useEffect(() => {
        console.log('ReviewSection mounted with:', {
            itemId,
            userData,
            canReview
        });
        
        if (userData) {
            const url = `http://localhost:8800/api/reviews/can-review?userId=${userData.user_id}&itemId=${itemId}`;
            console.log('Attempting to fetch from:', url);
            
            fetch(url)
                .then(res => {
                    console.log('Got response:', res.status);
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    console.log('Raw response data:', data);
                    if (data && typeof data === 'object') {
                        console.log('Setting canReview to:', data.canReview);
                        setCanReview(data.canReview);
                        setOrderId(data.orderId);
                    } else {
                        console.error('Unexpected response format:', data);
                    }
                })
                .catch(err => {
                    console.error("Error checking review eligibility:", err);
                });
        } else {
            console.log('No user data found in localStorage');
        }
    }, [itemId, userData]);

    useEffect(() => {
        console.log('ReviewSection useEffect triggered with itemId:', itemId);
        // Fetch reviews
        fetch(`http://localhost:8800/api/reviews/${itemId}`)
            .then(res => res.json())
            .then(data => {
                console.log('Fetched reviews:', data);
                setReviews(data);
            })
            .catch(err => console.error("Error fetching reviews:", err));

        // Fetch review stats
        fetch(`http://localhost:8800/api/reviews/stats/${itemId}`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error("Error fetching review stats:", err));
    }, [itemId]);

    console.log('Current state:', { canReview, userData, orderId });

    return (
        <div className="reviews-section">
            <h3>Customer Reviews</h3>
            <div className="review-stats">
                <p>
                    {stats.average_rating ? stats.average_rating.toFixed(1) : '0'}/5 stars
                    ({stats.review_count} {stats.review_count === 1 ? 'review' : 'reviews'})
                </p>
            </div>

            {canReview && userData && (
                <ReviewForm 
                    itemId={itemId}
                    userId={userData.user_id}
                    orderId={orderId}
                    onReviewSubmitted={handleReviewSubmitted}
                />
            )}

            <div className="reviews-list">
                {reviews.map(review => (
                    <div key={review.review_id} className="review-card">
                        <div className="review-header">
                            <span className="username">{review.username}</span>
                            <span className="rating">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                        </div>
                        <p className="review-date">
                            {new Date(review.review_date).toLocaleDateString()}
                        </p>
                        <p className="review-message">{review.review_message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSection; 