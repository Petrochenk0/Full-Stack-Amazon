import { createSlice } from '@reduxjs/toolkit';

import { ICartProducts } from '../types';

const initialState = {
  products: [] as ICartProducts[],
  productsNumber: 0,
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIsAlreadyInCart = state.products.find(
        (product) => product.id === action.payload.id,
      );
      if (itemIsAlreadyInCart) {
        itemIsAlreadyInCart.quantity += parseInt(action.payload.quantity);
      } else {
        state.products.push({ ...action.payload, quantity: parseInt(action.payload.quantity) });
      }
      state.productsNumber = state.productsNumber + parseInt(action.payload.quantity);
    },
    removeFromCart: (state, action) => {
      // find product
      const productToRemove = state.products.find((product) => product.id === action.payload);
      // find index for removing
      const index = state.products.findIndex((product) => product.id === action.payload);
      // remove from cart
      if (productToRemove) {
        state.products.splice(index, 1);
        // remove quantity
        state.productsNumber -= productToRemove.quantity;
      }
    },
    decrementInCart: (state, action) => {
      const itemDecrement = state.products.find((item) => item.id === action.payload);
      if (itemDecrement && itemDecrement.quantity === 1) {
        const index = state.products.findIndex((item) => item.id === action.payload);
        state.products.splice(index, 1);
      } else if (itemDecrement) {
        itemDecrement.quantity--;
      }
      state.productsNumber = state.productsNumber - 1;
    },
    incrementInCart: (state, action) => {
      const itemIncrement = state.products.find((product) => product.id === action.payload);
      if (itemIncrement && itemIncrement.quantity >= 1) {
        itemIncrement.quantity += 1;
      }
      state.productsNumber += 1;
    },
  },
});

export const { addToCart, removeFromCart, decrementInCart, incrementInCart } = cartSlice.actions;
export default cartSlice.reducer;
