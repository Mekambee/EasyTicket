import React, { useState } from "react";
import styles from "./OuterSiteStyle.module.css";
import { useLocation } from "wouter";

const getQueryParams = (queryString) => {
  const params = new URLSearchParams(queryString);
  return {
    price: params.get("price"),
    time: params.get("time"),
    type: params.get("type"),
  };
};

export default function OuterSiteView() {
  const [, navigate] = useLocation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isVehiclePopupVisible, setVehiclePopupVisible] = useState(false);

  const { price, time, type } = getQueryParams(window.location.search);

  const ticketID = Date.now();

  const saveToSessionStorage = (ticket) => {
    const savedTickets = JSON.parse(sessionStorage.getItem("activeTickets")) || [];
    sessionStorage.setItem("activeTickets", JSON.stringify([...savedTickets, ticket]));
  };

  const handleConfirmClick = () => {
    setPopupVisible(true);
  };

  const handleActivateNow = () => {
    setPopupVisible(false);
    setVehiclePopupVisible(true);
  };
  const handleVehicleSubmit = () => {
    const newTicket = {
      // id: Date.now(),
      id: ticketID,
      price,
      time,
      type,
      vehicleIdentifier: "HG924",
      activatedAt: new Date().toISOString(), 
    };
    saveToSessionStorage(newTicket);
    navigate(`/your-ticket?price=${encodeURIComponent(price)}&time=${encodeURIComponent(time)}&type=${encodeURIComponent(type)}&id=${newTicket.id}`);
  };
  
  const handlePostpone = () => {
    navigate(`/my-tickets?price=${encodeURIComponent(price)}&time=${encodeURIComponent(time)}&type=${encodeURIComponent(type)}&id=${ticketID}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>Twój Bank</div>
      <div className={styles.content}>
        <p className={styles.infoText}>
          Ta strona nie jest częścią testu, ponieważ jest <br />
          zewnętrzną stroną niestanowiącą części systemu <br />
          <span className={styles.bold}>EasyTicket</span>.
        </p>
        <button className={styles.confirmButton} onClick={handleConfirmClick}>
          Potwierdź Płatność
        </button>
      </div>

      {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2 className={styles.popupTitle}>Transakcja przebiegła pomyślnie</h2>
            <p className={styles.popupText}>
              Wybierz, co chcesz zrobić z zakupionym biletem
            </p>
            <div className={styles.popupGrid}>
              <button onClick={handleActivateNow}>Aktywuj teraz</button>
              <button onClick={handlePostpone}>Odłóż na później</button>
            </div>
          </div>
        </div>
      )}

      {isVehiclePopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2 className={styles.popupTitle}>Aktywacja biletu</h2>
            <p className={styles.popupText}>
              Wpisz identyfikator pojazdu znajdujący się nad kasownikami i przy drzwiach.
            </p>
            <input
              className={styles.vehicleInput}
              type="text"
              value="HG924"
              readOnly
            />
            <div className={styles.popupGrid}>
              <button onClick={() => setVehiclePopupVisible(false)}>Anuluj</button>
              <button onClick={handleVehicleSubmit}>Aktywuj</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}