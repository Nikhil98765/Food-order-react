import { useContext } from "react";
import { CartContext } from "../store/Cart-store";

export const Cart = () => {

  const cartItems = useContext(CartContext);
  console.log("🚀 ~ Cart ~ cartItems:", cartItems);

  let cartItemsTotal = 0;
  Object.keys(cartItems.cartItems).forEach(cartItemId => {
      const cartItem = cartItems.cartItems[cartItemId];
      cartItemsTotal += +cartItem.price * cartItem.count
  })


  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {Object.keys(cartItems.cartItems).map(cartItemId => {
          if (cartItemId === 'length') {
            return;
          }
          const cartItem = cartItems.cartItems[cartItemId];
          return (
            <li key={cartItemId} className="cart-item">
              <p>{cartItem.name} - {cartItem.count} x {`$${cartItem.price}`}</p>
              <div className="cart-item-actions">
                <button onClick={() => cartItems.removeCartItem(cartItem.id)}>-</button>
                <span>{cartItem.count}</span>
                <button onClick={() => cartItems.addCartItem(cartItem)}>
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{`$${cartItemsTotal}`}</p>
    </div>
  );
}