/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import productsData from '../../data/products.json';
import productsInventoryData from '../../data/productsInventory.json';
import { ADD_PRODUCT_TO_CART, ADD_PRODUCT_TO_CART_FROM_DETAILS_PAGE } from './types';

const initialState = {
  totalNumberOfProductsInCart: 0,
  cartTotal: 0,
  cartedItems: [],
  products: [
    productsData.products.map((item) => (
      {
        id: item.id,
      }
    )),
  ],
  knowProductAvailability:
    productsData.products.map((item, i) => {
      if (item.id === productsInventoryData.productsInventory[i].id) {
        return (
          { id: item.id, availableproduct: productsInventoryData.productsInventory[i].quantity }
        );
      }
    }),
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const items = action.payload;
      // search if item is already in cart by item id
      const inCart = state.cartedItems.some((item) => item.id === action.payload.id);
      localStorage.setItem('totalNumberOfProductsInCart', state.totalNumberOfProductsInCart + 1);
      localStorage.setItem('cartTotal', state.cartTotal + items.price);
      if (inCart) {
        // item already in cart
        return {
          ...state,
          cartedItems: state.cartedItems.map((item) => (item.id === action.payload.id ? {
            // found item, shallow copy item and update other properties
            ...item,
            number: item.number + 1,
            availableInventory: item.availableInventory - 1,
            productTotal: item.productTotal + item.price,
          } : item)),
          totalNumberOfProductsInCart: state.totalNumberOfProductsInCart + 1,
          cartTotal: state.cartTotal + items.price,
          knowProductAvailability: state.knowProductAvailability.map((item) => {
            if (item.id === action.payload.id) {
              item.availableproduct = action.payload.quantity - 1;
            }
            return item;
          }),
        };
      }

      localStorage.setItem('totalNumberOfProductsInCart', state.totalNumberOfProductsInCart + 1);
      localStorage.setItem('cartTotal', state.cartTotal + items.price);
      return {
        ...state,
        totalNumberOfProductsInCart: state.totalNumberOfProductsInCart + 1,
        cartTotal: state.cartTotal + items.price,
        cartedItems: [...state.cartedItems, items],
        knowProductAvailability: state.knowProductAvailability.map((item) => {
          if (item.id === action.payload.id) {
            item.availableproduct = action.payload.quantity - 1;
          }
          return item;
        }),
      };

    case ADD_PRODUCT_TO_CART_FROM_DETAILS_PAGE:
      const details = action.payload.product;
      const variantPrice = action.payload.price;
      const alreadyInCart = state.cartedItems.some((item) => item.id === details.id);
      localStorage.setItem('totalNumberOfProductsInCart', state.totalNumberOfProductsInCart + 1);
      localStorage.setItem('cartTotal', state.cartTotal + variantPrice);
      if (alreadyInCart) {
        return {
          ...state,
          cartedItems: state.cartedItems.map((item) => (item.id === details.id ? {
            ...item,
            number: item.number + 1,
            availableInventory: item.availableInventory - 1,
            productTotal: item.productTotal + item.price,
          } : item)),
          totalNumberOfProductsInCart: state.totalNumberOfProductsInCart + 1,
          cartTotal: state.cartTotal + variantPrice,
          knowProductAvailability: state.knowProductAvailability.map((item) => {
            if (item.id === details.id) {
              item.availableproduct = details.quantity - 1;
            }
            return item;
          }),
        };
      }

      localStorage.setItem('totalNumberOfProductsInCart', state.totalNumberOfProductsInCart + 1);
      localStorage.setItem('cartTotal', state.cartTotal + variantPrice);
      return {
        ...state,
        totalNumberOfProductsInCart: state.totalNumberOfProductsInCart + 1,
        cartTotal: state.cartTotal + variantPrice,
        cartedItems: [...state.cartedItems, details],
        knowProductAvailability: state.knowProductAvailability.map((item) => {
          if (item.id === details.id) {
            item.availableproduct = details.quantity - 1;
          }
          return item;
        }),
      };

    default:
      return state;
  }
};

export default cartReducer;
