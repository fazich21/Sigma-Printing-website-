import { useState, useEffect, useRef } from "react";

export function TestimonialsSlider() {
  // paste your entire TestimonialsSlider function body here

  const [cur, setCur] = useState(0);
  const timer = useRef(null);

  const reviews = [
    { name: "Ahmed Raza", role: "Business Owner, Rawalpindi", text: "AL Printing has been our go-to for 5 years. The visiting cards quality is exceptional and delivery is always on time. Highly recommended!", rating: 5, avatar: "AR", color: "#2563EB" },
    { name: "Sara Khan", role: "Event Planner, Islamabad", text: "Used them for wedding cards for 3 different clients. Every client was absolutely impressed with the quality and the beautiful design work!", rating: 5, avatar: "SK", color: "#10B981" },
    { name: "Muhammad Ali", role: "Corporate Manager", text: "Ordered 500 promotional pens and 200 branded mugs. Perfect quality, on-time delivery, and the best pricing we found in Rawalpindi!", rating: 5, avatar: "MA", color: "#F59E0B" },
    { name: "Fatima Sheikh", role: "Shop Owner, Saddar", text: "Got my Panaflex sign made here. The colors are brilliant — weathering perfectly outdoors for over a year. Very happy customer!", rating: 5, avatar: "FS", color: "#A855F7" },
    { name: "Bilal Hussain", role: "School Principal", text: "Certificate printing for our annual day was superb! The gold foiling and embossed borders made them look very prestigious and professional.", rating: 5, avatar: "BH", color: "#EF4444" },
    { name: "Nadia Malik", role: "Marketing Manager", text: "Best brochure printing in Rawalpindi, no doubt. Colors matched our brand identity perfectly and paper quality is premium for the price.", rating: 5, avatar: "NM", color: "#0EA5E9" },
  ];

  const go = (i) => { clearTimeout(timer.current); setCur(i); };
  useEffect(() => { timer.current = setTimeout(() => setCur(c => (c + 1) % reviews.length), 4500); return () => clearTimeout(timer.current); }, [cur]);

  const r = reviews[cur];

  return (
    <section style={{ padding: "80px 40px", background: "#111827" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: "#fff", margin: "0 0 12px", letterSpacing: "-.5px" }}>What Customers <span style={{ color: "#10B981" }}>Say</span></h2>
          <p style={{ color: "#9CA3AF", fontSize: 16 }}>Trusted by 10,000+ happy customers across Pakistan</p>
        </div>
        {/* Card */}
        <div style={{ background: "#1F2937", borderRadius: 24, padding: "44px 52px", border: "1px solid #374151", display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap", minHeight: 220, transition: "all .4s" }}>
          <div style={{ flexShrink: 0, textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: r.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 10 }}>{r.avatar}</div>
            <span style={{ color: "#F59E0B", fontSize: 15 }}>{"★".repeat(r.rating)}</span>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 52, color: r.color, lineHeight: 1, marginBottom: 14, fontFamily: "Georgia,serif", opacity: .8 }}>"</div>
            <p style={{ fontSize: 16, color: "#D1D5DB", lineHeight: 1.8, margin: "0 0 20px", fontStyle: "italic" }}>{r.text}</p>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{r.name}</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{r.role}</div>
          </div>
        </div>
        {/* Dots + arrows */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 32 }}>
          <button onClick={() => go((cur - 1 + reviews.length) % reviews.length)}
            style={{ width: 42, height: 42, borderRadius: "50%", border: "2px solid #374151", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
          <div style={{ display: "flex", gap: 8 }}>
            {reviews.map((_, i) => (
              <button key={i} onClick={() => go(i)}
                style={{ width: i === cur ? 28 : 10, height: 10, borderRadius: 5, border: "none", background: i === cur ? "#10B981" : "#374151", cursor: "pointer", transition: "all .3s", padding: 0 }} />
            ))}
          </div>
          <button onClick={() => go((cur + 1) % reviews.length)}
            style={{ width: 42, height: 42, borderRadius: "50%", border: "2px solid #374151", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
        </div>
      </div>
    </section>
  );
}