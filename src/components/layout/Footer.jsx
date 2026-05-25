export function Footer({ setPage }) {
  // paste your entire Footer function body here
  return (
    <footer style={{ background: "#0F172A", color: "#fff", padding: "64px 40px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 44, marginBottom: 52 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, background: "linear-gradient(135deg,#2563EB,#10B981)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🖨</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 900 }}>AL Printing Press</div>
                <div style={{ fontSize: 10, color: "#10B981", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700 }}>Quality You Can Trust</div>
              </div>
            </div>
            <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.8 }}>Islamabad's premier printing press since 2009. 10,000+ customers, 32+ services.</p>
          </div>
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 800, marginBottom: 16, textTransform: "uppercase", letterSpacing: ".08em", color: "#9CA3AF" }}>Quick Links</h3>
            {[["Home", "home"], ["Products", "products"], ["About Us", "about"], ["Contact", "contact"]].map(([l, p]) => (
              <button key={p} onClick={() => setPage(p)} style={{ display: "block", background: "none", border: "none", color: "#6B7280", fontSize: 14, padding: "5px 0", cursor: "pointer", textAlign: "left" }}
                onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#6B7280"}>→ {l}</button>
            ))}
          </div>
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 800, marginBottom: 16, textTransform: "uppercase", letterSpacing: ".08em", color: "#9CA3AF" }}>Top Services</h3>
            {["Visiting Cards", "Wedding Cards", "T-Shirt Printing", "Panaflex Banners", "Stamp Making", "Mug Printing"].map(s => <div key={s} style={{ color: "#6B7280", fontSize: 14, padding: "5px 0" }}>→ {s}</div>)}
          </div>
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 800, marginBottom: 16, textTransform: "uppercase", letterSpacing: ".08em", color: "#9CA3AF" }}>Contact</h3>
            <div style={{ color: "#6B7280", fontSize: 14, lineHeight: 2.2 }}>
              <div>📍 G-9 Markaz, Islamabad</div>
              <div>📞 +92 300 1234567</div>
              <div>✉️ info@alprinting.pk</div>
              <div>⏰ Mon–Sat 9am–8pm</div>
            </div>
            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 16, background: "#10B981", color: "#fff", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📱 WhatsApp Us</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1F2937", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <p style={{ color: "#4B5563", fontSize: 13, margin: 0 }}>© 2025 AL Printing Press. All rights reserved. | Rawalpindi, Pakistan</p>
          <p style={{ color: "#4B5563", fontSize: 13, margin: 0 }}>Made with ❤️ for quality printing</p>
        </div>
      </div>
    </footer>
  );
}