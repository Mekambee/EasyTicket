import React from "react";
import styles from "./TicketsFaqStyle.module.css";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

export default function TicketsFaqView() {
  const { t } = useTranslation();
  const handleReturnToBuyTicket = () => {
    navigate("/buy-ticket");
  };
  const [, navigate] = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>{t("operator")}</div>
      <div className={styles.content}>
        <p className={styles.infoText}>
          {t("this-site-is-not")} <br />
          {t("the-part-of-the-system")} <br />
          <span className={styles.bold}>EasyTicket</span>.
        </p>
        <p className={styles.infoText}>
          {t("here-is-desc")} <br />
          {t("in-tickets")} <br />
        </p>
        <button className={styles.confirmButton} onClick={handleReturnToBuyTicket}>
          {t("go-back-to-buy-ticket")}
        </button>
      </div>
    </div>
  );
}
