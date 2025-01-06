import React, { useState } from "react";
import styles from "./ActiveTicketCardStyle.module.css";

export default function ActiveTicketCardComponent({ price, time, type, onActivate, id }) {
  const [isVehiclePopupVisible, setVehiclePopupVisible] = useState(false);

  const handleActivateClick = () => {
    setVehiclePopupVisible(true);
  };

  const handleVehicleSubmit = () => {
    setVehiclePopupVisible(false);
    onActivate();
  };

  return (
    <div className={styles.ticketCard}>
      <h2>{time}</h2>
      <h4>{type}</h4>
      <p>MPK Kraków</p>
      <p>strefy I+II+III</p>
      <h3>{price} zł</h3>
      <button className={styles.activateButton} onClick={handleActivateClick}>
        Aktywuj Bilet
      </button>

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
