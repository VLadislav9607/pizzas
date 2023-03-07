import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalCount, calcTotalPrice } from '../../utils/calcTotalPrice&Count'
import { getCartLocalStorage } from '../../utils/getCartLocalStorage'
import { RootState } from '../store'

export type cartProduct = {
  id: number,
  imageUrl: string,
  title: string,
  price: number,
  type: string,
  size: number,
  count: number
}

interface cartSliceState {
  cartProducts: cartProduct[],
  totalPrice: number,
  totalCount: number
}

const { cartProducts, totalPrice, totalCount } = getCartLocalStorage();

const initialState: cartSliceState = {
  cartProducts,
  totalPrice,
  totalCount,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<cartProduct>) {
      const findProduct = state.cartProducts.find(obj => obj.id === action.payload.id);
      findProduct ? findProduct.count++ : state.cartProducts.push({ ...action.payload, count: 1 });
      state.totalPrice = calcTotalPrice(state.cartProducts);
      state.totalCount = calcTotalCount(state.cartProducts);
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.cartProducts);
      state.totalCount = calcTotalCount(state.cartProducts);
    },
    clearCart(state) {
      state.cartProducts = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
    onClickMinus(state, action: PayloadAction<number>) {
      const findProduct = state.cartProducts.find(obj => obj.id === action.payload);
      findProduct && findProduct.count--;
      state.totalPrice = calcTotalPrice(state.cartProducts);
      state.totalCount = calcTotalCount(state.cartProducts);
    },
  }
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartProductDyId = (id: number) => (state: RootState) => state.cart.cartProducts.find(obj => obj.id === id);

export const { addProduct, removeProduct, clearCart, onClickMinus } = cartSlice.actions

export default cartSlice.reducer
