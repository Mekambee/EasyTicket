import React, { useState } from "react";
import styles from "./OuterSiteStyle.module.css";
import { useLocation } from "wouter";

const getQueryParams = (queryString) => {
	const params = new URLSearchParams(queryString);
	return {
		price: params.get("price"),
		time: params.get("time"),
	};
};

export default function OuterSiteView() {
	const [, navigate] = useLocation();
	const [isPopupVisible, setPopupVisible] = useState(false);

	const { price, time } = getQueryParams(window.location.search);

	const handleConfirmClick = () => {
		setPopupVisible(true);
	};

	const handleActivateNow = () => {
		navigate(`/your-ticket?price=${encodeURIComponent(price)}&time=${encodeURIComponent(time)}`);
	};

	const handlePostpone = () => {
		navigate(`/my-tickets?price=${encodeURIComponent(price)}&time=${encodeURIComponent(time)}`);
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
						<h2 className={styles.popupTitle}>
							Transakcja przebiegła pomyślnie
						</h2>
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
		</div>
	);
}


