import logoImg from './assets/logo.jpg';
import {  useContext, useRef } from "react";

import { Modal } from './components/Modal.jsx';
import { Meals } from './components/Meals.jsx';
import { CartContext, CartContextProvider } from './store/Cart-store.jsx';

function App() {
  const modalRef = useRef();
  const title = "reactfood";
  
  const cartItems = useContext(CartContext);
  
    

  return (
    <CartContextProvider>
      <Modal ref={modalRef}></Modal>
      <div id="main-header">
        <div id="title">
          <img src={logoImg} alt="Food order logo" />
          <h1>{title.toUpperCase()}</h1>
        </div>
        <button className="text-button" onClick={() => modalRef.current.open()}>
          {`Cart(${cartItems.cartItems.length})`}
        </button>
      </div>
      <Meals></Meals>
    </CartContextProvider>
  );
}

export default App;
