import React from "react";
import { Link } from "wouter";
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
							xmlns="http://www.w3.org/2000/svg"
							width="80"
							height="80"
							viewBox="0 0 24 24"
						>
							<path
								fill="gray"
								d="M1 21L12 2l11 19zm11-3q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m-1-3h2v-5h-2z"
							/>
						</svg>
					</button>
					<p>Zgłoś Problem</p>
				</div>
			</div>
		</div>
	);
}
