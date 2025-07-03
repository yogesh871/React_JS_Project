import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../services/Actions/authAction';

import { CgProfile } from 'react-icons/cg';
import { BsCart3, BsBox2 } from 'react-icons/bs';
import { IoSearchOutline, IoCardOutline } from 'react-icons/io5';
import { LuDiamond } from 'react-icons/lu';
import { CiHeart } from 'react-icons/ci';
import { PiGiftLight } from 'react-icons/pi';
import { FaSquarePlus } from 'react-icons/fa6';
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

  const handleLogOut = () => {
    dispatch(logoutUser());
    toast.error("User Is LogOut!");
  };

  useEffect(() => {
    // if (!user) navigate("/sign-in");
  }, [user]);

  return (
    <>
      <ToastContainer />
      <header className="header-container shadow-sm bg-light">

        <Container>
          <div className="header-top d-flex">
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

            <div className="header-actions">
              <Navbar expand="md" variant="light">
                <Nav className='d-flex flex-row align-items-start justify-content-center flex-wrap'>
                  <div className='d-flex align-items-center'>
                    <CgProfile className='fs-5' />
                    <NavDropdown title={user ? user.email : 'Account'} menuVariant="dark">
                      {!user ? (
                        <>
                          <NavDropdown.Item>
                            <div className='d-flex justify-content-between'>
                              <span className='me-3'>New Customer?</span>
                              <Link to="/Sign_In" className='text-light text-decoration-none'>Sign Up</Link>
                            </div>
                          </NavDropdown.Item>
                        </>
                      ) : (
                        <>
                          <NavDropdown.Item><CgProfile /> My Profile</NavDropdown.Item>
                          <NavDropdown.Item><LuDiamond /> Flipkart Plus Zone</NavDropdown.Item>
                          <NavDropdown.Item><BsBox2 /><Link to="/order" className='text-light text-decoration-none ms-2'>Orders</Link></NavDropdown.Item>
                          <NavDropdown.Item><CiHeart /> Wishlist</NavDropdown.Item>
                          <NavDropdown.Item><PiGiftLight /> Rewards</NavDropdown.Item>
                          <NavDropdown.Item><IoCardOutline /> Gift Cards</NavDropdown.Item>
                          <NavDropdown.Item onClick={handleLogOut} className="text-danger">
                            Log Out
                          </NavDropdown.Item>
                        </>
                      )}
                    </NavDropdown>

                  </div>

                  <Link to="/Add_To_Cart" className="d-flex align-items-center text-dark text-decoration-none mx-2 position-relative">
                    <BsCart3 className='fs-5' />
                    <span className='ps-1'>Cart</span>
                    {cartItems.length > 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          right: '-10px',
                          backgroundColor: '#157347',
                          color: 'white',
                          fontSize: '12px',
                          padding: '2px 6px',
                          borderRadius: '50%',
                          fontWeight: 'bold',
                        }}
                      >
                        {cartItems.length}
                      </span>
                    )}
                  </Link>

                  {user ? (
                    <Link to="/Add_Product" className="d-flex align-items-center text-dark text-decoration-none">
                      <FaSquarePlus className='fs-4' />
                      <span className='ps-1'>Add Product</span>
                    </Link>
                  ) : (
                    <div
                      className="d-flex align-items-center text-dark text-decoration-none"
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate('/Sign_In')}
                    >
                      <CgProfile className='fs-4' />
                      <span className='ps-1'>Login</span>
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
