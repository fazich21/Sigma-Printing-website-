import { useState } from "react";

export function ContactPage({ toast }) {
  // paste your entire Contact function body here

  const [form, setForm] = useState({ name: "", phone: "", email: "", msg: "" });
  const submit = () => {
    if (!form.name || !form.phone) { toast("Please fill name and phone", "error"); return; }
    toast("Message sent! We'll contact you soon 🎉");
    setForm({ name: "", phone: "", email: "", msg: "" });
  };
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg,#EFF6FF,#F0FDF4)", padding: "80px 40px", textAlign: "center" }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: "#111827", margin: "0 0 16px", letterSpacing: "-1px" }}>Contact <span style={{ color: "#2563EB" }}>Us</span></h1>
        <p style={{ color: "#6B7280", fontSize: 18 }}>We're here to help with all your printing needs</p>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }} className="contact-grid">
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 28 }}>Get in Touch</h2>
            {[["📍", "Address", "Shop 12, Raja Bazar, Rawalpindi, Punjab 46000"], ["📞", "Phone / WhatsApp", "+92 300 1234567"], ["✉️", "Email", "info@alprinting.pk"], ["⏰", "Hours", "Mon–Sat: 9:00 AM – 8:00 PM"]].map(([icon, title, val]) => (
              <div key={title} style={{ display: "flex", gap: 16, marginBottom: 22, alignItems: "flex-start" }}>
                <div style={{ width: 46, height: 46, background: "#EFF6FF", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#6B7280", marginBottom: 3, textTransform: "uppercase", letterSpacing: ".05em" }}>{title}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>{val}</div>
                </div>
              </div>
            ))}
            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#10B981", color: "#fff", borderRadius: 13, padding: "14px 28px", fontSize: 15, fontWeight: 700, textDecoration: "none", marginTop: 16 }}>📱 Chat on WhatsApp</a>
          </div>
          <div style={{ background: "#F8FAFC", borderRadius: 24, padding: 40, border: "1px solid #E5E7EB" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 26 }}>Send a Message</h2>
            {[["name", "Full Name *", "Your name", "text"], ["phone", "Phone / WhatsApp *", "+92 300 xxxxxxx", "tel"], ["email", "Email Address", "your@email.com", "email"]].map(([k, l, ph, t]) => (
              <div key={k} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 7 }}>{l}</label>
                <input type={t} placeholder={ph} value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))}
                  style={{ width: "100%", boxSizing: "border-box", padding: "11px 16px", border: "2px solid #E5E7EB", borderRadius: 12, fontSize: 14, outline: "none", background: "#fff" }}
                  onFocus={e => e.target.style.borderColor = "#2563EB"} onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
              </div>
            ))}
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 7 }}>Message</label>
              <textarea rows={4} placeholder="Tell us about your printing requirements..." value={form.msg} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                style={{ width: "100%", boxSizing: "border-box", padding: "11px 16px", border: "2px solid #E5E7EB", borderRadius: 12, fontSize: 14, outline: "none", resize: "vertical", background: "#fff" }}
                onFocus={e => e.target.style.borderColor = "#2563EB"} onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
            </div>
            <button onClick={submit} style={{ width: "100%", background: "#2563EB", color: "#fff", border: "none", borderRadius: 12, padding: "13px 0", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Send Message →</button>
          </div>
        </div>
      </div>
    </div>
  );
}