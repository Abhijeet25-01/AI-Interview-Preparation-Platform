function Navbar() {
  return (
    <nav>
      <div>
        <h2>AI CareerPrep</h2>

        <p>
          Resume Intelligence • Interview Readiness
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            padding: "8px 14px",
            borderRadius: "999px",
            background: "rgba(79, 140, 255, 0.12)",
            border: "1px solid rgba(79, 140, 255, 0.25)",
            color: "#b8c7ff",
            fontSize: "0.85rem",
            fontWeight: "600",
          }}
        >
          ATS Engine
        </span>

        <span
          style={{
            padding: "8px 14px",
            borderRadius: "999px",
            background: "rgba(79, 209, 197, 0.12)",
            border: "1px solid rgba(79, 209, 197, 0.25)",
            color: "#7ee7dc",
            fontSize: "0.85rem",
            fontWeight: "600",
          }}
        >
          Engineering Edition
        </span>
      </div>
    </nav>
  );
}

export default Navbar;