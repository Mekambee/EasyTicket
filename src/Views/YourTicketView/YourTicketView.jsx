import React, { useState, useEffect } from "react";
import styles from "./YourTicketStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
import { useLocation } from "wouter";
import { jsPDF } from "jspdf";
import qr_code_icon from "../../assets/qr_code.svg";

const getQueryParams = (queryString) => {
  const params = new URLSearchParams(queryString);
  return {
    price: params.get("price"),
    time: params.get("time"),
	type: params.get("type"),
  };
};
export default function YourTicketView() {
  const { price, time, type } = getQueryParams(window.location.search);
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
    navigate(`/outer-site?price=${encodeURIComponent(price)}&time=${encodeURIComponent(time)}&type=${encodeURIComponent(type)}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Potwierdzenie Zakupu Biletu", 20, 20);

    doc.setFontSize(12);
    doc.text(`Cena biletu: ${price} zl`, 20, 40);
    doc.text(`Czas waznosci: ${time}`, 20, 50);
    doc.text(`Typ biletu: ${type}`, 20, 50);

    doc.text("Przewoznik: MPK Krakow", 20, 80);
    doc.text("Strefy: I + II + III", 20, 90);

    const currentDate = new Date().toLocaleString();
    doc.text(`Data wygenerowania: ${currentDate}`, 20, 110);

    doc.save("Potwierdzenie-Zakupu-Biletu.pdf");
  };

  return (
    <div>
      <TopBarComponent />
      <div className={styles.ticketContent}>
        <div className={styles.leftSection}>
          <div className={styles.qrCodePlaceholder}>
			<img
				className={styles.buttonImg}
				src={qr_code_icon}
				alt="QR code Icon"
			/>
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
          <h2>{type}</h2>
          <p>MPK Kraków</p>
          <p>strefy I+II+III</p>
          <h3>Cena: {price} zł</h3>
          <div className={styles.buttons}>
            <button className={styles.buyAgainButton} onClick={handleBuyAgain}>
              Kup Ponownie
            </button>
            <button className={styles.invoiceButton} onClick={generatePDF}>Pobierz Fakturę</button>
          </div>
        </div>
      </div>
    </div>
  );
}
