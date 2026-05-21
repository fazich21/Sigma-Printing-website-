export function Process() {
  // paste your entire Process function body here
  
  return (
    <section style={{ padding: "80px 40px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: "#111827", margin: "0 0 12px", letterSpacing: "-.5px" }}>How It <span style={{ color: "#10B981" }}>Works</span></h2>
          <p style={{ color: "#6B7280", fontSize: 16 }}>Simple 4-step process to get your prints</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
          {[
            { num: "01", title: "Choose Service", desc: "Browse our 32+ services and select what you need", icon: "🔍" },
            { num: "02", title: "Send Design", desc: "Share your artwork or request our free design service", icon: "🎨" },
            { num: "03", title: "Get Quote", desc: "Instant pricing via WhatsApp — no hidden costs", icon: "💬" },
            { num: "04", title: "Get Delivered", desc: "Fast delivery to your doorstep, ready to use", icon: "📦" },
          ].map(s => (
            <div key={s.num} style={{ background: "#fff", borderRadius: 20, padding: "32px 24px", textAlign: "center", border: "1px solid #E5E7EB", position: "relative" }}>
              <div style={{ position: "absolute", top: 14, right: 18, fontSize: 38, fontWeight: 900, color: "#F3F4F6" }}>{s.num}</div>
              <div style={{ width: 62, height: 62, background: "linear-gradient(135deg,#EFF6FF,#F0FDF4)", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 26 }}>{s.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#111827", margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
