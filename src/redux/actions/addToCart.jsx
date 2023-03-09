import { ADD_PRODUCT_TO_CART, ADD_PRODUCT_TO_CART_FROM_DETAILS_PAGE } from '../reducers/types';

export function addToCart(product) {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: product,
  };
}

export function addToCartFromDetailsPage(product, price) {
  return {
    type: ADD_PRODUCT_TO_CART_FROM_DETAILS_PAGE,
    payload: {
      product,
      price,
    },
  };
}
