import {createContext, useReducer} from "react"


export const CartContext = createContext({
  cartItems: {
    length: 0
  }
});

export const cartReducer = (state, action) => {
  switch (action.type.toLowerCase()) {
    case 'add': {
      const addedMealId = action.payload.id;
      const isMealPresent = Object.keys(state).includes(addedMealId);
      let count = 1;
      if (isMealPresent) {
        count = state[action.payload.id]['count'] + 1;
      }
        return {
          ...state,
          length: state.length + 1,
          [action.payload.id]: {
            ...action.payload,
            count,
          },
        };
    }
      
    case 'delete': {  
      let count = state[action.payload.id]['count'];
      if (count === 1) {
        const stateItems = { ...state, length: state.length - 1};
        delete stateItems[action.payload.id];
        return stateItems;
      }
      count = count - 1;
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          count
        },
        length: state.length - 1
      }
    }
    
  }
  return state;
}

export const CartContextProvider = ({children}) => {

  const [cartItems, cartItemsDispatch] = useReducer(cartReducer, {length: 0});


  function addCartItem(meal) {
    cartItemsDispatch({
      type: 'add',
      payload: meal
    });
  }

  function removeCartItem(mealId) {
    cartItemsDispatch({
      type: 'delete',
      payload: {
        id: mealId
      }
    });
  }

  const ctxValue = {
    cartItems,
    addCartItem,
    removeCartItem,
  };

  return (
    <CartContext.Provider value={ctxValue}>
      {children}
    </CartContext.Provider>
  )
}
