import React from "react";
import styles from "./OuterSiteStyle.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function OuterSiteView() {
	const navigate = useNavigate();
	const location = useLocation();
	const { price, time } = location.state || {};
	const handleNavigation = () => {
		navigate("/my-tickets", { state: { price, time } });
	};

	return (
		<div className={styles.container}>
			<div className={styles.topBar}>Twój Bank</div>

			<div className={styles.content}>
				<p className={styles.infoText}>
					Ta strona nie jest częścią testu, ponieważ jest <br />
					zewnętrzną stroną niestanowiącą części systemu <br />
					<span className={styles.bold}>EasyTicket</span>.
				</p>
				<button className={styles.confirmButton} onClick={handleNavigation}>
					Potwierdź Płatność
				</button>
			</div>
		</div>
	);
}
