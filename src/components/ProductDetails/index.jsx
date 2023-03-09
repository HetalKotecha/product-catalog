/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Toast } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import productsData from '../../data/products.json';
import { addToCartFromDetailsPage } from '../../redux/actions/addToCart';
import productsCouponData from '../../data/productsCoupon.json';

function ProductDetails(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [showProductDetails, setProductDetails] = useState([]);
  const [showPrice, setPrice] = useState();
  const [showActiveButton, setActiveButtonIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [activeOffer, setActiveOffer] = useState(null);
  const [withoutDiscountPrice, setWithoutDiscountPrice] = useState(null);

  useEffect(() => {
    const result = productsData.products.find((item) => item.id === props.location.state.productId);
    setProductDetails(result);
    setPrice(result.price);
    setIsLoading(false);
  }, []);

  const setPriceValue = (price, index) => {
    setPrice(price);
    setWithoutDiscountPrice(price);
    setActiveButtonIndex(index);
  };

  const handleAddToCart = (product, price) => {
    props.cartProps.knowProductAvailability.map((item) => {
      if (item.id === product.id) {
        return (
          product.quantity = item.availableproduct
        );
      }
    });
    props.addToCartFromDetailsPage(product, price);
    setShowToast(true);
  };

  const handleApplyCoupons = (discount, index) => {
    const discountAmount = (withoutDiscountPrice * discount) / 100;
    const finalAmount = showPrice - discountAmount;
    setActiveOffer(index);
    setPrice(finalAmount);
  };

  if (isLoading) {
    return (
      <Spinner animation="border" className="spinner" />
    );
  }

  return (
    <>
      <Button
        onClick={props.history.goBack}
        className="backButton"
        variant="outline-primary"
      >
        Back
      </Button>
      {
        showProductDetails && (
          <div className="detailsPageMainDiv">
            <div>
              <img
                alt="iPhone"
                src={showProductDetails.image}
                className="detailsImage"
              />
            </div>
            <div className="productDetails">
              <h3>{showProductDetails.title}</h3>
              <h4>
                Rs.
                {showPrice}
              </h4>
              <p>
                Size:
                {showProductDetails.variants[showActiveButton].size}
              </p>
              <div className="buttonsGrp">
              {
                  // eslint-disable-next-line arrow-body-style
                  showProductDetails.variants.map((variant, i) => {
                    return (
                      <Button
                        key={variant.size}
                        variant="light"
                        onClick={() => setPriceValue(variant.price, i)}
                        active={showActiveButton === i}
                        style={{ marginRight: '10px', border: '1px solid grey' }}
                      >
                        {variant.size}
                      </Button>
                    );
                  })
                }
              </div>
              <h5 style={{ marginTop: '15px', color: '#006572' }}>Offers</h5>
              <div className="offersMainDiv">
                {
               productsCouponData.discounts[props.location.state.productId - 1].offers.length === 0 ? (
                 <p style={{ fontSize: '14px' }}>No Offers Available</p>
               )
                 : productsCouponData.discounts[props.location.state.productId - 1].offers.map((offer, i) => (
                   <div key={offer.id} className={i === activeOffer ? 'appliedOffer' : 'offer'}>
                     <h6>{offer.offerName}</h6>
                     <p>{offer.description}</p>
                     <Button
                       onClick={() => handleApplyCoupons(offer.discountPercentage, i)}
                     >
                       Apply
                     </Button>
                   </div>
                 ))
             }
              </div>
              <Button
                variant="secondary"
                style={{ marginTop: '20px' }}
                onClick={() => handleAddToCart(showProductDetails, showPrice)}
                disabled={props.cartProps.knowProductAvailability[props.location.state.productId - 1].availableproduct === 0}
              >
                {props.cartProps.knowProductAvailability[props.location.state.productId - 1].availableproduct === 0 ? 'Out Of Stock' : 'Add'}
              </Button>
              {
                  props.cartProps.knowProductAvailability[props.location.state.productId - 1].availableproduct <= 2 && props.cartProps.knowProductAvailability[props.location.state.productId - 1].availableproduct > 0
                    ? <p className="itemsLeftInDetails">Few Items Left</p>
                    : null
                }
            </div>

          </div>
        )
      }
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          backgroundColor: '#4caf50', color: 'white', marginTop: '30px', marginLeft: '40%', transform: 'translate(-50%,-50%)', position: 'fixed',
        }}
      >
        <Toast.Body>Product Added To Cart</Toast.Body>
      </Toast>
    </>
  );
}

const mapStateToProps = (state) => ({
  cartProps: state.productState,
});

export default connect(
  mapStateToProps,
  { addToCartFromDetailsPage },
)(ProductDetails);
