import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MyTicketsStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
import TicketCardComponent from "../../Components/TicketCard/TicketCardComponent";
import ActiveTicketCardComponent from "../../Components/ActiveTicket/ActiveTicketCardComponent";

export default function MyTicketsPage() {
	const [tickets, setTickets] = useState([]);
	const location = useLocation();
	const navigate = useNavigate();
	const { price, time } = location.state || {};

	const saveTicketsToSessionStorage = (tickets) => {
		sessionStorage.setItem("tickets", JSON.stringify(tickets));
	};

	useEffect(() => {
		const savedTickets = JSON.parse(sessionStorage.getItem("tickets"));
		if (savedTickets) {
			setTickets(savedTickets);
		}
	}, []);

	useEffect(() => {
		if (price && time) {
			setTickets((prevTickets) => {
				const ticketExists = prevTickets.some(
					(ticket) => ticket.price === price && ticket.time === time
				);
				if (ticketExists) return prevTickets;
				const updatedTickets = [
					...prevTickets,
					{ id: Date.now(), price, time },
				];
				saveTicketsToSessionStorage(updatedTickets);
				return updatedTickets;
			});
			navigate(".", { replace: true, state: {} });
		}
	}, [price, time, navigate]);

	return (
		<div className={styles.container}>
			<TopBarComponent />

			<div className={styles.section}>
				<h2 className={styles.sectionTitle}>Aktywne Bilety</h2>
				<div className={styles.ticketGrid}></div>
			</div>

			<div className={styles.section}>
				<h2 className={styles.sectionTitle}>Posiadane Bilety</h2>
				<div className={styles.ticketGrid}>
					{tickets.map((ticket) => (
						<ActiveTicketCardComponent
							key={ticket.id}
							price={ticket.price}
							time={ticket.time}
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
