import React from "react";
import { useLocation } from "wouter";
import styles from "./ExpiredTicketCardStyle.module.css";

export default function ExpiredTicketCardComponent({ price, time }) {
  const [, navigate] = useLocation();

  const handleShowTicket = () => {
    navigate(
      `/your-ticket?price=${encodeURIComponent(price)}&time=${encodeURIComponent(
        time
      )}`
    );
  };

  return (
    <div className={styles.ticketCard}>
      <h2>{time}</h2>
      <p className={styles.redParagraph}>Ważność wygasła!</p>
      <p>MPK Kraków</p>
      <p>strefy I+II+III</p>
      <h3>{price} zł</h3>
      <button className={styles.activateButton} onClick={handleShowTicket}>
        Pokaż Bilet
      </button>
    </div>
  );
}
