import { useState } from "react";

export function ContactPage({ toast }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", msg: "" });

  function handleChange(key, value) {
    setForm(function(prev) {
      var next = {};
      next.name  = prev.name;
      next.phone = prev.phone;
      next.email = prev.email;
      next.msg   = prev.msg;
      next[key]  = value;
      return next;
    });
  }

  function handleSubmit() {
    if (!form.name || !form.phone) {
      toast("Please fill in name and phone number", "error");
      return;
    }
    toast("Message sent! We will contact you soon 🎉");
    setForm({ name: "", phone: "", email: "", msg: "" });
  }

  var contactItems = [
    { icon: "📍", title: "Address",           value: "Shop 12, Chand Plaza G-9 Markaz,Islamabad, ICT 44000" },
    { icon: "📞", title: "Phone / WhatsApp",  value: "+92 300 1234567" },
    { icon: "✉️", title: "Email",             value: "info@sigmaprinting.pk" },
    { icon: "⏰", title: "Business Hours",    value: "Monday to Saturday: 9:00 AM to 8:00 PM" },
  ];

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
          Contact <span style={{ color: "#2563EB" }}>Us</span>
        </h1>
        <p style={{
          color: "#6B7280",
          fontSize: "clamp(15px, 2vw, 18px)"
        }}>
          We are here to help with all your printing needs
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>

        {/* Two column layout — stacks on mobile */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          alignItems: "flex-start"
        }}>

          {/* LEFT: Contact info */}
          <div style={{ flex: "1 1 280px", minWidth: 260 }}>
            <h2 style={{
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 800, color: "#111827", marginBottom: 28
            }}>
              Get in Touch
            </h2>

            {contactItems.map(function(c) {
              return (
                <div key={c.title} style={{
                  display: "flex", gap: 16,
                  marginBottom: 22, alignItems: "flex-start"
                }}>
                  <div style={{
                    width: 46, height: 46,
                    background: "#EFF6FF", borderRadius: 13,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 20,
                    flexShrink: 0
                  }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: 11, fontWeight: 800,
                      color: "#6B7280", marginBottom: 3,
                      textTransform: "uppercase", letterSpacing: ".05em"
                    }}>
                      {c.title}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>
                      {c.value}
                    </div>
                  </div>
                </div>
              );
            })}

            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center",
                gap: 10, background: "#10B981", color: "#fff",
                borderRadius: 13, padding: "14px 28px",
                fontSize: 15, fontWeight: 700,
                textDecoration: "none", marginTop: 16
              }}
            >
              📱 Chat on WhatsApp
            </a>
          </div>

          {/* RIGHT: Form */}
          <div style={{
            flex: "1 1 300px", minWidth: 280,
            background: "#F8FAFC", borderRadius: 24,
            padding: "32px 28px",
            border: "1px solid #E5E7EB"
          }}>
            <h2 style={{
              fontSize: "clamp(18px, 3vw, 22px)",
              fontWeight: 800, color: "#111827", marginBottom: 24
            }}>
              Send a Message
            </h2>

            {/* Name */}
            <div style={{ marginBottom: 16 }}>
              <label style={{
                fontSize: 13, fontWeight: 700,
                color: "#374151", display: "block", marginBottom: 7
              }}>
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={function(e) { handleChange("name", e.target.value); }}
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "11px 16px",
                  border: "2px solid #E5E7EB",
                  borderRadius: 12, fontSize: 14,
                  outline: "none", background: "#fff"
                }}
                onFocus={function(e) { e.target.style.borderColor = "#2563EB"; }}
                onBlur={function(e)  { e.target.style.borderColor = "#E5E7EB"; }}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: 16 }}>
              <label style={{
                fontSize: 13, fontWeight: 700,
                color: "#374151", display: "block", marginBottom: 7
              }}>
                Phone / WhatsApp *
              </label>
              <input
                type="tel"
                placeholder="+92 300 xxxxxxx"
                value={form.phone}
                onChange={function(e) { handleChange("phone", e.target.value); }}
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "11px 16px",
                  border: "2px solid #E5E7EB",
                  borderRadius: 12, fontSize: 14,
                  outline: "none", background: "#fff"
                }}
                onFocus={function(e) { e.target.style.borderColor = "#2563EB"; }}
                onBlur={function(e)  { e.target.style.borderColor = "#E5E7EB"; }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{
                fontSize: 13, fontWeight: 700,
                color: "#374151", display: "block", marginBottom: 7
              }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={function(e) { handleChange("email", e.target.value); }}
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "11px 16px",
                  border: "2px solid #E5E7EB",
                  borderRadius: 12, fontSize: 14,
                  outline: "none", background: "#fff"
                }}
                onFocus={function(e) { e.target.style.borderColor = "#2563EB"; }}
                onBlur={function(e)  { e.target.style.borderColor = "#E5E7EB"; }}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                fontSize: 13, fontWeight: 700,
                color: "#374151", display: "block", marginBottom: 7
              }}>
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your printing requirements..."
                value={form.msg}
                onChange={function(e) { handleChange("msg", e.target.value); }}
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "11px 16px",
                  border: "2px solid #E5E7EB",
                  borderRadius: 12, fontSize: 14,
                  outline: "none", resize: "vertical",
                  background: "#fff", fontFamily: "inherit"
                }}
                onFocus={function(e) { e.target.style.borderColor = "#2563EB"; }}
                onBlur={function(e)  { e.target.style.borderColor = "#E5E7EB"; }}
              />
            </div>

            <button
              onClick={handleSubmit}
              style={{
                width: "100%", background: "#2563EB",
                color: "#fff", border: "none",
                borderRadius: 12, padding: "13px 0",
                fontSize: 15, fontWeight: 700, cursor: "pointer"
              }}
            >
              Send Message
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
