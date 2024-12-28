import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import styles from "./ActivatedTicketCardStyle.module.css";

export default function ActivatedTicketCardComponent({
	id,
	price,
	time,
	activatedAt,
	onExpire,
}) {
	const [, navigate] = useLocation();
	const [remainingTime, setRemainingTime] = useState(() => {
		const now = Math.floor(Date.now() / 1000);
		const activationTime = Math.floor(new Date(activatedAt).getTime() / 1000);
		const totalTime = parseInt(time);
		return Math.max(totalTime - (now - activationTime), 0);
	});

	useEffect(() => {
		if (remainingTime <= 0) {
			onExpire(id);
			return;
		}

		const interval = setInterval(() => {
			setRemainingTime((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [remainingTime, id, onExpire]);

	const handleShowTicket = () => {
		navigate(
			`/your-ticket?price=${encodeURIComponent(
				price
			)}&time=${encodeURIComponent(time)}`
		);
	};

	return (
		<div className={styles.ticketCard}>
			<h2>{remainingTime} s</h2>
			<p>MPK Kraków</p>
			<p>strefy I+II+III</p>
			<h3>{price} zł</h3>
			<button className={styles.activateButton} onClick={handleShowTicket}>
				Pokaż Bilet
			</button>
		</div>
	);
}
