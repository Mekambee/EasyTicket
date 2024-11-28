import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomePageStyle.module.css";
import HomeButtonComponent from "../../Components/HomeButton/HomeButtonComponent";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";

const buyTicketText = "Kup bilet";
const myTicketsText = "Moje bilety";
const searchRouteText = "Wyszukaj trasę";
const timetableText = "Rozkład jazdy";

export default function HomePage() {
	return (
		<div className={styles.homeBody}>
			<TopBarComponent></TopBarComponent>
			<div className={styles.content}>
				<h1>Witaj w Easy Ticket!</h1>
				<div className={styles.buttonBox}>
					<div className={styles.navlink}>
						<Link to="/buy-ticket">
							<HomeButtonComponent
								buttonText={buyTicketText}
							></HomeButtonComponent>
						</Link>
					</div>
					<div className={styles.navlink}>
						<Link to="/my-tickets">
							<HomeButtonComponent
								buttonText={myTicketsText}
							></HomeButtonComponent>
						</Link>
					</div>
					<div className={styles.navlink}>
						<Link to="/search-route">
							<HomeButtonComponent
								buttonText={searchRouteText}
							></HomeButtonComponent>
						</Link>
					</div>
					<div className={styles.navlink}>
						<Link to="/timetable">
							<HomeButtonComponent
								buttonText={timetableText}
							></HomeButtonComponent>
						</Link>
					</div>
				</div>
				<div className={styles.reportProblemContainer}>
					<button className={styles.reportProblemButton}>
						<svg
							viewBox="0 0 512 512"
							fill="currentColor"
							height="1em"
							width="1em"
						>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={32}
								d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z"
							/>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={32}
								d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z"
							/>
							<path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
