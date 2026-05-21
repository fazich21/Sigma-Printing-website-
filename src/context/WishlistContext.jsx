import { createContext, useContext, useState } from "react";

const WishCtx = createContext(null);

export function WishProvider({ children }) {
  const [list, setList] = useState([]);
  const toggle = p => setList(prev =>
    prev.find(i => i.id === p.id)
      ? prev.filter(i => i.id !== p.id)
      : [...prev, p]
  );
  const has = id => list.some(i => i.id === id);
  return (
    <WishCtx.Provider value={{ list, toggle, has }}>
      {children}
    </WishCtx.Provider>
  );
}

export const useWish = () => useContext(WishCtx);