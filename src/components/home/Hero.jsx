export function Hero({ setPage }) {
  return (
    <section style={{
      background: "linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)",
      padding: "60px 24px",
      overflow: "hidden"
    }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        gap: 48,
        alignItems: "center"
      }}>

        {/* LEFT: Text */}
        <div style={{ flex: "1 1 340px", minWidth: 280 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#DBEAFE", color: "#1D4ED8",
            borderRadius: 30, padding: "7px 18px",
            fontSize: 13, fontWeight: 700, marginBottom: 24
          }}>
            🏆 #1 Printing Press in Rawalpindi
          </div>

          <h1 style={{
            fontSize: "clamp(30px, 4vw, 54px)",
            fontWeight: 900, color: "#111827",
            lineHeight: 1.12, margin: "0 0 20px",
            letterSpacing: "-1px"
          }}>
            Premium Quality<br />
            <span style={{
              background: "linear-gradient(135deg, #2563EB, #10B981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Printing Services
            </span><br />
            in Islamabad
          </h1>

          <p style={{
            fontSize: 16, color: "#4B5563",
            lineHeight: 1.75, marginBottom: 32
          }}>
            From visiting cards to wedding invitations — exceptional quality
            with 24hr turnaround. 32+ services, trusted by 10,000+ customers.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
            <button
              onClick={function() { setPage("products"); }}
              style={{
                background: "#2563EB", color: "#fff",
                border: "none", borderRadius: 13,
                padding: "14px 32px", fontSize: 16,
                fontWeight: 700, cursor: "pointer",
                boxShadow: "0 8px 24px rgba(37,99,235,.35)"
              }}
            >
              Browse Products
            </button>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#fff", color: "#10B981",
                border: "2px solid #10B981",
                borderRadius: 13, padding: "14px 28px",
                fontSize: 16, fontWeight: 700,
                textDecoration: "none", display: "inline-block"
              }}
            >
              📱 Free Quote
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              ["10K+", "Customers"],
              ["32+",  "Services"],
              ["15+",  "Years"],
              ["24hr", "Delivery"]
            ].map(function(item) {
              return (
                <div key={item[1]}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#2563EB" }}>
                    {item[0]}
                  </div>
                  <div style={{
                    fontSize: 11, color: "#6B7280",
                    fontWeight: 600, textTransform: "uppercase",
                    letterSpacing: ".05em"
                  }}>
                    {item[1]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Image collage — hidden on mobile via inline media */}
        <div style={{ flex: "1 1 340px", minWidth: 280 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "200px 200px",
            gap: 12,
            position: "relative"
          }}>
            {/* Tall left image */}
            <div style={{
              borderRadius: 20, overflow: "hidden",
              gridRow: "1 / 3"
            }}>
              <img
                src="https://images.unsplash.com/photo-1626148750063-fa6fb609b100?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=80"
                alt="Visiting Cards"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Top right */}
            <div style={{ borderRadius: 20, overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80"
                alt="Brochure"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Bottom right */}
            <div style={{ borderRadius: 20, overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80"
                alt="T-shirt"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Floating badge */}
            <div style={{
              position: "absolute",
              bottom: -14, left: -14,
              background: "#fff", borderRadius: 16,
              padding: "12px 18px",
              boxShadow: "0 8px 32px rgba(0,0,0,.13)",
              display: "flex", alignItems: "center", gap: 10
            }}>
              <div style={{
                width: 42, height: 42,
                background: "#DCFCE7", borderRadius: 12,
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 22
              }}>
                ⚡
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#111827" }}>
                  24hr Delivery
                </div>
                <div style={{ fontSize: 11, color: "#10B981", fontWeight: 600 }}>
                  Rush orders available
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
