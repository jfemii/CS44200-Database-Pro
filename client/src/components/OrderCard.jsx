import React from 'react';

const OrderCard = ({ order }) => {
    return (
        <div className="order-card">
            <div className="order-header">
                <h3>Order #{order.orderId}</h3>
                <span className="order-date">
                    {new Date(order.date).toLocaleDateString()}
                </span>
            </div>
            <div className="order-items">
                {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                        <span className="item-details">
                            {item.quantity} {item.name} (${item.price.toFixed(2)} each)
                        </span>
                    </div>
                ))}
            </div>
            <div className="order-total">
                <strong>Total: ${order.total.toFixed(2)}</strong>
            </div>
        </div>
    );
};

export default OrderCard; 