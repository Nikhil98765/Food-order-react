import { useContext } from 'react';

import { Modal } from './UI/Modal.jsx';
import { Input } from './UI/Input.jsx';
import { Button } from './UI/Button.jsx';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext.jsx';
import { Error } from './UI/Error.jsx';

import { useHttp } from '../hooks/useHttp.js';

import { currencyFormatter } from '../formatter';

const httpConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const Checkout = () => {

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    resetData,
  } = useHttp("http://localhost:3000/orders", httpConfig);

  const cartTotal = cartCtx.items.reduce((prevTotal, item) => {
    return prevTotal + item.quantity * parseFloat(item.price);
  }, 0);

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(JSON.stringify({
      order: {
        items: cartCtx.items,
        customer: customerData,
      },
    }));
  }

  function handleSuccessData() {
    userProgressCtx.hideCart();
    resetData();
    cartCtx.clearItems();
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={userProgressCtx.hideCart}>
        Close
      </Button>
      <Button>Submit</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleSuccessData}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to with more details in few minutes with an Email.
        </p>
        <p className="modal-actions">
          <Button onClick={handleSuccessData}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={userProgressCtx.hideCart}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input id="name" label="Full Name" type="text" />
        <Input id="email" label="E-Mail Address" type="email" />
        <Input id="street" label="Street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input id="city" label="City" type="text" />
        </div>
        {
          error && (
            <Error title="Error occurred while sending order data" message={error}></Error>
          )
        }
        <div className="modal-actions">
          {actions}
        </div>
      </form>
    </Modal>
  );
}