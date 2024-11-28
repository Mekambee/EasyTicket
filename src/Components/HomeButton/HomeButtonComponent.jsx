import React from "react";
import styles from "./HomeButtonComponentStyle.module.css";

export default function HomeButtonComponent({ buttonText }) {
	return (
		<div>
			<button className={styles.homeButton}>{buttonText}</button>
		</div>
	);
}
