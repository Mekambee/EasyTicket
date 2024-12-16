import React from "react";
import styles from "./YourTicketStyle.module.css";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
export default function YourTicketView() {
	return (
		<div className={styles.container}>
			<TopBarComponent></TopBarComponent>
			<h1>tutaj strona z moim biletem</h1>
		</div>
	);
}
