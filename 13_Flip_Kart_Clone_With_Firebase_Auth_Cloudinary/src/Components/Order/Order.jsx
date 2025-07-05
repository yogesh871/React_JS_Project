import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import { FiCalendar, FiDollarSign, FiPackage, FiTruck } from 'react-icons/fi';
import './Order.css';

const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/Sign_In');
        return;
      }

      const q = query(collection(db, 'orders'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() });
      });

      fetchedOrders.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setOrders(fetchedOrders);
      setLoading(false);
    };

    fetchOrders();
  }, [navigate]);

  if (loading) return <div className="loading">Loading</div>;

  if (orders.length === 0) {
    return (
      <div className="order-empty">
        <div className="empty-card">
          <div className="empty-icon">📭</div>
          <h3>No Orders Found</h3>
          <p className="empty-text">
            You haven't placed any orders yet. Start shopping to see your orders here!
          </p>
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
      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h2>
                {/* <FiPackage style={{ marginRight: '10px' }} /> */}
                Order #{order.orderId}
              </h2>
              <div className="order-meta">
                <div>
                  <FiCalendar />
                  <span>Date:</span> 
                  {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                </div>
                <div>
                  <FiDollarSign />
                  <span>Total:</span> 
                  ₹{order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                </div>
                <div>
                  <FiTruck />
                  <span>Status:</span> 
                  <span style={{ color: 'var(--success)' }}>Delivered</span>
                </div>
              </div>
            </div>
            
            <div className="order-items">
              <h3 className="section-title">Order Items</h3>
              <div className="items-list">
                {order.items.map((item, i) => (
                  <div key={i} className="item-card align-items-center justify-content-between">
                    <div className='d-flex gap-3 align-items-center '>

                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <div className="item-meta  d-flex">
                        <div>
                          <span>Qty:</span> {item.quantity}
                        </div>
                        <div>
                          <span>Price:</span> ₹{item.price}
                        </div>
                        <div>
                          <span>Size:</span> {item.size || 'One Size'}
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="item-total">
                      ₹{(item.quantity * item.price).toFixed(2)}
                    </div>
                    <div className="item-status delivered">Delivered</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;