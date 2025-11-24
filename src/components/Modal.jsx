import React from 'react'

export default function Modal({ open, onClose, children }) {
  if (!open) return null

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(246, 242, 242, 0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#f4efefff",
          padding: "16px",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "80vh",         
          overflowY: "auto",       
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="button" onClick={onClose}>Close</button>
        </div>

        {children}
      </div>
    </div>
  )
}


