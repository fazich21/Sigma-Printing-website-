import { useState } from "react";
import { CartProvider }  from "./context/CartContext";
import { WishProvider }  from "./context/WishlistContext";
import { useToast }      from "./hooks/useToast";
import { Toasts }        from "./components/ui/Toast";
import { Navbar }        from "./components/layout/Navbar";
import { Footer }        from "./components/layout/Footer";
import { CartDrawer }    from "./components/layout/CartDrawer";
import { DetailModal }   from "./components/products/DetailModal";
import { HomePage }      from "./pages/HomePage";
import { ProductsPage }  from "./pages/ProductsPage";
import { AboutPage }     from "./pages/AboutPage";
import { ContactPage }   from "./pages/ContactPage";

export default function App() {
  const [page,      setPage]      = useState("home");
  const [cartOpen,  setCartOpen]  = useState(false);
  const [detail,    setDetail]    = useState(null);
  const { toasts,   toast }       = useToast();

  function nav(p) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <CartProvider>
      <WishProvider>
        <style>{`
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #fff;
          }
          @keyframes toastIn {
            from { opacity: 0; transform: translateX(20px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes modalIn {
            from { opacity: 0; transform: scale(.95) translateY(10px); }
            to   { opacity: 1; transform: scale(1)   translateY(0); }
          }

          /* ── Navbar: hide desktop links on mobile ── */
          @media (max-width: 768px) {
            .desk-nav { display: none !important; }
          }
          @media (min-width: 769px) {
            .mob-only { display: none !important; }
          }

          /* ── Hero: stack columns on mobile ── */
          .hero-flex {
            display: flex;
            flex-wrap: wrap;
            gap: 48px;
            align-items: center;
          }
          .hero-left  { flex: 1 1 340px; min-width: 280px; }
          .hero-right { flex: 1 1 340px; min-width: 280px; }
          @media (max-width: 768px) {
            .hero-right { display: none !important; }
          }

          /* ── Why Choose / About / Contact grids ── */
          .two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: center;
          }
          @media (max-width: 768px) {
            .two-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>

        <Toasts toasts={toasts} />

        <Navbar
          setCartOpen={setCartOpen}
          activePage={page}
          setPage={nav}
        />

        <CartDrawer
          open={cartOpen}
          onClose={function() { setCartOpen(false); }}
        />

        {detail && (
          <DetailModal
            product={detail}
            onClose={function() { setDetail(null); }}
            toast={toast}
          />
        )}

        <main>
          {page === "home"     && (
            <HomePage
              toast={toast}
              setPage={nav}
              onDetail={setDetail}
            />
          )}
          {page === "products" && (
            <ProductsPage
              toast={toast}
              onDetail={setDetail}
            />
          )}
          {page === "about"    && <AboutPage />}
          {page === "contact"  && <ContactPage toast={toast} />}
        </main>

        <Footer setPage={nav} />

      </WishProvider>
    </CartProvider>
  );
}