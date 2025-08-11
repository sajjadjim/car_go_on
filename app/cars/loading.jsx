import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      }}
    >
      {/* Car body */}
      <div style={{ position: "relative", width: "120px", height: "60px" }}>
        {/* Body shape */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "0",
            right: "0",
            height: "30px",
            background: "#ff4d4f",
            borderRadius: "8px 8px 4px 4px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
        />
        {/* Roof */}
        <div
          style={{
            position: "absolute",
            bottom: "35px",
            left: "20px",
            right: "20px",
            height: "15px",
            background: "#ff4d4f",
            borderRadius: "8px 8px 0 0",
          }}
        />
        {/* Wheels */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "15px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#333",
            border: "3px solid #888",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "15px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#333",
            border: "3px solid #888",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>

      {/* Loading text */}
      <p
        style={{
          color: "#fff",
          marginTop: "24px",
          fontSize: "1.5rem",
          letterSpacing: "1px",
        }}
      >
        Warming up your ride...
      </p>

      {/* Animation keyframes */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}
