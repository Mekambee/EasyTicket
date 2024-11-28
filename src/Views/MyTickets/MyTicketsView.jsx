import React from "react";
import { Link } from "react-router-dom";
import styles from "./MyTicketsStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";

export default function MyTicketsPage() {
	return (
		<div className={styles.myTicketsContainer}>
			<TopBarComponent />
			<h1>Moje bilety</h1>
			<p>blabla tu so bilety ogułem</p>
			<Link to="/">
				<button>Wróc do home</button>
			</Link>
		</div>
	);
}
