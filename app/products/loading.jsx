import React from 'react'

export default function loading() {
return (
    <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
        <div style={{
            border: "6px solid #f3f3f3",
            borderTop: "6px solid #764ba2",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            animation: "spin 1s linear infinite"
        }} />
        <p style={{
            color: "#fff",
            marginTop: "24px",
            fontSize: "1.5rem",
            letterSpacing: "1px"
        }}></p>
        <style>{`
            @keyframes spin {
                0% { transform: rotate(0deg);}
                100% { transform: rotate(360deg);}
            }
        `}</style>
    </div>
)
}
