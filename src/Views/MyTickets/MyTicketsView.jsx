import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import styles from "./MyTicketsStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
import ActiveTicketCardComponent from "../../Components/ActiveTicket/ActiveTicketCardComponent";
import ActivatedTicketCardComponent from "../../Components/ActivatedTicket/ActivatedTicketCardComponent";

export default function MyTicketsPage() {
	const [ownedTickets, setOwnedTickets] = useState([]);
	const [activeTickets, setActiveTickets] = useState([]);
	const [, navigate] = useLocation();

	const getQueryParams = () => {
		const queryString = window.location.href.split("?")[1]?.split("#")[0] || "";
		const params = new URLSearchParams(queryString);
		return {
			price: params.get("price"),
			time: params.get("time"),
		};
	};

	useEffect(() => {
		const savedOwnedTickets =
			JSON.parse(sessionStorage.getItem("ownedTickets")) || [];
		const savedActiveTickets =
			JSON.parse(sessionStorage.getItem("activeTickets")) || [];

		setOwnedTickets(savedOwnedTickets);
		setActiveTickets(savedActiveTickets);
	}, []);

	useEffect(() => {
		const { price, time } = getQueryParams();

		if (price && time) {
			const newTicket = { id: Date.now(), price, time };
			setOwnedTickets((prev) => {
				const updated = [...prev, newTicket];
				sessionStorage.setItem("ownedTickets", JSON.stringify(updated));
				return updated;
			});
			navigate("/my-tickets", { replace: true });
		}
	}, [navigate]);

	const handleActivateTicket = (ticketId) => {
		setOwnedTickets((prevOwned) => {
			const ticketToActivate = prevOwned.find(
				(ticket) => ticket.id === ticketId
			);
			if (ticketToActivate) {
				const updatedOwned = prevOwned.filter(
					(ticket) => ticket.id !== ticketId
				);
				const updatedActive = [...activeTickets, ticketToActivate];

				sessionStorage.setItem("ownedTickets", JSON.stringify(updatedOwned));
				sessionStorage.setItem("activeTickets", JSON.stringify(updatedActive));

				setActiveTickets(updatedActive);
				return updatedOwned;
			}
			return prevOwned;
		});
	};

	return (
		<div className={styles.container}>
			<TopBarComponent />

			<div className={styles.section}>
				<h2 className={styles.sectionTitle}>Aktywne Bilety</h2>
				<div className={styles.ticketGrid}>
					{activeTickets.map((ticket) => (
						<ActivatedTicketCardComponent
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
