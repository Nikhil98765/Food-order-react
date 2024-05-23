import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { Cart } from "./Cart.jsx";

export const Modal = forwardRef(function Modal({...props}, ref) {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      }
    }
  });

  function closeModal() {
    dialogRef.current.close();
  }

  return createPortal(
    <dialog className="modal" ref={dialogRef}>
      <Cart></Cart>
      <div className="modal-actions">
        <button className="text-button" onClick={closeModal}>close</button>
        <button className="button">go to checkout</button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
);
