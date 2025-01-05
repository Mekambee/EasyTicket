import React from "react";
import styles from "./TicketsFaqStyle.module.css";
import { useLocation } from "wouter";

export default function TicketsFaqView() {
  const handleReturnToBuyTicket = () => {
    navigate("/buy-ticket");
  };
  const [, navigate] = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>Operator Komunikacji Miejskiej</div>
      <div className={styles.content}>
        <p className={styles.infoText}>
          Ta strona nie jest częścią testu, ponieważ jest <br />
          zewnętrzną stroną niestanowiącą części systemu <br />
          <span className={styles.bold}>EasyTicket</span>.
        </p>
        <p className={styles.infoText}>
          Tutaj znajduje się dokładny opis dotyczący zasad ulg <br />
          w biletach komunikacji miejskiej MPK Kraków <br />
        </p>
        <button className={styles.confirmButton} onClick={handleReturnToBuyTicket}>
          Powrót do zakupu biletu
        </button>
      </div>
    </div>
  );
}
