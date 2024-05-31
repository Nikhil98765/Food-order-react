import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";


export const Modal = ({ open, children, className = '', onClose }) => {

  const dialogRef = useRef();

  // * Note:  Instead of using forwardRef for exposing methods & properties to parent component, we can accept a input and handle it in useEffect.
  useEffect(() => {
    const modal = dialogRef.current;
    if (open) {
      modal.showModal();
    }
    
    return () => modal.close()
  }, [open]);
  
  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}