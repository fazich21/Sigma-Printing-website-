export function Toasts({ toasts }) {
  return (
    <div style={{
      position: "fixed", top: 80, right: 20,
      zIndex: 9999, display: "flex",
      flexDirection: "column", gap: 8
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type === "success" ? "#10B981"
                    : t.type === "error"   ? "#EF4444"
                    : "#2563EB",
          color: "#fff", padding: "12px 20px",
          borderRadius: 12, fontSize: 14,
          fontWeight: 600, minWidth: 220,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          animation: "toastIn .3s ease"
        }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}