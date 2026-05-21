export function AboutPage() {
  // paste your entire About function body here
  
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg,#EFF6FF,#F0FDF4)", padding: "80px 40px", textAlign: "center" }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: "#111827", margin: "0 0 16px", letterSpacing: "-1px" }}>About <span style={{ color: "#2563EB" }}>AL Printing</span></h1>
        <p style={{ color: "#6B7280", fontSize: 18, maxWidth: 560, margin: "0 auto" }}>Rawalpindi's trusted printing press since 2009.</p>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 72 }} className="about-grid">
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#111827", marginBottom: 20 }}>Our Story</h2>
            <p style={{ color: "#4B5563", lineHeight: 1.85, marginBottom: 16 }}>AL Printing Press was founded in 2009 with a single mission: to provide Rawalpindi businesses with world-class printing at fair prices.</p>
            <p style={{ color: "#4B5563", lineHeight: 1.85, marginBottom: 16 }}>Over 15 years, we've grown from a small card-printing shop to a full-service house offering 32+ services — from wedding invitations to large-format Panaflex banners.</p>
            <p style={{ color: "#4B5563", lineHeight: 1.85 }}>Today we serve 10,000+ satisfied customers with state-of-the-art digital and offset printing technology.</p>
          </div>
          <div style={{ borderRadius: 24, overflow: "hidden", height: 360 }}>
            <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80" alt="Press" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 20 }}>
          {[["2009", "Year Founded", "#2563EB"], ["10,000+", "Happy Customers", "#10B981"], ["32+", "Print Services", "#F59E0B"], ["15+", "Years Experience", "#A855F7"]].map(([n, l, c]) => (
            <div key={l} style={{ background: "#F8FAFC", borderRadius: 20, padding: "30px 20px", textAlign: "center", border: "1px solid #E5E7EB" }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: c, marginBottom: 8 }}>{n}</div>
              <div style={{ fontSize: 14, color: "#6B7280", fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
