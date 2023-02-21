import { Link } from 'react-router-dom';

import emptyCart from '../assets/img/empty-cart.png'

const EmptyCart = () => {
   return (
      <>
         <div class="cart cart--empty">
            <h2>Корзина порожня <icon>😕</icon></h2>
            <p>
               Ви ще не замовили піцу.<br />
               Перейдіть на головну сторінку для оформлення замовлення
            </p>
            <img src={emptyCart} alt="Empty cart" />
            <Link to="/" class="button button--black">
               <span>Замовити піцу</span>
            </Link>
         </div>
      </>
   )
}

export default EmptyCart;