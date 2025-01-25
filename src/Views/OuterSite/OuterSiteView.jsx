import React, { useState } from "react";
import styles from "./OuterSiteStyle.module.css";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

const getQueryParams = (queryString) => {
  const params = new URLSearchParams(queryString);
  return {
    price: params.get("price"),
    time: params.get("time"),
    type: params.get("type"),
  };
};

export default function OuterSiteView() {
  const {t} = useTranslation();
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
      <div className={styles.topBar}>{t("your-bank")}</div>
      <div className={styles.content}>
        <p className={styles.infoText}>
          {t("this-site-is-not")} <br />
          {t("the-part-of-the-system")} <br />
          <span className={styles.bold}>EasyTicket</span>.
        </p>
        <button className={styles.confirmButton} onClick={handleConfirmClick}>
          {t("confirm-payment")}
        </button>
      </div>

      {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2 className={styles.popupTitle}>{t("transaction-successful")}</h2>
            <p className={styles.popupText}>
              {t("choose-action")}
            </p>
            <div className={styles.popupGrid}>
              <button onClick={handleActivateNow}>{t("activate-now")}</button>
              <button onClick={handlePostpone}>{t("postpone-ticket")}</button>
            </div>
          </div>
        </div>
      )}

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