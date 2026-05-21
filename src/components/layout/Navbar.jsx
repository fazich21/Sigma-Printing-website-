import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

export function Navbar({ setCartOpen, activePage, setPage }) {
  // paste your entire Navbar function body here
 
    const { count } = useCart();
    const [mob, setMob] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => { const h = () => setScrolled(window.scrollY > 10); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  
    const links = [{ id: "home", label: "Home" }, { id: "products", label: "Products" }, { id: "about", label: "About" }, { id: "contact", label: "Contact" }];
  
    return (
      <>
        {/* Top bar */}
        <div style={{ background: "#1E3A8A", color: "#fff", padding: "7px 40px", fontSize: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <span>📞 <a href="tel:+923001234567" style={{ color: "#93C5FD", textDecoration: "none" }}>+92 300 1234567</a></span>
            <span>✉️ <a href="mailto:info@alprinting.pk" style={{ color: "#93C5FD", textDecoration: "none" }}>SigmaPrinters.com</a></span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <span>📍 G-9 Markaz, Islamabad</span>
            <span>⏰ Mon–Sat 9am–8pm</span>
          </div>
        </div>
        {/* Main nav */}
        <nav style={{ position: "sticky", top: 0, zIndex: 800, background: "#fff", boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,.10)" : "0 1px 0 #E5E7EB", transition: "box-shadow .3s" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
            {/* Logo */}
            <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 46, height: 46, background: "linear-gradient(135deg,#2563EB,#10B981)", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 12px rgba(37,99,235,.25)" }}>🖨</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#111827", letterSpacing: "-0.3px" }}>Sigma Printing Press</div>
                <div style={{ fontSize: 10, color: "#10B981", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700 }}>Quality You Can Trust</div>
              </div>
            </div>
            {/* Desktop links */}
            <div style={{ display: "flex", gap: 2 }} className="desk-nav">
              {links.map(l => (
                <button key={l.id} onClick={() => setPage(l.id)}
                  style={{ background: "none", border: "none", padding: "10px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: activePage === l.id ? "#2563EB" : "#374151", borderRadius: 10, transition: "all .2s", position: "relative" }}>
                  {l.label}
                  {activePage === l.id && <span style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 24, height: 3, background: "#2563EB", borderRadius: 3 }} />}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6, background: "#10B981", color: "#fff", borderRadius: 10, padding: "9px 16px", fontSize: 13, fontWeight: 700, textDecoration: "none" }} className="desk-nav">
                📱 WhatsApp
              </a>
              <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "#2563EB", color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", cursor: "pointer", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                🛒 Cart
                {count > 0 && <span style={{ background: "#EF4444", color: "#fff", borderRadius: "50%", width: 20, height: 20, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>}
              </button>
              <button onClick={() => setMob(m => !m)} style={{ background: "none", border: "1px solid #E5E7EB", borderRadius: 10, padding: "9px 12px", cursor: "pointer", fontSize: 18 }} className="mob-only">☰</button>
            </div>
          </div>
          {mob && (
            <div style={{ borderTop: "1px solid #E5E7EB", background: "#fff", padding: "8px 24px 16px" }}>
              {links.map(l => (
                <button key={l.id} onClick={() => { setPage(l.id); setMob(false); }}
                  style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "13px 0", cursor: "pointer", fontSize: 15, fontWeight: activePage === l.id ? 700 : 500, color: activePage === l.id ? "#2563EB" : "#374151", borderBottom: "1px solid #F3F4F6" }}>
                  {l.label}
                </button>
              ))}
              <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" style={{ display: "block", marginTop: 12, background: "#10B981", color: "#fff", borderRadius: 10, padding: "11px 0", textAlign: "center", textDecoration: "none", fontWeight: 700 }}>📱 WhatsApp Us</a>
            </div>
          )}
        </nav>
      </>
    );
  }
  