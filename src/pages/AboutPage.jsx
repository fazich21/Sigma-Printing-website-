export function AboutPage() {
  return (
    <div>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #EFF6FF, #F0FDF4)",
        padding: "60px 24px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 900, color: "#111827",
          margin: "0 0 16px", letterSpacing: "-1px"
        }}>
          About <span style={{ color: "#2563EB" }}>AL Printing</span>
        </h1>
        <p style={{
          color: "#6B7280", fontSize: "clamp(15px, 2vw, 18px)",
          maxWidth: 560, margin: "0 auto"
        }}>
          Islamabad's trusted printing press since 2009.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>

        {/* Story section */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          alignItems: "center",
          marginBottom: 60
        }}>
          {/* Text */}
          <div style={{ flex: "1 1 300px", minWidth: 260 }}>
            <h2 style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 900, color: "#111827", marginBottom: 20
            }}>
              Our Story
            </h2>
            <p style={{ color: "#4B5563", lineHeight: 1.85, marginBottom: 16, fontSize: 15 }}>
              AL Printing Press was founded in 2009 with a single mission: to provide
              businesses and individuals in Islamabad with world-class printing
              services at fair prices.
            </p>
            <p style={{ color: "#4B5563", lineHeight: 1.85, marginBottom: 16, fontSize: 15 }}>
              Over 15 years, we have grown from a small card-printing shop to a
              full-service printing house offering 32+ services — from wedding
              invitations to large-format Panaflex banners.
            </p>
            <p style={{ color: "#4B5563", lineHeight: 1.85, fontSize: 15 }}>
              Today we serve 10,000+ satisfied customers with state-of-the-art
              digital and offset printing technology and a commitment to excellence
              in every print.
            </p>
          </div>

          {/* Image */}
          <div style={{
            flex: "1 1 280px", minWidth: 260,
            borderRadius: 24, overflow: "hidden",
            height: 320
          }}>
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80"
              alt="Printing press"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 16,
          marginBottom: 60
        }}>
          {[
            ["2009",    "Year Founded",     "#2563EB"],
            ["10,000+", "Happy Customers",  "#10B981"],
            ["32+",     "Print Services",   "#F59E0B"],
            ["15+",     "Years Experience", "#A855F7"],
          ].map(function(item) {
            return (
              <div key={item[1]} style={{
                background: "#F8FAFC",
                borderRadius: 20,
                padding: "28px 16px",
                textAlign: "center",
                border: "1px solid #E5E7EB"
              }}>
                <div style={{
                  fontSize: "clamp(24px, 4vw, 34px)",
                  fontWeight: 900, color: item[2], marginBottom: 8
                }}>
                  {item[0]}
                </div>
                <div style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>
                  {item[1]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Values */}
        <div>
          <h2 style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 900, color: "#111827",
            marginBottom: 24, textAlign: "center"
          }}>
            Our Values
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20
          }}>
            {[
              { icon: "🎯", title: "Quality First",     desc: "We never compromise on print quality. Every job goes through rigorous quality checks before delivery." },
              { icon: "⏱",  title: "On-Time Delivery",  desc: "We understand your deadlines. Our team works round the clock to deliver on time, every time." },
              { icon: "🤝", title: "Customer Trust",    desc: "Built on 15 years of trust. We treat every client with honesty, transparency, and respect." },
            ].map(function(v) {
              return (
                <div key={v.title} style={{
                  background: "#fff", borderRadius: 18,
                  padding: "24px 20px",
                  border: "1px solid #E5E7EB",
                  display: "flex", gap: 16, alignItems: "flex-start"
                }}>
                  <div style={{
                    width: 50, height: 50,
                    background: "#EFF6FF", borderRadius: 14,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 24,
                    flexShrink: 0
                  }}>
                    {v.icon}
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#111827" }}>
                      {v.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: "#6B7280", lineHeight: 1.65 }}>
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
