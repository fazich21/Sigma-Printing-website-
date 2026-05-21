export function Stars({ r, size = 13 }) {
  return (
    <span style={{ color: "#F59E0B", fontSize: size }}>
      {"★".repeat(Math.floor(r))}
      {"☆".repeat(5 - Math.floor(r))}
    </span>
  );
}