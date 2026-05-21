import { useState } from "react";

export function FAQ() {
  // paste your entire FAQ function body here
  
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "What is the minimum order quantity?", a: "MOQ varies: Visiting cards from 100 pcs, T-shirts from 12 pcs, certificates from 1 pc. Contact us for specifics." },
    { q: "How long does printing take?", a: "Most standard orders ready in 24–48 hrs. Rush 12-hour delivery available. Large orders may take 3–5 days." },
    { q: "Do you deliver across Pakistan?", a: "Yes! Free delivery in Rawalpindi & Islamabad on Rs 1,000+. Courier charges apply for outstation." },
    { q: "Can I provide my own design?", a: "Absolutely! We accept AI, PDF, CDR, PSD, PNG formats (300 DPI min). We also offer free design consultation." },
    { q: "What payment methods do you accept?", a: "Cash, bank transfer, EasyPaisa, JazzCash. Advance or COD available for WhatsApp orders." },
  ];
  return (
    <section style={{ padding: "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: "#111827", margin: "0 0 12px", letterSpacing: "-.5px" }}>Frequently Asked <span style={{ color: "#2563EB" }}>Questions</span></h2>
        </div>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: "1px solid #E5E7EB" }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "20px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{f.q}</span>
              <span style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid", borderColor: open === i ? "#2563EB" : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: open === i ? "#2563EB" : "#fff", color: open === i ? "#fff" : "#374151", flexShrink: 0 }}>
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && <p style={{ margin: "0 0 18px", fontSize: 15, color: "#4B5563", lineHeight: 1.75 }}>{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
