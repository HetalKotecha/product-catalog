import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  const getTotalItems = localStorage.getItem('totalNumberOfProductsInCart');
  const getTotal = localStorage.getItem('cartTotal');
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="/" style={{ color: '#006572', fontSize: '' }}><b>Product Catalog</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ color: '#006572' }} />
        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav" style={{ color: '#006572' }}>
          <Nav className="mr-auto" />
          <Nav>
            <Link to="/cart-items" style={{ color: '#006572', marginRight: '10px', textDecoration: 'none' }}>
              Cart
              <span style={{ marginLeft: '5px' }}>{getTotalItems}</span>
              {' '}
              <span style={{ marginLeft: '5px' }}>
                {!getTotal ? '' : `Total ${getTotal}`}
              </span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartProps: state.productState,
});

export default connect(
  mapStateToProps,
)(Header);
