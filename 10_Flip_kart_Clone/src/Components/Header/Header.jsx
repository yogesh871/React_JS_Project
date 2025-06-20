import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { LuDiamond } from "react-icons/lu";
import { BsBox2 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { PiGiftLight } from "react-icons/pi";
import { IoCardOutline } from "react-icons/io5";
import { FaSquarePlus } from "react-icons/fa6";
import FlipCardlogo from "../../assets/img/Flip_Card_logo.svg";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';
import { Container } from 'react-bootstrap';

const Header = ({ setSearchQuery }) => {
  const { cartItems } = useSelector((state) => state.productReducer); 

  return (
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
            
  <Nav className='d-flex flex-row align-items-start justify-content-center '>
  <CgProfile className='fs-5 ' />
  <div className='d-flex align-items-center'>
    <NavDropdown title="Login" menuVariant="dark">
      <NavDropdown.Item>
        <div className='d-flex justify-content-between'>
          <span>New Customer?</span>
          <a href="#" className='text-black text-decoration-none'>Sign Up</a>
        </div>
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item><CgProfile /> My Profile</NavDropdown.Item>
      <NavDropdown.Item><LuDiamond /> Flipkart Plus Zone</NavDropdown.Item>
      <NavDropdown.Item><BsBox2 /> Orders</NavDropdown.Item>
      <NavDropdown.Item><CiHeart /> Wishlist</NavDropdown.Item>
      <NavDropdown.Item><PiGiftLight /> Rewards</NavDropdown.Item>
      <NavDropdown.Item><IoCardOutline /> Gift Cards</NavDropdown.Item>
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

              <Link to="/Add_Product" className="d-flex align-items-center text-dark text-decoration-none">
                <FaSquarePlus className='fs-4' />
                <span className='ps-1'>Add Product</span>
              </Link>
            </Nav>
          </Navbar>
        </div>
      </div>
    </Container>
    </header>
  );
};

export default Header;
