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
		<div className={styles.container}>
			<TopBarComponent />
			<div className={styles.ticketInfo}>
				<h1>Twój Bilet</h1>
				{price && time ? (
					<>
						<p>Cena: {price} zł</p>
						<p>Czas: {time}</p>
					</>
				) : (
					<p>Nie znaleziono danych biletu.</p>
				)}
			</div>
		</div>
	);
}
