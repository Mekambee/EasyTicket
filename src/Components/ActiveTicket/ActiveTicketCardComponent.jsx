import React from "react";
import styles from "./ActiveTicketCardStyle.module.css";

export default function ActiveTicketCardComponent({ price, time, onActivate }) {
	return (
		<div className={styles.ticketCard}>
			<h2>{time}</h2>
			<p>MPK Kraków</p>
			<p>strefy I+II+III</p>
			<h3>{price} zł</h3>
			<button className={styles.activateButton} onClick={onActivate}>
				Aktywuj Bilet
			</button>
		</div>
	);
}
