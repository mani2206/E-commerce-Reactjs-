import React from 'react'

export default function CardModel({ show, cart, totalAmount, onClose }) {
    if (!show) return null;
  return (
    <div className="modal-overlay">
    <div className="modal-content ">
      <h3>Items Details</h3>
      {cart.length === 0 ? (
        <p>Your item is empty!</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
        </>
      )}
      <button onClick={onClose} className="close-button">
        Close
      </button>
    </div>
  </div>
  )
}
