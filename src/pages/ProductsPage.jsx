import { useState } from "react";
import { products, categories } from "../data/products";
import { ProductCard } from "../components/products/ProductCard";

export function ProductsPage({ toast, onDetail }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  var filtered = products.filter(function(p) {
    var matchCat = cat === "All" || p.category === cat;
    var matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === "price-asc") {
    filtered = filtered.slice().sort(function(a, b) { return a.price - b.price; });
  } else if (sort === "price-desc") {
    filtered = filtered.slice().sort(function(a, b) { return b.price - a.price; });
  } else if (sort === "rating") {
    filtered = filtered.slice().sort(function(a, b) { return b.rating - a.rating; });
  }

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>

      {/* Page Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontSize: 38, fontWeight: 900, color: "#111827",
          marginBottom: 8, letterSpacing: "-.5px"
        }}>
          All Products
        </h1>
        <p style={{ color: "#6B7280", fontSize: 15, margin: 0 }}>
          {filtered.length} products found
        </p>
      </div>

      {/* Search + Sort */}
      <div style={{
        display: "flex", gap: 12,
        marginBottom: 24, flexWrap: "wrap"
      }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={function(e) { setSearch(e.target.value); }}
          style={{
            flex: 1, minWidth: 200,
            padding: "11px 18px",
            border: "2px solid #E5E7EB",
            borderRadius: 12, fontSize: 14,
            outline: "none", background: "#fff"
          }}
          onFocus={function(e) { e.target.style.borderColor = "#2563EB"; }}
          onBlur={function(e) { e.target.style.borderColor = "#E5E7EB"; }}
        />
        <select
          value={sort}
          onChange={function(e) { setSort(e.target.value); }}
          style={{
            padding: "11px 18px",
            border: "2px solid #E5E7EB",
            borderRadius: 12, fontSize: 14,
            background: "#fff", cursor: "pointer",
            outline: "none"
          }}
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Category Pills */}
      <div style={{
        display: "flex", gap: 8,
        marginBottom: 32, flexWrap: "wrap"
      }}>
        {categories.map(function(c) {
          return (
            <button
              key={c}
              onClick={function() { setCat(c); }}
              style={{
                padding: "8px 18px",
                borderRadius: 30,
                border: "2px solid",
                borderColor: cat === c ? "#2563EB" : "#E5E7EB",
                background: cat === c ? "#2563EB" : "#fff",
                color: cat === c ? "#fff" : "#374151",
                fontSize: 13, fontWeight: 600,
                cursor: "pointer"
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 22
        }}>
          {filtered.map(function(p) {
            return (
              <ProductCard
                key={p.id}
                p={p}
                toast={toast}
                onDetail={onDetail}
              />
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
          <h3 style={{ color: "#374151", marginBottom: 8 }}>No products found</h3>
          <p style={{ color: "#6B7280" }}>Try a different search or category</p>
        </div>
      )}

    </div>
  );
}
