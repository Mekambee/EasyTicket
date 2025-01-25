import React, { useState } from "react";
import styles from "./BuyTicketStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
import TicketCardComponent from "../../Components/TicketCard/TicketCardComponent";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

export default function BuyTicketView() {
	const [discountFlag, setDiscountFlag] = useState(true);
	const { t } = useTranslation();
	const handleClick = () => {
		setDiscountFlag(!discountFlag);
	};
	const [, navigate] = useLocation();

	return (
		<div className={styles.ticketBody}>
			<TopBarComponent></TopBarComponent>
			<div className={styles.content}>
				<div className={styles.toggleButtonsContainer}>
					<button
						className={`${styles.toggleButton} ${
							discountFlag ? styles.active : ""
						}`}
						onClick={handleClick}
					>
						{t("normal")}
					</button>
					<button
						className={`${styles.toggleButton} ${
							!discountFlag ? styles.active : ""
						}`}
						onClick={handleClick}
					>
						{t("reduced")}
					</button>
					<div className={styles.questionMarkContainer}>
						<button
							className={styles.questionMarkButton}
							onClick={() => navigate("/tickets-faq")}
						>
							<svg
								className={styles.questionMarkIcon}
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M10.92 10.438a1.08 1.08 0 1 1 1.698.886c-.27.19-.598.442-.86.76c-.267.322-.508.759-.508 1.3a.75.75 0 0 0 1.5 0c0-.075.03-.184.162-.343a3 3 0 0 1 .566-.489a2.58 2.58 0 1 0-4.058-2.114a.75.75 0 0 0 1.5 0M12 14.642a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5"
								/>
								<path
									fill="currentColor"
									fill-rule="evenodd"
									d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M3.5 12a8.5 8.5 0 1 1 17 0a8.5 8.5 0 0 1-17 0"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>

				{discountFlag ? (
					<div className={styles.ticketGrid}>
						<TicketCardComponent
							price="4"
							time="20 min"
							type="Normalny"
						></TicketCardComponent>
						<TicketCardComponent
							price="6"
							time="60 min"
							type="Normalny"
						></TicketCardComponent>
						<TicketCardComponent
							price="8"
							time="90 min"
							type="Normalny"
						></TicketCardComponent>
						<TicketCardComponent
							price="199"
							time="1 msc"
							type="Normalny"
						></TicketCardComponent>
						<TicketCardComponent
							price="398"
							time="2 msc"
							type="Normalny"
						></TicketCardComponent>
						<TicketCardComponent
							price="597"
							time="3 msc"
							type="Normalny"
						></TicketCardComponent>
					</div>
				) : (
					<div className={styles.ticketGrid}>
						<TicketCardComponent
							price="2"
							time="20 min"
							type="Ulgowy"
						></TicketCardComponent>
						<TicketCardComponent
							price="3"
							time="60 min"
							type="Ulgowy"
						></TicketCardComponent>
						<TicketCardComponent
							price="4"
							time="90 min"
							type="Ulgowy"
						></TicketCardComponent>
						<TicketCardComponent
							price="99"
							time="1 msc"
							type="Ulgowy"
						></TicketCardComponent>
						<TicketCardComponent
							price="199"
							time="2 msc"
							type="Ulgowy"
						></TicketCardComponent>
						<TicketCardComponent
							price="298"
							time="3 msc"
							type="Ulgowy"
						></TicketCardComponent>
					</div>
				)}
			</div>
		</div>
	);
}
