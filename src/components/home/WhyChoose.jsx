export function WhyChoose() {
  // paste your entire WhyChoose function body here

  const items = [
    { icon: "🎨", title: "Premium Quality", desc: "Top-grade inks and papers on every single order.", color: "#EFF6FF", ac: "#2563EB" },
    { icon: "⚡", title: "Fast Turnaround", desc: "Most orders ready in 24–48 hrs. Rush in 12 hrs.", color: "#FFF7ED", ac: "#F59E0B" },
    { icon: "💰", title: "Best Prices", desc: "Competitive pricing with bulk discounts always.", color: "#F0FDF4", ac: "#10B981" },
    { icon: "🎯", title: "Custom Design", desc: "Expert designers craft artwork for your brand.", color: "#FDF2F8", ac: "#A855F7" },
    { icon: "📦", title: "Free Delivery", desc: "Free delivery in Rawalpindi & Islamabad Rs 1,000+.", color: "#FFF1F2", ac: "#EF4444" },
    { icon: "💬", title: "24/7 Support", desc: "Instant support via WhatsApp any time you need.", color: "#F0F9FF", ac: "#0EA5E9" },
  ];
  return (
    <section style={{ padding: "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="why-grid">
          <div>
            <div style={{ display: "inline-block", background: "#EFF6FF", color: "#2563EB", borderRadius: 30, padding: "6px 18px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 20 }}>Why Choose Us</div>
            <h2 style={{ fontSize: "clamp(28px,3vw,42px)", fontWeight: 900, color: "#111827", lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-.5px" }}>
              We Make Your Brand<br /><span style={{ color: "#2563EB" }}>Look Amazing</span>
            </h2>
            <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.8, marginBottom: 32 }}>15+ years of experience, state-of-the-art equipment, and a passionate team dedicated to making every print perfect.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {[["10K+", "Customers", "#2563EB"], ["32+", "Services", "#10B981"], ["15+", "Years Exp.", "#F59E0B"]].map(([n, l, c]) => (
                <div key={l} style={{ background: "#F8FAFC", borderRadius: 16, padding: "20px 24px", textAlign: "center", border: "1px solid #E5E7EB", flex: "1 1 100px" }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: c }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {items.map(r => (
              <div key={r.title} style={{ background: r.color, borderRadius: 18, padding: "20px 16px", border: `1px solid ${r.ac}22`, transition: "transform .2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}>
                <div style={{ width: 46, height: 46, background: "#fff", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 12, boxShadow: `0 4px 12px ${r.ac}22` }}>{r.icon}</div>
                <h3 style={{ margin: "0 0 7px", fontSize: 14, fontWeight: 800, color: "#111827" }}>{r.title}</h3>
                <p style={{ margin: 0, fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
