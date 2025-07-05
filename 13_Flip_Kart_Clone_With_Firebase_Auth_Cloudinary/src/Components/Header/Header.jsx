import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../services/Actions/authAction';

import { CgProfile } from 'react-icons/cg';
import { BsCart3, BsBox2, BsPersonCircle } from 'react-icons/bs';
import { IoSearchOutline, IoCardOutline } from 'react-icons/io5';
import { LuDiamond } from 'react-icons/lu';
import { CiHeart } from 'react-icons/ci';
import { PiGiftLight } from 'react-icons/pi';
import { FaSquarePlus, FaBars } from 'react-icons/fa6';
import FlipCardlogo from '../../assets/img/Flip_Card_logo.svg';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container } from 'react-bootstrap';
import './Header.css';
import { ToastContainer, toast } from 'react-toastify';

const Header = ({ setSearchQuery }) => {
  const { cartItems } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    dispatch(logoutUser());
    toast.error("User Is LogOut!");
  };

  const getAvatarContent = () => {
    if (user?.email) {
      return <div className="avatar-circle">{user.email.charAt(0).toUpperCase()}</div>;
    }
    return <BsPersonCircle size={20} className="account-icon" />;
  };

  return (
    <>
      <ToastContainer />
      <header className="header-container shadow-sm bg-light">
        <Container>
          <div className="header-top d-flex  ">
            <div className="logo-search">
              <Link to="/" className="logo pe-3">
                <img src={FlipCardlogo} alt="Flip_Card" />
              </Link>
              <div className="search-bar">
                <IoSearchOutline className="search-icon fs-5" />
                <input
                  className="search-input"
                  placeholder="Search for products, Brands and More"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <button className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <FaBars size={22} /> Account
            </button>

            <div className={`header-actions ${isMobileMenuOpen ? 'show-mobile-menu' : ''}`}>
              <Navbar expand="md" variant="light">
                <Nav className=" menu-option d-flex  align-items-start justify-content-center flex-wrap">
                  <div className="d-flex align-items-center">
                    <NavDropdown
                      title={
                        <div className="d-flex align-items-center gap-1 account-dropdown-toggle">
                          {getAvatarContent()}
                          {user ? user.email : "Account"}
                        </div>
                      }
                      className="account-dropdown"
                    >
                      {!user ? (
                        <NavDropdown.Item>
                          <div className="d-flex justify-content-between">
                            <span className="me-3">New Customer?</span>
                            <Link to="/Sign_In" className="text-black text-decoration-none">Sign Up</Link>
                          </div>
                        </NavDropdown.Item>
                      ) : (
                        <>
                          <NavDropdown.Item><CgProfile /> My Profile</NavDropdown.Item>
                          <NavDropdown.Item><LuDiamond /> Flipkart Plus Zone</NavDropdown.Item>
                          <NavDropdown.Item>
                            <BsBox2 />
                            <Link to="/order" className="text-black text-decoration-none ms-2">Orders</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item><CiHeart /> Wishlist</NavDropdown.Item>
                          <NavDropdown.Item><PiGiftLight /> Rewards</NavDropdown.Item>
                          <NavDropdown.Item><IoCardOutline /> Gift Cards</NavDropdown.Item>
                          <NavDropdown.Item onClick={handleLogOut} className="text-danger">Log Out</NavDropdown.Item>
                        </>
                      )}
                    </NavDropdown>
                  </div>

                  <Link to="/Add_To_Cart" className="d-flex align-items-center text-dark text-decoration-none mx-2 position-relative">
                    <BsCart3 className="fs-5" />
                    <span className="ps-1">Cart</span>
                    {cartItems.length > 0 && <span className="cart-count-badge">{cartItems.length}</span>}
                  </Link>

                  {user && user.role == "admin"  ? (
                    <Link to="/Add_Product" className="d-flex align-items-center text-dark text-decoration-none">
                      <FaSquarePlus className="fs-4" />
                      <span className="ps-1">Add Product</span>
                    </Link>
                  ) : (
                    <div
                      className="d-flex align-items-center text-dark text-decoration-none"
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate('/Sign_In')}
                    >
                      <CgProfile className="fs-4" />
                      <span className="ps-1">Login</span>
                    </div>
                  )}
                </Nav>
              </Navbar>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
