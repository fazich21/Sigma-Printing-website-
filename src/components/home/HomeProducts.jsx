import { useState } from "react";
import { products, categories } from "../../data/products";
import { ProductCard } from "../products/ProductCard";

export function HomeProducts({ toast, onDetail }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(8);

  const filtered = products.filter(p =>
    (cat === "All" || p.category === cat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section style={{ padding: "80px 40px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: "#111827", margin: "0 0 12px", letterSpacing: "-.5px" }}>
            All <span style={{ color: "#2563EB" }}>Products</span>
          </h2>
          <p style={{ color: "#6B7280", fontSize: 16 }}>
            32 premium printing services — all in one place
          </p>
        </div>

        {/* Search */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <input
            type="text"
            placeholder="🔍  Search products..."
            value={search}
            onChange={e => { setSearch(e.target.value); setVisible(8); }}
            style={{
              width: "100%", maxWidth: 460,
              padding: "12px 20px",
              border: "2px solid #E5E7EB",
              borderRadius: 40, fontSize: 15,
              outline: "none", background: "#fff"
            }}
            onFocus={e => e.target.style.borderColor = "#2563EB"}
            onBlur={e => e.target.style.borderColor = "#E5E7EB"}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => { setCat(c); setVisible(8); }}
              style={{
                padding: "8px 18px", borderRadius: 30,
                border: "2px solid",
                borderColor: cat === c ? "#2563EB" : "#E5E7EB",
                background: cat === c ? "#2563EB" : "#fff",
                color: cat === c ? "#fff" : "#374151",
                fontSize: 13, fontWeight: 600,
                cursor: "pointer", transition: "all .2s"
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 22, marginBottom: 36
        }}>
          {filtered.slice(0, visible).map(p => (
            <ProductCard key={p.id} p={p} toast={toast} onDetail={onDetail} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 54, marginBottom: 12 }}>🔍</div>
            <p style={{ color: "#6B7280" }}>No products found.</p>
          </div>
        )}

        {/* Load More */}
        {visible < filtered.length && (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => setVisible(v => v + 8)}
              style={{
                background: "#fff",
                border: "2px solid #2563EB",
                color: "#2563EB", borderRadius: 12,
                padding: "13px 40px", fontSize: 15,
                fontWeight: 700, cursor: "pointer"
              }}
            >
              Load More ({filtered.length - visible} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}