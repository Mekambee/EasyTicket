import React, { useState, useEffect } from "react";
import styles from "./YourTicketStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
import { useLocation } from "wouter";
import { jsPDF } from "jspdf";
import qr_code_icon from "../../assets/qr_code.svg";

const getQueryParams = (queryString) => {
	const params = new URLSearchParams(queryString);
	return {
		price: params.get("price"),
		time: params.get("time"),
		type: params.get("type"),
	};
};
export default function YourTicketView() {
	const { price, time, type } = getQueryParams(window.location.search);
	const [, navigate] = useLocation();

	const [remainingTime, setRemainingTime] = useState(() => {
		const activeTickets =
			JSON.parse(sessionStorage.getItem("activeTickets")) || [];
		const ticket = activeTickets.find(
			(t) => t.price === price && t.time === time
		);

		if (ticket) {
			const now = Math.floor(Date.now() / 1000);
			const activationTime = Math.floor(
				new Date(ticket.activatedAt).getTime() / 1000
			);
			const totalTime = parseInt(ticket.time);
			return Math.max(totalTime - (now - activationTime), 0);
		}

		return 0;
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingTime((prev) => Math.max(prev - 1, 0));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}m ${remainingSeconds}s`;
	};

	const handleBuyAgain = () => {
		navigate(
			`/outer-site?price=${encodeURIComponent(price)}&time=${encodeURIComponent(
				time
			)}&type=${encodeURIComponent(type)}`
		);
	};

	const generatePDF = () => {
		const doc = new jsPDF();

		doc.setFont("Arial", "bold");

		doc.setFillColor(220, 220, 220);
		doc.rect(0, 0, 210, 297, "F");

		doc.setFillColor(0, 51, 153);
		doc.rect(0, 0, 210, 20, "F");
		doc.setTextColor(255, 255, 255);
		doc.setFontSize(18);
		doc.text("EasyTicket", 105, 13, { align: "center" });

		doc.setTextColor(0, 0, 0);
		doc.setFontSize(16);
		doc.text("Potwierdzenie Zakupu Biletu", 105, 40, { align: "center" });

		doc.setFontSize(14);
		const ticketDetails = [
			`Cena biletu: ${price} zl`,
			`Czas waznosci: ${time}`,
			`Typ biletu: ${type}`,
			"Przewoznik: MPK Kraków",
			"Strefy: I + II + III",
		];

		let yOffset = 60;
		ticketDetails.forEach((line) => {
			doc.text(line, 10, yOffset);
			yOffset += 10;
		});

		const currentDate = new Date().toLocaleString("pl-PL");
		doc.text(`Data wygenerowania potwierdzenia: ${currentDate}`, 105, 125, {
			align: "center",
		});

		doc.text("Dziekujemy za skorzystanie z naszych uslug!", 105, 140 , { align: "center" });

		doc.save("Potwierdzenie-Zakupu-Biletu.pdf");
	};

	return (
		<div>
			<TopBarComponent />
			<div className={styles.ticketContent}>
				<div className={styles.leftSection}>
					<div className={styles.qrCodePlaceholder}>
						<img
							className={styles.buttonImg}
							src={qr_code_icon}
							alt="QR code Icon"
						/>
					</div>
					<div className={styles.ticketInfo}>
						<p>Pozostały czas:</p>
						<p>{formatTime(remainingTime)}</p>
						<p>Identyfikator pojazdu:</p>
						<p>HG924</p>
					</div>
				</div>

				<div className={styles.rightSection}>
					<h2>{time}</h2>
					<h2>{type}</h2>
					<p>MPK Kraków</p>
					<p>strefy I+II+III</p>
					<h3>Cena: {price} zł</h3>
					<div className={styles.buttons}>
						<button className={styles.buyAgainButton} onClick={handleBuyAgain}>
							Kup Ponownie
						</button>
						<button className={styles.invoiceButton} onClick={generatePDF}>
							Pobierz Fakturę
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
