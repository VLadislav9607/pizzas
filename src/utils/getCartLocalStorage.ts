import { calcTotalCount, calcTotalPrice } from "./calcTotalPrice&Count";

export const getCartLocalStorage = () => {
  const data = localStorage.getItem('cart');
  const cartProducts = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(cartProducts);
  const totalCount = calcTotalCount(cartProducts)

  return {
    cartProducts,
    totalPrice,
    totalCount,
  }
}
