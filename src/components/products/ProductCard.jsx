import { useCart } from "../../context/CartContext";
import { useWish } from "../../context/WishlistContext";
import { Stars } from "../ui/Stars";

export function ProductCard({ p, toast, onDetail }) {
  const { add } = useCart();
  const { toggle, has } = useWish();
  const wishlisted = has(p.id);
  const disc = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

  return (
    <div
      style={{
        background: "#fff", borderRadius: 18,
        border: "1px solid #E5E7EB", overflow: "hidden",
        position: "relative", display: "flex",
        flexDirection: "column",
        transition: "transform .2s, box-shadow .2s"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(37,99,235,.13)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Discount badge */}
      {disc > 0 && (
        <div style={{
          position: "absolute", top: 12, left: 12, zIndex: 2,
          background: "#EF4444", color: "#fff",
          fontSize: 11, fontWeight: 700,
          padding: "3px 10px", borderRadius: 20
        }}>
          {disc}% OFF
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={e => {
          e.stopPropagation();
          toggle(p);
          toast(
            wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️",
            wishlisted ? "error" : "success"
          );
        }}
        style={{
          position: "absolute", top: 12, right: 12, zIndex: 2,
          width: 34, height: 34, borderRadius: "50%",
          border: "none", background: "rgba(255,255,255,.92)",
          cursor: "pointer", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,.1)"
        }}
      >
        {wishlisted ? "❤️" : "🤍"}
      </button>

      {/* Product Image */}
      <div
        onClick={() => onDetail(p)}
        style={{
          cursor: "pointer", height: 180,
          overflow: "hidden", position: "relative",
          background: "#F8FAFC", flexShrink: 0
        }}
      >
        <img
          src={p.image}
          alt={p.name}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", transition: "transform .4s"
          }}
          onMouseEnter={e => e.target.style.transform = "scale(1.07)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div style={{
          display: "none", position: "absolute", inset: 0,
          background: "linear-gradient(135deg,#EFF6FF,#F0FDF4)",
          alignItems: "center", justifyContent: "center", fontSize: 60
        }}>
          {p.emoji}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: "#2563EB",
          background: "#EFF6FF", padding: "2px 10px",
          borderRadius: 20, textTransform: "uppercase",
          letterSpacing: ".05em", alignSelf: "flex-start"
        }}>
          {p.category}
        </span>

        <h3
          onClick={() => onDetail(p)}
          style={{
            margin: "8px 0 4px", fontSize: 15,
            fontWeight: 800, color: "#111827",
            cursor: "pointer", lineHeight: 1.3
          }}
        >
          {p.name}
        </h3>

        <p style={{
          fontSize: 12, color: "#6B7280",
          margin: "0 0 10px", lineHeight: 1.55, flex: 1
        }}>
          {p.shortDescription.slice(0, 68)}…
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
          <Stars r={p.rating} />
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>({p.reviewsCount})</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: "#111827" }}>
            Rs {p.price.toLocaleString()}
          </span>
          {p.oldPrice && (
            <span style={{ fontSize: 12, color: "#9CA3AF", textDecoration: "line-through" }}>
              Rs {p.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => { add(p); toast(`${p.name} added to cart! 🛒`); }}
            style={{
              flex: 1, background: "#2563EB", color: "#fff",
              border: "none", borderRadius: 10,
              padding: "9px 0", fontSize: 12,
              fontWeight: 700, cursor: "pointer",
              transition: "background .2s"
            }}
            onMouseEnter={e => e.target.style.background = "#1d4ed8"}
            onMouseLeave={e => e.target.style.background = "#2563EB"}
          >
            + Add to Cart
          </button>
          <button
            onClick={() => onDetail(p)}
            title="View Details"
            style={{
              background: "#F8FAFC",
              border: "1px solid #E5E7EB",
              borderRadius: 10, padding: "9px 14px",
              fontSize: 13, cursor: "pointer", color: "#374151"
            }}
          >
            👁
          </button>
        </div>
      </div>
    </div>
  );
}