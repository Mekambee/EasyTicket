import React, { useState } from "react";
import styles from "./TicketCardStyle.module.css";
import { useLocation } from "wouter";

export default function TicketCardComponent({ price, time, type }) {
	const [isTicketBuyPopUpVisible, setTicketBuyPopUpVisible] = useState(false);
	const [, navigate] = useLocation();


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
			<h4>{type}</h4>
			<p>MPK Kraków</p>
			<p>strefy I+II+III</p>
			<h3>{price} zł</h3>
			<button className={styles.buyButton} onClick={handleBuyClick}>
				Kup Bilet
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
						<h2>Wybierz metodę płatności</h2>
						<div className={styles.popupGrid}>
							<button onClick={handleOptionClick}>Karta kredytowa</button>
							<button onClick={handleOptionClick}>BLIK</button>
							<button onClick={handleOptionClick}>Revolut</button>
							<button onClick={handleOptionClick}>PayPal</button>
						</div>
						<button className={styles.closeButton} onClick={handleClosePopup}>
							Powrót
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
