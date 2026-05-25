import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useWish } from "../../context/WishlistContext";
import { Stars } from "../ui/Stars";

export function DetailModal({ product: p, onClose, toast }) {
  const { add } = useCart();
  const { toggle, has } = useWish();
  const [qty, setQty] = useState(1);
  const wishlisted = has(p.id);
  const disc = p.oldPrice
    ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
    : 0;

  useEffect(function() {
    document.body.style.overflow = "hidden";
    return function() { document.body.style.overflow = ""; };
  }, []);

  if (!p) { onClose(); return null; }

  function handleAdd() {
    for (var i = 0; i < qty; i++) { add(p); }
    toast(p.name + " x" + qty + " added to cart! 🛒");
    onClose();
  }

  function handleWishlist() {
    toggle(p);
    toast(
      wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️",
      wishlisted ? "error" : "success"
    );
  }

  var waLink = "https://wa.me/923001234567?text=Hi! I want to order "
    + encodeURIComponent(p.name) + " x" + qty
    + ". Price: Rs " + (p.price * qty).toLocaleString();

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backdropFilter: "blur(4px)",
        overflowY: "auto"
      }}
    >
      <div
        onClick={function(e) { e.stopPropagation(); }}
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 860,
          margin: "auto",
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
          animation: "modalIn .3s ease",
          overflow: "hidden"
        }}
      >
        {/* Mobile close button — always visible at top */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 20px",
          borderBottom: "1px solid #E5E7EB",
          background: "#F8FAFC"
        }}>
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: "#2563EB", background: "#EFF6FF",
            padding: "3px 12px", borderRadius: 20
          }}>
            {p.category}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "#fff", border: "1px solid #E5E7EB",
              borderRadius: "50%", width: 36, height: 36,
              cursor: "pointer", fontSize: 20,
              display: "flex", alignItems: "center",
              justifyContent: "center", color: "#374151",
              fontWeight: 700
            }}
          >
            x
          </button>
        </div>

        {/* Body: image left, content right — stacks on mobile */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>

          {/* Image */}
          <div style={{
            flex: "0 0 280px",
            minWidth: "100%",
            maxWidth: "100%",
            position: "relative",
            background: "#F8FAFC"
          }}
          className="modal-img-panel"
          >
            <img
              src={p.image}
              alt={p.name}
              style={{
                width: "100%",
                height: 240,
                objectFit: "cover",
                display: "block"
              }}
              onError={function(e) {
                e.target.style.display = "none";
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = "flex";
                }
              }}
            />
            <div style={{
              display: "none",
              height: 240,
              background: "linear-gradient(135deg,#EFF6FF,#F0FDF4)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 80
            }}>
              {p.emoji}
            </div>
            {disc > 0 && (
              <div style={{
                position: "absolute", top: 12, left: 12,
                background: "#EF4444", color: "#fff",
                fontSize: 12, fontWeight: 700,
                padding: "4px 12px", borderRadius: 20
              }}>
                {disc}% OFF
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 260, padding: "24px 20px" }}>

            {/* Name */}
            <h2 style={{
              margin: "0 0 10px",
              fontSize: "clamp(18px, 3vw, 24px)",
              fontWeight: 900, color: "#111827", lineHeight: 1.2
            }}>
              {p.name}
            </h2>

            {/* Rating */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: 8, marginBottom: 14, flexWrap: "wrap"
            }}>
              <Stars r={p.rating} size={14} />
              <span style={{ fontSize: 13, color: "#6B7280" }}>
                ({p.reviewsCount} reviews)
              </span>
              <span style={{
                fontSize: 12, background: "#DCFCE7",
                color: "#16A34A", padding: "2px 8px",
                borderRadius: 10, fontWeight: 600
              }}>
                In Stock
              </span>
            </div>

            {/* Price */}
            <div style={{
              display: "flex", alignItems: "baseline",
              gap: 10, marginBottom: 16,
              padding: "10px 14px",
              background: "#F8FAFC", borderRadius: 12,
              flexWrap: "wrap"
            }}>
              <span style={{
                fontSize: "clamp(20px, 4vw, 28px)",
                fontWeight: 900, color: "#2563EB"
              }}>
                Rs {p.price.toLocaleString()}
              </span>
              {p.oldPrice && (
                <span style={{
                  fontSize: 14, color: "#9CA3AF",
                  textDecoration: "line-through"
                }}>
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
            <p style={{
              fontSize: 14, color: "#4B5563",
              lineHeight: 1.75, marginBottom: 16
            }}>
              {p.description}
            </p>

            {/* Features */}
            {p.features && p.features.length > 0 && (
              <div style={{ marginBottom: 18 }}>
                <p style={{
                  margin: "0 0 10px", fontSize: 11,
                  fontWeight: 800, color: "#374151",
                  textTransform: "uppercase", letterSpacing: ".06em"
                }}>
                  Key Features
                </p>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "6px 12px"
                }}>
                  {p.features.map(function(f, i) {
                    return (
                      <div key={i} style={{
                        display: "flex", alignItems: "center",
                        gap: 6, fontSize: 13, color: "#374151"
                      }}>
                        <span style={{ color: "#10B981", fontWeight: 800, fontSize: 16 }}>✓</span>
                        {f}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Specs */}
            {p.specifications && (
              <div style={{ marginBottom: 18 }}>
                <p style={{
                  margin: "0 0 10px", fontSize: 11,
                  fontWeight: 800, color: "#374151",
                  textTransform: "uppercase", letterSpacing: ".06em"
                }}>
                  Specifications
                </p>
                <div style={{
                  background: "#F8FAFC", borderRadius: 12,
                  overflow: "hidden", border: "1px solid #E5E7EB"
                }}>
                  {Object.entries(p.specifications).map(function(entry) {
                    return (
                      <div key={entry[0]} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 14px",
                        borderBottom: "1px solid #E5E7EB",
                        fontSize: 13
                      }}>
                        <span style={{ color: "#6B7280", fontWeight: 500 }}>
                          {entry[0]}
                        </span>
                        <span style={{
                          fontWeight: 600, color: "#111827",
                          textAlign: "right", maxWidth: "55%"
                        }}>
                          {entry[1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: 14, marginBottom: 20, flexWrap: "wrap"
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>
                Quantity:
              </span>
              <div style={{
                display: "flex", alignItems: "center",
                border: "2px solid #E5E7EB",
                borderRadius: 12, overflow: "hidden"
              }}>
                <button
                  onClick={function() { setQty(function(q) { return Math.max(1, q - 1); }); }}
                  style={{
                    width: 40, height: 40,
                    background: "#F8FAFC", border: "none",
                    cursor: "pointer", fontSize: 20,
                    fontWeight: 700, color: "#374151"
                  }}
                >
                  -
                </button>
                <span style={{
                  width: 48, textAlign: "center",
                  fontSize: 16, fontWeight: 800
                }}>
                  {qty}
                </span>
                <button
                  onClick={function() { setQty(function(q) { return q + 1; }); }}
                  style={{
                    width: 40, height: 40,
                    background: "#F8FAFC", border: "none",
                    cursor: "pointer", fontSize: 20,
                    fontWeight: 700, color: "#374151"
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
                onClick={handleAdd}
                style={{
                  flex: "1 1 130px",
                  background: "#2563EB", color: "#fff",
                  border: "none", borderRadius: 12,
                  padding: "13px 0", fontSize: 15,
                  fontWeight: 700, cursor: "pointer"
                }}
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={handleWishlist}
                style={{
                  width: 50, height: 50,
                  background: wishlisted ? "#FEF2F2" : "#F8FAFC",
                  border: wishlisted ? "2px solid #FCA5A5" : "2px solid #E5E7EB",
                  borderRadius: 12, cursor: "pointer",
                  fontSize: 22, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  flexShrink: 0
                }}
              >
                {wishlisted ? "❤️" : "🤍"}
              </button>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: "1 1 130px",
                  background: "#10B981", color: "#fff",
                  borderRadius: 12, padding: "13px 0",
                  fontSize: 15, fontWeight: 700,
                  textAlign: "center", textDecoration: "none",
                  display: "block"
                }}
              >
                📱 WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
