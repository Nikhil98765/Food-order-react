import { useContext } from "react"

import { currencyFormatter } from "../formatter";

import { Modal } from "./UI/Modal.jsx"
import { CartContext } from "../store/CartContext.jsx"
import { Button } from "./UI/Button.jsx";
import { UserProgressContext } from "../store/UserProgressContext.jsx";
import { CartItem } from "./CartItem.jsx";

export const Cart = () => {

  const userProgressCtx = useContext(UserProgressContext);

  const cartCtx = useContext(CartContext);

  const cartTotal = cartCtx.items.reduce((prevTotal, item) => {
    return prevTotal + (item.quantity * parseFloat(item.price))
  }, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  console.log('cart component triggered');

  return (
    <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart: null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <CartItem key={item.id} {...item} onIncrease={() => cartCtx.addItem(item)} onDecrease={() => cartCtx.removeItem(item.id)}/> 
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={ handleCloseCart }>Close</Button>
        {cartCtx.items.length > 0 && <Button onClick={() => userProgressCtx.showCheckout()}>Go to Checkout</Button>}
      </p>
    </Modal>
  );
}