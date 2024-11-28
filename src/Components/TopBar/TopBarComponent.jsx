import React from "react";
import styles from "./TopBarStyle.module.css";
import { Link } from "react-router-dom";

export default function TopBarComponent() {
	return (
		<div className={styles.topBar}>
			<div className={styles.backHomeButton}>
				<Link to={"/"}>
					<svg
						className={styles.backHomeIcon}
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
					>
						<path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
					</svg>
				</Link>
			</div>
			<div className={styles.logo}>
				<h1>EasyTicket</h1>
			</div>
			<div className={styles.topBarButtons}>
				<button>Aa</button>
				<button>A+</button>
				<button>A-</button>
				<button className={styles.highlighted}>Aa</button>
				<button className={styles.highlighted}>Aa</button>
				<button className={styles.highlighted}>Aa</button>
				<button>🇵🇱</button>
			</div>
		</div>
	);
}
