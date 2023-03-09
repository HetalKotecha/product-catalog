/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Toast, Table } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { addToCart } from '../../redux/actions/addToCart';
import productsData from '../../data/products.json';

const Products = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [showGridView, setShowGridView] = useState(true);

  const handleAddToCart = (product) => {
    props.cartProps.knowProductAvailability.map((item) => {
      if (item.id === product.id) {
        return (
          product.quantity = item.availableproduct
        );
      }
    });
    props.addToCart(product);
    setShowToast(true);
  };

  return (
    <>
      <BootstrapSwitchButton
        checked
        onlabel="Grid View"
        offlabel="Table View"
        width={200}
        onstyle="secondary"
        onChange={(checked) => {
          setShowGridView(checked);
        }}
      />
      <div className="showProducts">
        {
          showGridView ? (
            productsData && (
              productsData.products.map((product, i) => (
                <div
                  key={product.id}
                  className="imgDiv"
                >
                  <img
                    src={product.image}
                    alt="iPhone"
                    className="gridViewImg"
                    onClick={() => props.history.push('/product-details', { productId: product.id })}
                  />
                  <p
                    style={{ margin: '4px 0 0 30px', color: '#006572' }}
                    onClick={() => props.history.push('/product-details', { productId: product.id })}
                  >
                    {product.title}
                  </p>
                  <p
                    style={{ margin: '4px 0 0 30px', opacity: '0.5', color: '#006572' }}
                  >
                    Rs.
                    {' '}
                    {product.price}
                  </p>
                  <Button
                    variant="secondary"
                    className="buttonAdd"
                    onClick={() => handleAddToCart(product)}
                    disabled={props.cartProps.knowProductAvailability[i].availableproduct === 0}
                  >
                    {props.cartProps.knowProductAvailability[i].availableproduct === 0 ? 'Out Of Stock' : 'Add'}
                  </Button>
                  {
                  props.cartProps.knowProductAvailability[i].availableproduct <= 2 && props.cartProps.knowProductAvailability[i].availableproduct > 0
                    ? <p className="itemsLeft">Few Items Left</p>
                    : null
                }
                </div>
              )))
          ) : (
            productsData && (
            <Table striped bordered hover style={{ width: '80%', margin: '15px 10%' }}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                    productsData.products.map(
                      (product, i) => (
                        <tr
                          key={product.id}
                        >
                          <td>{product.id}</td>
                          <td>
                            <img
                              alt="iPhone"
                              src={product.image}
                              style={{ width: '25%' }}
                              onClick={() => props.history.push('/product-details', { productId: product.id })}
                            />
                          </td>
                          <td
                            onClick={() => props.history.push('/product-details', { productId: product.id })}
                            style={{ cursor: 'pointer' }}
                          >
                            {product.title}
                          </td>
                          <td>
                            Rs.
                            {product.price}
                          </td>
                          <td width="200px">
                            <Button
                              variant="secondary"
                              className="buttonAdd"
                              onClick={() => handleAddToCart(product)}
                              disabled={props.cartProps.knowProductAvailability[i].availableproduct === 0}
                            >
                              {props.cartProps.knowProductAvailability[i].availableproduct === 0 ? 'Out Of Stock' : 'Add'}
                            </Button>
                            {
                              props.cartProps.knowProductAvailability[i].availableproduct <= 2 && props.cartProps.knowProductAvailability[i].availableproduct > 0
                                ? (
                                  <p className="table-itemsLeft">
                                    Few Items Left
                                  </p>
                                )
                                : null
                            }
                          </td>
                        </tr>
                      ),
                    )
                    }
              </tbody>
            </Table>
            )
          )
        }
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          style={{
            backgroundColor: '#4caf50', color: 'white', marginTop: '40%', marginLeft: '50%', transform: 'translate(-50%,-50%)', position: 'fixed',
          }}
        >
          <Toast.Body>Product Added To Cart</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cartProps: state.productState,
});

export default connect(
  mapStateToProps,
  { addToCart },
)(Products);
