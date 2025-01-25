import React, { useState } from "react";
import styles from "./TicketCardStyle.module.css";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

export default function TicketCardComponent({ price, time, type }) {
	const [isTicketBuyPopUpVisible, setTicketBuyPopUpVisible] = useState(false);
	const [, navigate] = useLocation();

	const { t } = useTranslation();


	const handleBuyClick = () => {
		setTicketBuyPopUpVisible(true);
	};
	const handleClosePopup = () => {
		setTicketBuyPopUpVisible(false);
	};
	const handleOptionClick = () => {
		setTicketBuyPopUpVisible(false);
		navigate(`/outer-site?price=${encodeURIComponent(price)}&time=${encodeURIComponent(time)}&type=${encodeURIComponent(type)}`);
	};

	return (
		<div className={styles.ticketCard}>
			<h2>{time}</h2>
			<h4>{type === "Normalny" ? t("normal-ticket") : t("reduced-ticket")}</h4>
			<p>MPK Kraków</p>
			<p>{t("zones")} I+II+III</p>
			<h3>{price} zł</h3>
			<button className={styles.buyButton} onClick={handleBuyClick}>
				{t("buy-ticket")}
			</button>

			{isTicketBuyPopUpVisible && (
				<div
					className={styles.popup}
					onClick={(e) => {
						if (e.target.classList.contains(styles.popup)) {
							setTicketBuyPopUpVisible(false);
						}
					}}
				>
					<div className={styles.popupContent}>
						<h2>{t("payment-method")}</h2>
						<div className={styles.popupGrid}>
							<button onClick={handleOptionClick}>{t("credit-card")}</button>
							<button onClick={handleOptionClick}>BLIK</button>
							<button onClick={handleOptionClick}>Revolut</button>
							<button onClick={handleOptionClick}>PayPal</button>
						</div>
						<button className={styles.closeButton} onClick={handleClosePopup}>
							{t("go-back")}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
