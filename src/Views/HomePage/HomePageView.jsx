import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomePageStyle.module.css";

export default function HomePage() {
	return (
		<div className={styles.homeContainer}>
			<h1>Home page</h1>
			<p>Witaj na stronie głównej</p>
			<Link to="/my-tickets">
				<button>Przejdź do moje bilety</button>
			</Link>
		</div>
	);
}
