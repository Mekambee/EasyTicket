import React from "react";
import styles from "./YourTicketStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";

const getQueryParams = (queryString) => {
	const params = new URLSearchParams(queryString);
	return {
		price: params.get("price"),
		time: params.get("time"),
	};
};

export default function YourTicketView() {
	const { price, time } = getQueryParams(window.location.search);

	return (
		<div>
			<TopBarComponent />
			<div className={styles.ticketContent}>
				<div className={styles.leftSection}>
					<div className={styles.qrCodePlaceholder}>
						<p>QR Code</p>
					</div>
					<div className={styles.ticketInfo}>
						<p>Aktywny od:</p>
						<p>2024-11-26 15:01:23</p>
						<p>Aktywny do:</p>
						<p>2024-11-26 15:21:23</p>
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
						<button className={styles.buyAgainButton}>Kup Ponownie</button>
						<button className={styles.invoiceButton}>Pobierz Fakturę</button>
					</div>
				</div>
			</div>
		</div>
	);
}
