import React, { useState, useEffect } from "react";
import styles from "./YourTicketStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
import { useLocation } from "wouter";

const getQueryParams = (queryString) => {
  const params = new URLSearchParams(queryString);
  return {
    price: params.get("price"),
    time: params.get("time"),
  };
};

export default function YourTicketView() {
  const { price, time } = getQueryParams(window.location.search);
  const [, navigate] = useLocation();

  const [remainingTime, setRemainingTime] = useState(() => {
    const activeTickets = JSON.parse(sessionStorage.getItem("activeTickets")) || [];
    const ticket = activeTickets.find((t) => t.price === price && t.time === time);

    if (ticket) {
      const now = Math.floor(Date.now() / 1000);
      const activationTime = Math.floor(new Date(ticket.activatedAt).getTime() / 1000);
      const totalTime = parseInt(ticket.time);
      return Math.max(totalTime - (now - activationTime), 0);
    }

    return 0; 
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const handleBuyAgain = () => {
    navigate(`/outer-site?price=${encodeURIComponent(price)}&time=${encodeURIComponent(time)}`);
  };

  return (
    <div>
      <TopBarComponent />
      <div className={styles.ticketContent}>
        <div className={styles.leftSection}>
          <div className={styles.qrCodePlaceholder}>
            <p>QR Code</p>
          </div>
          <div className={styles.ticketInfo}>
            <p>Pozostały czas:</p>
            <p>{formatTime(remainingTime)}</p>
            <p>Identyfikator pojazdu:</p>
            <p>HG924</p>
          </div>
        </div>

        <div className={styles.rightSection}>
          <h2>{time}</h2>
          <p>Ulgowy</p>
          <p>MPK Kraków</p>
          <p>strefy I+II+III</p>
          <h3>Cena: {price} zł</h3>
          <div className={styles.buttons}>
            <button className={styles.buyAgainButton} onClick={handleBuyAgain}>
              Kup Ponownie
            </button>
            <button className={styles.invoiceButton}>Pobierz Fakturę</button>
          </div>
        </div>
      </div>
    </div>
  );
}
