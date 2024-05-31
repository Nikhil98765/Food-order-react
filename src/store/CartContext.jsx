/* eslint-disable no-unused-vars */
import {  createContext, useReducer } from "react";


export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItems: () => { }
});

const ACTION_TYPES = {
  add: 'ADD_ITEM',
  remove: 'REMOVE_ITEM',
  clear: 'CLEAR_ITEMS'
}

export function cartReducer(state, action) {
  if (action.type === ACTION_TYPES.add) {
    const updatedItems = [ ...state.items ];
    const existingItemIndex = updatedItems.findIndex(item => item.id === action.item.id);
    // if item is found
    if (existingItemIndex >= 0) {
      const existingItem = updatedItems[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return {...state, items: updatedItems};
  }

  if (action.type === ACTION_TYPES.remove) {
    const updatedItems = [ ...state.items ];
    const itemIndex = updatedItems.findIndex(
      (item) => item.id === action.id
    );
    const item = updatedItems[itemIndex];
    const itemQuantity = item.quantity;
    // if item has quantity more than 1.
    if (itemQuantity > 1) {
      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
      };
      updatedItems[itemIndex] = updatedItem;
    }
    //If item quantity is equal to 1
    else
    {
      updatedItems.splice(itemIndex, 1);
    }
    return {...state, items: updatedItems};
  }

  if (action.type === ACTION_TYPES.clear) {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: []
  })

  function addItem(item) {
    dispatchCartAction({
      type: ACTION_TYPES.add,
      item
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: ACTION_TYPES.remove,
      id
    })
  }

  function clearItems() {
    dispatchCartAction({
      type: ACTION_TYPES.clear
    })
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearItems,
  };
  console.log("🚀 ~ CartContextProvider ~ cartContext:", cartContext)

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  )
}