import { useCart } from "../../context/CartContext";

export function CartDrawer({ open, onClose }) {
  // paste your entire CartDrawer function body here

  const { cart, remove, qty, total, clear } = useCart();
  return (
    <>
      {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 900 }} />}
      <div style={{ position: "fixed", top: 0, right: open ? 0 : "-430px", width: 400, maxWidth: "95vw", height: "100vh", background: "#fff", zIndex: 901, boxShadow: "-8px 0 40px rgba(0,0,0,.14)", transition: "right .35s cubic-bezier(.4,0,.2,1)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC" }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>🛒 Cart <span style={{ fontWeight: 400, color: "#6B7280", fontSize: 13 }}>({cart.length})</span></h2>
          <button onClick={onClose} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", fontSize: 18, color: "#374151" }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {cart.length === 0 ? <div style={{ textAlign: "center", padding: "60px 20px" }}><div style={{ fontSize: 56, marginBottom: 12 }}>🛒</div><p style={{ color: "#6B7280" }}>Your cart is empty</p></div>
            : cart.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 12, padding: 12, background: "#F8FAFC", borderRadius: 14, alignItems: "center", border: "1px solid #E5E7EB" }}>
                <div style={{ width: 54, height: 54, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }} />
                  <span style={{ display: "none", fontSize: 24 }}>{item.emoji}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                  <p style={{ margin: "0 0 7px", fontSize: 12, color: "#2563EB", fontWeight: 600 }}>Rs {item.price.toLocaleString()}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", overflow: "hidden" }}>
                      <button onClick={() => qty(item.id, item.qty - 1)} style={{ width: 26, height: 26, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>−</button>
                      <span style={{ width: 26, textAlign: "center", fontSize: 13, fontWeight: 700 }}>{item.qty}</span>
                      <button onClick={() => qty(item.id, item.qty + 1)} style={{ width: 26, height: 26, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>+</button>
                    </div>
                    <button onClick={() => remove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: 12, fontWeight: 600 }}>Remove</button>
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#111827", flexShrink: 0 }}>Rs {(item.price * item.qty).toLocaleString()}</div>
              </div>
            ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: "14px 20px", borderTop: "1px solid #E5E7EB", background: "#F8FAFC" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 14 }}><span style={{ color: "#6B7280" }}>Subtotal</span><span style={{ fontWeight: 700 }}>Rs {total.toLocaleString()}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14 }}><span style={{ color: "#6B7280" }}>Delivery</span><span style={{ fontWeight: 700, color: "#10B981" }}>Free</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, paddingTop: 10, borderTop: "2px solid #E5E7EB" }}>
              <span style={{ fontWeight: 800, fontSize: 15 }}>Total</span>
              <span style={{ fontWeight: 900, fontSize: 19, color: "#2563EB" }}>Rs {total.toLocaleString()}</span>
            </div>
            <a href={`https://wa.me/923001234567?text=Order: ${cart.map(i => `${i.name} x${i.qty}`).join(", ")}. Total: Rs ${total.toLocaleString()}`} target="_blank" rel="noreferrer"
              style={{ display: "block", width: "100%", background: "#10B981", color: "#fff", border: "none", borderRadius: 12, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", textAlign: "center", textDecoration: "none", marginBottom: 8 }}>
              📱 Order via WhatsApp
            </a>
            <button onClick={clear} style={{ width: "100%", background: "none", border: "1px solid #E5E7EB", borderRadius: 12, padding: "10px 0", fontSize: 13, cursor: "pointer", color: "#6B7280" }}>Clear Cart</button>
          </div>
        )}
      </div>
    </>
  );
}
