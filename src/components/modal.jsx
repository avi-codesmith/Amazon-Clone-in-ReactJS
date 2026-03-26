import { useActionData } from "react-router-dom";
import tick from "../asset/tick.svg";
import "./modal.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const data = useActionData();

  useEffect(() => {
    if (data?.success) {
      setShowModal(true);
    }
  }, [data]);

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <img src={tick} alt="done" className="modal-icon" />

            <h2>Order Confirmed</h2>

            <p>
              Your order has been placed successfully. It will arrive within a
              week at your doorstep.
            </p>

            <Link to="/">
              <button className="modal-btn">Continue Shopping</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
