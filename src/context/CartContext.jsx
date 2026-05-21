import { createContext, useContext, useReducer } from "react";

const CartCtx = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const ex = state.find(i => i.id === action.p.id);
      return ex
        ? state.map(i => i.id === action.p.id
            ? { ...i, qty: i.qty + 1 } : i)
        : [...state, { ...action.p, qty: 1 }];
    }
    case "REMOVE": return state.filter(i => i.id !== action.id);
    case "QTY":    return state.map(i => i.id === action.id
        ? { ...i, qty: Math.max(1, action.qty) } : i);
    case "CLEAR":  return [];
    default:       return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const add    = p      => dispatch({ type: "ADD", p });
  const remove = id     => dispatch({ type: "REMOVE", id });
  const qty    = (id,q) => dispatch({ type: "QTY", id, qty: q });
  const clear  = ()     => dispatch({ type: "CLEAR" });
  const total  = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const count  = cart.reduce((s,i) => s + i.qty, 0);
  return (
    <CartCtx.Provider value={{ cart, add, remove, qty, clear, total, count }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);