export function CTA({ setPage }) {
  // paste your entire CTA function body here
  
  return (
    <section style={{ padding: "80px 40px", background: "linear-gradient(135deg,#1E40AF,#065F46)", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, background: "rgba(255,255,255,.04)", borderRadius: "50%" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-.5px" }}>Ready to Print?</h2>
        <p style={{ color: "rgba(255,255,255,.75)", fontSize: 17, marginBottom: 40, lineHeight: 1.7 }}>Get instant quotes on WhatsApp. We're ready to make your brand look absolutely amazing.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" style={{ background: "#10B981", color: "#fff", borderRadius: 13, padding: "15px 36px", fontSize: 16, fontWeight: 700, textDecoration: "none" }}>📱 Chat on WhatsApp</a>
          <button onClick={() => setPage("products")} style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "2px solid rgba(255,255,255,.3)", borderRadius: 13, padding: "15px 36px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>Browse All Products →</button>
        </div>
      </div>
    </section>
  );
}
