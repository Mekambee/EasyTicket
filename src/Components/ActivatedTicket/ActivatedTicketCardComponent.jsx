import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import styles from "./ActivatedTicketCardStyle.module.css";

export default function ActivatedTicketCardComponent({
	id,
	price,
	time,
	type,
	activatedAt,
	isFrozen,
	onExpire,
}) {
	const [, navigate] = useLocation();
	const [remainingTime, setRemainingTime] = useState(() => {
		const now = Math.floor(Date.now() / 1000);
		const activationTime = Math.floor(new Date(activatedAt).getTime() / 1000);
		const totalTime = parseInt(time);

		if (isFrozen) {
			return freezedTicketTimeParser(time, activationTime, now);
		} else if (price > 90) {
			return Math.max(totalTime * 60 - (now - activationTime), 0);
		} else {
			return Math.max(totalTime - (now - activationTime), 0);
		}
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
		if (isFrozen) {
			console.log("zamrozon");
			navigate(
				`/your-ticket?price=${encodeURIComponent(
					price
				)}&time=${encodeURIComponent(time)}&type=${encodeURIComponent(
					type
				)}&id=${id}&isFrozen=${isFrozen}`
			);
		} else {
			navigate(
				`/your-ticket?price=${encodeURIComponent(
					price
				)}&time=${encodeURIComponent(time)}&type=${encodeURIComponent(
					type
				)}&id=${id}`
			);
		}
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}m ${remainingSeconds}s`;
	};

	return (
		<div className={styles.ticketCard}>
			<h2>{formatTime(remainingTime)}</h2>
			<h4>{type}</h4>
			<p>MPK Kraków</p>
			<p>strefy I+II+III</p>
			<h3>{price} zł</h3>
			<button className={styles.activateButton} onClick={handleShowTicket}>
				Pokaż Bilet
			</button>
		</div>
	);
}

function freezedTicketTimeParser(timeString, activationTime, now) {
  
	const regex = /^(\d+)\s*min\s*(\d+)\s*s$/;
	const match = timeString.match(regex);

	if (!match) {
		throw new Error("Invalid time format. Expected format: 'X min Y s'");
	}

	const minutes = parseInt(match[1], 10); 
	const seconds = parseInt(match[2], 10); 

	return Math.max(minutes * 60 + seconds - (now - activationTime), 0);
}
