import { cartProduct } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: cartProduct[]) => {
  const totalPrice = items.reduce((acc, cur) => acc + Number(cur.price * cur.count), 0);
  return totalPrice;
}

export const calcTotalCount = (items: cartProduct[]) => {
  const totalCount = items.reduce((acc, cur) => acc + Number(cur.count), 0);
  return totalCount;
}
