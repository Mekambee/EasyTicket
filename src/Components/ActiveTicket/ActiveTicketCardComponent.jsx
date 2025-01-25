import React, { useState } from "react";
import styles from "./ActiveTicketCardStyle.module.css";
import { useTranslation } from "react-i18next";

export default function ActiveTicketCardComponent({ price, time, type, onActivate, id }) {
  const [isVehiclePopupVisible, setVehiclePopupVisible] = useState(false);

  const handleActivateClick = () => {
    setVehiclePopupVisible(true);
  };

  const handleVehicleSubmit = () => {
    setVehiclePopupVisible(false);
    onActivate();
  };

  const { t } = useTranslation();

  return (
    <div className={styles.ticketCard}>
      <h2>{time}</h2>
      <h4>{type === "Normalny" ? t("normal-ticket") : t("reduced-ticket")}</h4>
      <p>MPK Kraków</p>
      <p>{t("zones")} I+II+III</p>
      <h3>{price} zł</h3>
      <button className={styles.activateButton} onClick={handleActivateClick}>
        {t("activate-ticket")}
      </button>

      {isVehiclePopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2 className={styles.popupTitle}>{t("ticket-activation")}</h2>
            <p className={styles.popupText}>
              {t("enter-vehicle-number")}
            </p>
            <input
              className={styles.vehicleInput}
              type="text"
              value="HG924"
              readOnly
            />
            <div className={styles.popupGrid}>
              <button onClick={() => setVehiclePopupVisible(false)}>{t("cancel")}</button>
              <button onClick={handleVehicleSubmit}>{t("activate")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
