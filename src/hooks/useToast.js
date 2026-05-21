import { useState } from "react";

export function useToast() {
  const [toasts, set] = useState([]);
  const toast = (msg, type = "success") => {
    const id = Date.now();
    set(p => [...p, { id, msg, type }]);
    setTimeout(() => set(p => p.filter(t => t.id !== id)), 3000);
  };
  return { toasts, toast };
}