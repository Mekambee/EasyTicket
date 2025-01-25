import React, { useState, useEffect } from "react";
import styles from "./YourTicketStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
import { useLocation } from "wouter";
import { jsPDF } from "jspdf";
import qr_code_icon from "../../assets/qr_code.svg";
import Roboto from "../../assets/fonts/Roboto-Regular.ttf";
import { useTranslation } from "react-i18next";

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
	const {t} = useTranslation();
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

	const generatePDF = async () => {
		const doc = new jsPDF();

		try {
			const response = await fetch(Roboto);
			const fontBuffer = await response.arrayBuffer();

			const fontBase64 = arrayBufferToBase64(fontBuffer);

			doc.addFileToVFS("Roboto-Regular.ttf", fontBase64);
			doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
			doc.setFont("Roboto", "normal");

			doc.setFillColor(220, 220, 220);
			doc.rect(0, 0, 210, 297, "F");

			doc.setFillColor(0, 51, 153);
			doc.rect(0, 0, 210, 20, "F");
			doc.setTextColor(255, 255, 255);
			doc.setFontSize(18);
			doc.text("EasyTicket", 105, 13, { align: "center" });

			doc.setTextColor(0, 0, 0);
			doc.setFontSize(16);
			doc.text(t("ticket-payment-confirmation-pdf"), 105, 40, { align: "center" });

			doc.setFontSize(14);
			const ticketDetails = [
				`${t("ticket-price-pdf")} ${price} zł`,
				`${t("ticket-time-pdf")} ${isFrozen ? originalTime : time}`,
				`${t("ticket-type-pdf")} ${type === "Normalny" ? t("normal-ticket") : t("reduced-ticket")}`,
				`${t("carrier-pdf")} MPK Kraków`,
				`${t("zones")}: I + II + III`,
			];

			let yOffset = 60;
			ticketDetails.forEach((line) => {
				doc.text(line, 10, yOffset);
				yOffset += 10;
			});

			const currentDate = new Date().toLocaleString("pl-PL");
			doc.text(`${t("confirmation-date")} ${currentDate}`, 105, 125, {
				align: "center",
			});

			doc.text(t("thank-you"), 105, 140, {
				align: "center",
			});

			doc.save(t("file-name"));
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div>
			<TopBarComponent />
			<div className={styles.ticketContent}>
				<div className={styles.leftSection}>
					<p
						className={`${
							isFrozen
								? styles.redParagraphSmaller
								: styles.greenParagraphSmaller
						}`}
					>
						{remainingTime > 5 && price > 90
							? isFrozen
								? <p>{t("remaining-freezes-0")}</p>
								: <p>{t("remaining-freezes-1")}</p>
							: ""}
					</p>
					<div className={styles.qrCodePlaceholder}>
						{remainingTime > 0 ? (
						<img
							className={styles.buttonImg}
							src={qr_code_icon}
							alt="QR code Icon"
						/>) : (<p className={styles.redParagraphSmaller}>{t("ticket-expired")}<br /><br />
						{t("qr-code-inaccessible")}</p>)
						}
					</div>
					<div className={styles.ticketInfo}>
						<p className={styles.paragraph}>{t("remaining-time")}</p>
						<p className={styles.redParagraph}>
							{remainingTime === 0 ? <p>{t("inactive")}</p> : formatTime(remainingTime)}
						</p>
						<p className={styles.paragraph}>{t("vehicle-identifier")}</p>
						<p className={`${styles.paragraph} ${styles.bolded}`}>HG924</p>
					</div>
				</div>

				<div className={styles.rightSection}>
					<p
						className={`${styles.paragraph} ${styles.bolded} ${styles.enlarge}`}
					>
						{originalTime}
					</p>
					<p className={`${styles.paragraph} ${styles.bolded}`}>
						{type === "Normalny" ? t("normal-ticket") : t("reduced-ticket")}
					</p>
					<p className={styles.paragraph}>MPK Kraków</p>
					<p className={styles.paragraph}>{t("zones")} I+II+III</p>
					<p
						className={`${styles.paragraph} ${styles.bolded} ${styles.enlarge}`}
					>
						{t("price")} {price} zł
					</p>
					<div className={styles.buttons}>
						<button
							className={styles.yourTicketButton}
							onClick={handleBuyAgain}
						>
							{t("buy-again")}
						</button>
						<button className={styles.yourTicketButton} onClick={generatePDF}>
							{t("download-invoice")}
						</button>
						{price > 90 && remainingTime > 5 && (
							<button
								className={styles.yourTicketButton}
								onClick={handleFreezeTicket}
							>
								{t("freeze-ticket")}
							</button>
						)}
					</div>
				</div>
			</div>

			{isPopupVisible && (
				<div className={styles.popup}>
					<div className={styles.popupContent}>
						<h2 className={styles.popupTitle}>{t("warning")}</h2>
						<p className={styles.popupText}>
							{t("no-more-freeze")}
						</p>
						<div className={styles.popupGrid}>
							<button onClick={() => setPopupVisible(false)}>{t("go-back")}</button>
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

const arrayBufferToBase64 = (buffer) => {
	let binary = "";
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;

	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}

	return btoa(binary);
};
