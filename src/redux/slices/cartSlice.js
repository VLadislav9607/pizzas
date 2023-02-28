import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartProducts: [],
  totalPrice: 0,
  totalCount: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const findProduct = state.cartProducts.find(obj => obj.id === action.payload.id);
      console.log(action.payload);
      findProduct ? findProduct.count++ : state.cartProducts.push({ ...action.payload, count: 1 });
      state.totalPrice = state.cartProducts.reduce((acc, cur) => acc + Number(cur.price * cur.count), 0);
      state.totalCount = state.cartProducts.reduce((acc, cur) => acc + Number(cur.count), 0);

    },
    removeProduct(state, action) {
      state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload);
      state.totalPrice = state.cartProducts.reduce((acc, cur) => acc + Number(cur.price * cur.count), 0);
      state.totalCount = state.cartProducts.reduce((acc, cur) => acc + Number(cur.count), 0);
    },
    clearCart(state) {
      state.cartProducts = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
    onClickMinus(state, action) {
      const findProduct = state.cartProducts.find(obj => obj.id === action.payload);
      findProduct && findProduct.count--;
      state.totalPrice = state.cartProducts.reduce((acc, cur) => acc + Number(cur.price * cur.count), 0);
      state.totalCount = state.cartProducts.reduce((acc, cur) => acc + Number(cur.count), 0);
    }
  }
});

export const selectCart = (state) => state.cart;
export const selectCartProductDyId = (id) => (state) => state.cart.cartProducts.find(obj => obj.id === id);


export const { addProduct, removeProduct, clearCart, onClickMinus } = cartSlice.actions

export default cartSlice.reducer
