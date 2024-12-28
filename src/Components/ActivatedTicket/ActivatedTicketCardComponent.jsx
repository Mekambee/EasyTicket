import React from "react";
import { useLocation } from "wouter";
import styles from "./ActivatedTicketCardStyle.module.css";

export default function ActivatedTicketCardComponent({ price, time }) {
  const [, navigate] = useLocation();

  const handleShowTicket = () => {
    navigate(`/your-ticket?price=${encodeURIComponent(price)}&time=${encodeURIComponent(time)}`);
  };

  return (
    <div className={styles.ticketCard}>
      <h2>{time}</h2>
      <p>MPK Kraków</p>
      <p>strefy I+II+III</p>
      <h3>{price} zł</h3>
      <button className={styles.activateButton} onClick={handleShowTicket}>
        Pokaż Bilet
      </button>
    </div>
  );
}
