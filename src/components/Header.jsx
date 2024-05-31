import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import { Button } from './UI/Button.jsx';
import { CartContext } from '../store/CartContext.jsx';
import { UserProgressContext } from '../store/UserProgressContext.jsx';

export const Header = () => {

  const userProgressCtx = useContext(UserProgressContext);

  const cartItems = useContext(CartContext);

  const totalCartItems = cartItems.items.reduce((prevTotal, item) => {
    return prevTotal + item.quantity
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Food Logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={userProgressCtx.showCart}>
          Cart {`(${totalCartItems})`}
        </Button>
      </nav>
    </header>
  );
}