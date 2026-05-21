import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useWish } from "../../context/WishlistContext";
import { Stars } from "../ui/Stars";

export function DetailModal({ product: p, onClose, toast }) {
  const { add } = useCart();
  const { toggle, has } = useWish();
  const [qty, setQty] = useState(1);
  const wishlisted = has(p.id);
  const disc = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!p) {
    onClose();
    return null;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      add(p);
    }
    toast(p.name + " x" + qty + " added! 🛒");
    onClose();
  };

  const handleWishlist = () => {
    toggle(p);
    if (wishlisted) {
      toast("Removed from wishlist", "error");
    } else {
      toast("Added to wishlist ❤️", "success");
    }
  };

  const waLink =
    "https://wa.me/923001234567?text=Hi! I want to order " +
    p.name +
    " x" +
    qty +
    ". Price: Rs " +
    (p.price * qty).toLocaleString();

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={function(e) { e.stopPropagation(); }}
        style={{
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 860,
          maxHeight: "92vh",
          overflow: "auto",
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
          animation: "modalIn .3s ease",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>

          {/* LEFT PANEL */}
          <div style={{ flex: "0 0 300px", minWidth: 240 }}>

            {/* Image */}
            <div style={{ height: 280, overflow: "hidden", position: "relative" }}>
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "24px 0 0 0",
                }}
                onError={function(e) {
                  e.target.style.display = "none";
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = "flex";
                  }
                }}
              />
              <div
                style={{
                  display: "none",
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg,#EFF6FF,#F0FDF4)",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 80,
                  borderRadius: "24px 0 0 0",
                }}
              >
                {p.emoji}
              </div>
              {disc > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    background: "#EF4444",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 20,
                  }}
                >
                  {disc}% OFF
                </div>
              )}
            </div>

            {/* Specifications */}
            <div
              style={{
                padding: "20px 22px",
                background: "#F8FAFC",
                borderTop: "1px solid #E5E7EB",
                borderRadius: "0 0 0 24px",
              }}
            >
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#374151",
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                Specifications
              </p>
              {p.specifications &&
                Object.entries(p.specifications).map(function(entry) {
                  var k = entry[0];
                  var v = entry[1];
                  return (
                    <div
                      key={k}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "5px 0",
                        borderBottom: "1px solid #E5E7EB",
                        fontSize: 13,
                      }}
                    >
                      <span style={{ color: "#6B7280" }}>{k}</span>
                      <span
                        style={{
                          fontWeight: 600,
                          color: "#111827",
                          textAlign: "right",
                          maxWidth: "55%",
                        }}
                      >
                        {v}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={{ flex: 1, minWidth: 260, padding: "28px 28px 24px" }}>

            {/* Top row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#2563EB",
                  background: "#EFF6FF",
                  padding: "3px 12px",
                  borderRadius: 20,
                }}
              >
                {p.category}
              </span>
              <button
                onClick={onClose}
                style={{
                  background: "#F3F4F6",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  cursor: "pointer",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#374151",
                }}
              >
                x
              </button>
            </div>

            {/* Name */}
            <h2
              style={{
                margin: "0 0 10px",
                fontSize: 24,
                fontWeight: 900,
                color: "#111827",
                lineHeight: 1.2,
              }}
            >
              {p.name}
            </h2>

            {/* Rating */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 14,
              }}
            >
              <Stars r={p.rating} size={15} />
              <span style={{ fontSize: 13, color: "#6B7280" }}>
                ({p.reviewsCount} reviews)
              </span>
              <span
                style={{
                  fontSize: 12,
                  background: "#DCFCE7",
                  color: "#16A34A",
                  padding: "2px 8px",
                  borderRadius: 10,
                  fontWeight: 600,
                }}
              >
                In Stock
              </span>
            </div>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                marginBottom: 16,
                padding: "12px 16px",
                background: "#F8FAFC",
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 900, color: "#2563EB" }}>
                Rs {p.price.toLocaleString()}
              </span>
              {p.oldPrice && (
                <span
                  style={{
                    fontSize: 15,
                    color: "#9CA3AF",
                    textDecoration: "line-through",
                  }}
                >
                  Rs {p.oldPrice.toLocaleString()}
                </span>
              )}
              {disc > 0 && (
                <span style={{ fontSize: 13, fontWeight: 700, color: "#EF4444" }}>
                  Save Rs {(p.oldPrice - p.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: 14,
                color: "#4B5563",
                lineHeight: 1.75,
                marginBottom: 18,
              }}
            >
              {p.description}
            </p>

            {/* Features */}
            {p.features && p.features.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                  }}
                >
                  Key Features
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "6px 12px",
                  }}
                >
                  {p.features.map(function(f, i) {
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 13,
                          color: "#374151",
                        }}
                      >
                        <span style={{ color: "#10B981", fontWeight: 800 }}>
                          v
                        </span>
                        {f}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 20,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>
                Qty:
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "2px solid #E5E7EB",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={function() { setQty(function(q) { return Math.max(1, q - 1); }); }}
                  style={{
                    width: 40,
                    height: 40,
                    background: "#F8FAFC",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#374151",
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    width: 48,
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: 800,
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={function() { setQty(function(q) { return q + 1; }); }}
                  style={{
                    width: 40,
                    height: 40,
                    background: "#F8FAFC",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#374151",
                  }}
                >
                  +
                </button>
              </div>
              <span style={{ fontSize: 13, color: "#6B7280" }}>
                Total:{" "}
                <strong style={{ color: "#2563EB" }}>
                  Rs {(p.price * qty).toLocaleString()}
                </strong>
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  minWidth: 130,
                  background: "#2563EB",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "13px 0",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>

              <button
                onClick={handleWishlist}
                style={{
                  width: 48,
                  height: 48,
                  background: wishlisted ? "#FEF2F2" : "#F8FAFC",
                  border: wishlisted ? "2px solid #FCA5A5" : "2px solid #E5E7EB",
                  borderRadius: 12,
                  cursor: "pointer",
                  fontSize: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {wishlisted ? "❤️" : "🤍"}
              </button>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  minWidth: 130,
                  background: "#10B981",
                  color: "#fff",
                  borderRadius: 12,
                  padding: "13px 0",
                  fontSize: 15,
                  fontWeight: 700,
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                WhatsApp Order
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
