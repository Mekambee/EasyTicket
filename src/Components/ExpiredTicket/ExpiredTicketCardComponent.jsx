import React from "react";
import { useLocation } from "wouter";
import styles from "./ExpiredTicketCardStyle.module.css";
import { useTranslation } from "react-i18next";

export default function ExpiredTicketCardComponent({ price, time, type, id }) {
  const [, navigate] = useLocation();

  const { t } = useTranslation();

  const handleShowTicket = () => {
    navigate(
      `/your-ticket?price=${encodeURIComponent(price)}&time=${encodeURIComponent(
        time
      )}&type=${encodeURIComponent(type)}&id=${id}`
    );
  };

  return (
    <div className={styles.ticketCard}>
      <h2>{time}</h2>
      <h4>{type === "Normalny" ? t("normal-ticket") : t("reduced-ticket")}</h4>
      <p className={styles.redParagraph}>{t("ticket-expired")}</p>
      <p>MPK Kraków</p>
      <p>{t("zones")} I+II+III</p>
      <h3>{price} zł</h3>
      <button className={styles.activateButton} onClick={handleShowTicket}>
        {t("show-ticket")}
      </button>
    </div>
  );
}
