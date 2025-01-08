import React, { useState, useEffect } from "react";
import styles from "./YourTicketStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
import { useLocation } from "wouter";
import { jsPDF } from "jspdf";
import qr_code_icon from "../../assets/qr_code.svg";

const getQueryParams = (queryString) => {
	const params = new URLSearchParams(queryString);
	return {
		id: params.get("id"),
		price: params.get("price"),
		time: params.get("time"),
		type: params.get("type"),
		isFrozen: params.get("isFrozen"),
	};
};

export default function YourTicketView() {
	const { id, price, time, type, isFrozen } = getQueryParams(
		window.location.search
	);
	const [isPopupVisible, setPopupVisible] = useState(false);
	const [, navigate] = useLocation();
	const [originalTime] = useState(() => {
		const activeTickets =
			JSON.parse(sessionStorage.getItem("activeTickets")) || [];
		const ticket = activeTickets.find((t) => t.id === parseInt(id));
		if (ticket) {
			return ticket.originalTime || time;
		}
		return time;
	});

	const calculateInitialTime = () => {
		const activeTickets =
			JSON.parse(sessionStorage.getItem("activeTickets")) || [];
		const ticket = activeTickets.find((t) => t.id === parseInt(id));
		if (ticket) {
			const now = Math.floor(Date.now() / 1000);
			const activationTime = Math.floor(
				new Date(ticket.activatedAt).getTime() / 1000
			);
			const totalTime = isFrozen ? ticket.time : parseInt(time);
			console.log("blaza");
			console.log(ticket);

			if (isFrozen) {
				return freezedTicketTimeParser(ticket.time, activationTime, now);
			} else if (price > 90) {
				return Math.max(totalTime * 60 - (now - activationTime), 0);
			} else {
				return Math.max(totalTime - (now - activationTime), 0);
			}
		}

		return 0;
	};

	const [remainingTime, setRemainingTime] = useState(calculateInitialTime);

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
		if (isFrozen) {
			navigate(
				`/outer-site?price=${encodeURIComponent(
					price
				)}&time=${encodeURIComponent(originalTime)}&type=${encodeURIComponent(
					type
				)}`
			);
		} else {
			navigate(
				`/outer-site?price=${encodeURIComponent(
					price
				)}&time=${encodeURIComponent(time)}&type=${encodeURIComponent(type)}`
			);
		}
	};
	const handleFreezeTicket = () => {
		const activeTickets =
			JSON.parse(sessionStorage.getItem("activeTickets")) || [];
		const ownedTickets =
			JSON.parse(sessionStorage.getItem("ownedTickets")) || [];
		const ticket = activeTickets.find((t) => t.id === parseInt(id));

		if (ticket) {
			if (ticket.isFrozen) {
				// alert("Ten bilet został już zamrożony.");
				setPopupVisible(true);
				return;
			}

			const updatedActiveTickets = activeTickets.filter(
				(t) => t.id !== parseInt(id)
			);

			const updatedOwnedTickets = [
				...ownedTickets,
				{
					...ticket,
					time: `${Math.floor(remainingTime / 60)} min ${remainingTime % 60} s`,
					remainingSeconds: remainingTime,
					isFrozen: true,
					originalTime: ticket.originalTime || time,
					isInMinutes: price > 90,
				},
			];

			sessionStorage.setItem(
				"activeTickets",
				JSON.stringify(updatedActiveTickets)
			);
			sessionStorage.setItem(
				"ownedTickets",
				JSON.stringify(updatedOwnedTickets)
			);

			navigate("/my-tickets");
		}
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
			`Cena biletu: ${price} zł`,
			`Czas ważności: ${isFrozen ? originalTime : time}`,
			`Typ biletu: ${type}`,
			"Przewoźnik: MPK Kraków",
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

		doc.text("Dziękujemy za skorzystanie z naszych usług!", 105, 140, {
			align: "center",
		});

		doc.save("Potwierdzenie-Zakupu-Biletu.pdf");
	};

	return (
		<div>
			<TopBarComponent />
			<div className={styles.ticketContent}>
				<div className={styles.leftSection}>
					<p
						className={`${
							isFrozen ? styles.redParagraphSmaller : styles.greenParagraphSmaller
						}`}
					>
						{(remainingTime > 5 && price > 90)
							? isFrozen
								? "Liczba dostępnych zamrożeń : 0"
								: "Liczba dostępnych zamrożeń : 1"
							: ""}
					</p>
					<div className={styles.qrCodePlaceholder}>
						<img
							className={styles.buttonImg}
							src={qr_code_icon}
							alt="QR code Icon"
						/>
					</div>
					<div className={styles.ticketInfo}>
						<p className={styles.paragraph}>Pozostały czas:</p>
						<p className={styles.redParagraph}>
							{remainingTime === 0 ? "Nieaktywny" : formatTime(remainingTime)}
						</p>
						<p className={styles.paragraph}>Identyfikator pojazdu:</p>
						<p className={`${styles.paragraph} ${styles.bolded}`}>HG924</p>
					</div>
				</div>

				<div className={styles.rightSection}>
					<p
						className={`${styles.paragraph} ${styles.bolded} ${styles.enlarge}`}
					>
						{originalTime}
					</p>
					<p className={`${styles.paragraph} ${styles.bolded}`}>{type}</p>
					<p className={styles.paragraph}>MPK Kraków</p>
					<p className={styles.paragraph}>strefy I+II+III</p>
					<p
						className={`${styles.paragraph} ${styles.bolded} ${styles.enlarge}`}
					>
						Cena: {price} zł
					</p>
					<div className={styles.buttons}>
						<button
							className={styles.yourTicketButton}
							onClick={handleBuyAgain}
						>
							Kup Ponownie
						</button>
						<button className={styles.yourTicketButton} onClick={generatePDF}>
							Pobierz Fakturę
						</button>
						{price > 90 && remainingTime > 5 && (
							<button
								className={styles.yourTicketButton}
								onClick={handleFreezeTicket}
							>
								Zamróź Bilet
							</button>
						)}
					</div>
				</div>
			</div>

				  {isPopupVisible && (
					<div className={styles.popup}>
					  <div className={styles.popupContent}>
						<h2 className={styles.popupTitle}>Ostrzeżenie</h2>
						<p className={styles.popupText}>
						  Nie możesz zamrozić biletu więcej niż jeden raz.
						</p>
						<div className={styles.popupGrid}>
						  <button onClick={() => setPopupVisible(false)}>Powrót</button>
						</div>
					  </div>
					</div>
				  )}
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
