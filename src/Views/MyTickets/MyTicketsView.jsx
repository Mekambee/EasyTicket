import React, { useState, useEffect } from "react";
import styles from "./MyTicketsStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
import ActiveTicketCardComponent from "../../Components/ActiveTicket/ActiveTicketCardComponent";
import ActivatedTicketCardComponent from "../../Components/ActivatedTicket/ActivatedTicketCardComponent";
import ExpiredTicketCardComponent from "../../Components/ExpiredTicket/ExpiredTicketCardComponent";

export default function MyTicketsPage() {
	const [ownedTickets, setOwnedTickets] = useState([]);
	const [activeTickets, setActiveTickets] = useState([]);
	const [expiredTickets, setExpiredTickets] = useState([]);

	const getQueryParams = () => {
		const params = new URLSearchParams(window.location.search);

		return {
			price: params.get("price"),
			time: params.get("time"),
			type: params.get("type"),
			id: params.get("id"),
		};
	};

	useEffect(() => {
		updateTicketsState();
	}, []);

	const updateTicketsState = () => {
		const savedOwnedTickets =
			JSON.parse(sessionStorage.getItem("ownedTickets")) || [];
		const savedActiveTickets =
			JSON.parse(sessionStorage.getItem("activeTickets")) || [];
		const savedExpiredTickets =
			JSON.parse(sessionStorage.getItem("expiredTickets")) || [];

		const uniqueOwnedTickets = [
			...new Map(savedOwnedTickets.map((item) => [item.id, item])).values(),
		];

		const updatedActiveTickets = savedActiveTickets.map((ticket) => ({
			...ticket,
			activatedAt: ticket.activatedAt || new Date().toISOString(),
		}));

		setOwnedTickets(uniqueOwnedTickets);
		setActiveTickets(updatedActiveTickets);
		setExpiredTickets(savedExpiredTickets);

		sessionStorage.setItem("ownedTickets", JSON.stringify(uniqueOwnedTickets));
		sessionStorage.setItem(
			"activeTickets",
			JSON.stringify(updatedActiveTickets)
		);
	};

	useEffect(() => {
		const { price, time, type, id } = getQueryParams();

		if (price && time) {
			const savedOwnedTickets =
				JSON.parse(sessionStorage.getItem("ownedTickets")) || [];

			const alreadyExists = savedOwnedTickets.some(
				(ticket) => ticket.id === parseInt(id)
			);

			if (!alreadyExists) {
				const newTicket = { id: parseInt(id), price, time, type };
				const updatedOwnedTickets = [...savedOwnedTickets, newTicket];

				sessionStorage.setItem(
					"ownedTickets",
					JSON.stringify(updatedOwnedTickets)
				);
				setOwnedTickets(updatedOwnedTickets);
			}
		}
	}, []);

	const handleActivateTicket = (ticketId) => {
		console.log("aktywoacja");
		setOwnedTickets((prevOwned) => {
			const ticketToActivate = prevOwned.find(
				(ticket) => ticket.id === ticketId
			);

			if (ticketToActivate) {
				const updatedOwned = prevOwned.filter(
					(ticket) => ticket.id !== ticketId
				);

				const updatedActive = [
					...activeTickets,
					{
						...ticketToActivate,
						activatedAt: new Date().toISOString(),
						isFrozen: ticketToActivate.isFrozen || false,
					},
				];
				console.log(updatedActive);

				sessionStorage.setItem("ownedTickets", JSON.stringify(updatedOwned));
				sessionStorage.setItem("activeTickets", JSON.stringify(updatedActive));

				setActiveTickets(updatedActive);
				return updatedOwned;
			}
			return prevOwned;
		});
	};

	const handleExpireTicket = (ticketId) => {
		setActiveTickets((prevActive) => {
			const ticketToExpire = prevActive.find(
				(ticket) => ticket.id === ticketId
			);

			if (ticketToExpire) {
				const updatedActive = prevActive.filter(
					(ticket) => ticket.id !== ticketId
				);
				const updatedExpired = [
					...expiredTickets,
					{
						...ticketToExpire,
						time: ticketToExpire.originalTime || ticketToExpire.time,
					},
				];

				sessionStorage.setItem("activeTickets", JSON.stringify(updatedActive));
				sessionStorage.setItem(
					"expiredTickets",
					JSON.stringify(updatedExpired)
				);

				setExpiredTickets(updatedExpired);

				return updatedActive;
			}

			return prevActive;
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
							id={ticket.id}
							price={ticket.price}
							time={ticket.time}
							type={ticket.type}
							activatedAt={ticket.activatedAt}
							isFrozen={ticket.isFrozen}
							onExpire={handleExpireTicket}
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
							type={ticket.type}
							onActivate={() => handleActivateTicket(ticket.id)}
							id={ticket.id}
						/>
					))}
				</div>
			</div>

			<div className={styles.section}>
				<h2 className={styles.sectionTitle}>Historia Biletów</h2>
				<div className={styles.ticketGrid}>
					{expiredTickets.map((ticket) => (
						<ExpiredTicketCardComponent
							key={ticket.id}
							price={ticket.price}
							time={ticket.time}
							type={ticket.type}
							id={ticket.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
