import React, { useState, useEffect } from "react";
import { navigate } from "wouter/use-hash-location";
import styles from "./MyTicketsStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
import ActiveTicketCardComponent from "../../Components/ActiveTicket/ActiveTicketCardComponent";
import { getHistoryState } from "../../util.ts";

export default function MyTicketsPage() {
	const [ownedTickets, setOwnedTickets] = useState([]);
	const [activeTickets, setActiveTickets] = useState([]);
	const { price, time } = getHistoryState();

	useEffect(() => {
		const savedOwnedTickets = JSON.parse(
			sessionStorage.getItem("ownedTickets")
		);
		const savedActiveTickets = JSON.parse(
			sessionStorage.getItem("activeTickets")
		);

		if (savedOwnedTickets) setOwnedTickets(savedOwnedTickets);
		if (savedActiveTickets) setActiveTickets(savedActiveTickets);
	}, []);

	useEffect(() => {
		if (price && time) {
			setOwnedTickets((prevTickets) => {
				const ticketExists = prevTickets.some(
					(ticket) => ticket.price === price && ticket.time === time
				);
				if (ticketExists) return prevTickets;
				const updatedTickets = [
					...prevTickets,
					{ id: Date.now(), price, time },
				];
				return updatedTickets;
			});
			navigate(".", { replace: true, state: {} });
		}
	}, [price, time]);

	const handleActivateTicket = (ticketId) => {
		setOwnedTickets((prevOwned) => {
			const ticketToActivate = prevOwned.find(
				(ticket) => ticket.id === ticketId
			);
			if (ticketToActivate) {
				setActiveTickets((prevActive) => [...prevActive, ticketToActivate]);
				return prevOwned.filter((ticket) => ticket.id !== ticketId);
			}
			return prevOwned;
		});
	};

	useEffect(() => {
		sessionStorage.setItem("ownedTickets", JSON.stringify(ownedTickets));
		sessionStorage.setItem("activeTickets", JSON.stringify(activeTickets));
	}, [ownedTickets, activeTickets]);

	return (
		<div className={styles.container}>
			<TopBarComponent />

			<div className={styles.section}>
				<h2 className={styles.sectionTitle}>Aktywne Bilety</h2>
				<div className={styles.ticketGrid}>
					{activeTickets.map((ticket) => (
						<ActiveTicketCardComponent
							key={ticket.id}
							price={ticket.price}
							time={ticket.time}
						/>
					))}
				</div>
			</div>

			<div className={styles.section}>
				<h2 className={styles.sectionTitle}>Posiadane Bilety</h2>
				<div className={styles.ticketGrid}>
					{ownedTickets.map((ticket) => (
						<ActiveTicketCardComponent
							key={ticket.id}
							price={ticket.price}
							time={ticket.time}
							onActivate={() => handleActivateTicket(ticket.id)}
						/>
					))}
				</div>
			</div>

			<div className={styles.section}>
				<h2 className={styles.sectionTitle}>Historia Biletów</h2>
				<div className={styles.ticketGrid}></div>
			</div>
		</div>
	);
}
