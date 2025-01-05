import React, { useState } from "react";
import styles from "./BuyTicketStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
import TicketCardComponent from "../../Components/TicketCard/TicketCardComponent";

export default function BuyTicketView() {
	const [discountFlag, setDiscountFlag] = useState(true);
	const handleClick = () => {
		setDiscountFlag(!discountFlag);
	};

	return (
		<div className={styles.ticketBody}>
			<TopBarComponent></TopBarComponent>
			<div className={styles.content}>
				<div className="toggleContainer">
					<button
						className={`${styles.toggleButton} ${
							discountFlag ? styles.active : ""
						}`}
						onClick={handleClick}
					>
						Normalne
					</button>
					<button
						className={`${styles.toggleButton} ${
							!discountFlag ? styles.active : ""
						}`}
						onClick={handleClick}
					>
						Ulgowe
					</button>
				</div>
				{discountFlag ? (
					<div className={styles.ticketGrid}>
						<TicketCardComponent price="4" time="20 min" type="Normalny"></TicketCardComponent>
						<TicketCardComponent price="6" time="60 min" type="Normalny"></TicketCardComponent>
						<TicketCardComponent price="8" time="90 min" type="Normalny"></TicketCardComponent>
						<TicketCardComponent price="199" time="1 msc" type="Normalny"></TicketCardComponent>
						<TicketCardComponent price="398" time="2 msc" type="Normalny"></TicketCardComponent>
						<TicketCardComponent price="597" time="3 msc" type="Normalny"></TicketCardComponent>
					</div>
				) : (
					<div className={styles.ticketGrid}>
						<TicketCardComponent price="2" time="20 min" type="Ulgowy"></TicketCardComponent>
						<TicketCardComponent price="3" time="60 min" type="Ulgowy"></TicketCardComponent>
						<TicketCardComponent price="4" time="90 min" type="Ulgowy"></TicketCardComponent>
						<TicketCardComponent
							price="99,50"
							time="1 msc"
							type="Ulgowy"
						></TicketCardComponent>
						<TicketCardComponent price="199" time="2 msc" type="Ulgowy"></TicketCardComponent>
						<TicketCardComponent
							price="298,50"
							time="3 msc"
							type="Ulgowy"
						></TicketCardComponent>
					</div>
				)}
			</div>
		</div>
	);
}
