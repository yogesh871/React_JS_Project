import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';

const Order = () => {
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const savedOrder = localStorage.getItem('recentOrder');
    if (savedOrder) {
      setOrderItems(JSON.parse(savedOrder));
    }
  }, []);


  if (orderItems.length === 0) {
    return (
      <div className="order-empty">
        <div className="empty-card">
          <div className="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/>
            </svg>
          </div>
          <h3>No Orders Found</h3>
          <p className="empty-text">You haven't placed any orders yet</p>
          <button
            onClick={() => navigate('/')}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="order-card">
        <div className="order-header">
          <div className="header-content">
            <h2>Your Order</h2>
            <div className="order-meta">
              <div className="order-id">
                <span>Order ID:</span> #{Math.floor(Math.random() * 1000000)}
              </div>
              <div className="order-date">
                <span>Date:</span> {new Date().toLocaleDateString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        <div className="order-items">
          <h3 className="section-title">Order Summary</h3>
          <div className="items-list">
            {orderItems.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-image-container">
                  <img src={item.image} alt={item.name} className="item-image" />
                </div>
                <div className="item-details">
                  <h4 className="item-name">{item.name}</h4>
                  <div className="item-meta">
                    <div className="item-qty">Qty: {item.quantity}</div>
                    <div className="item-price">₹{item.price.toLocaleString('en-IN')} each</div>
                  </div>
                </div>
                <div className="item-total">
                  ₹{(item.quantity * item.price).toLocaleString('en-IN')}
                </div>
                <div className="item-status delivered">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Delivered
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Order;