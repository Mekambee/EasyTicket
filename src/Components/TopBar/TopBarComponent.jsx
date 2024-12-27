import React from "react";
import styles from "./TopBarStyle.module.css";
import { Link } from "wouter";
import contrast_1_icon from "../../assets/contrast-1.svg";
import contrast_2_icon from "../../assets/contrast-2.svg";
import contrast_3_icon from "../../assets/contrast-3.svg";
import font_size_1_icon from "../../assets/font-size-1.svg";
import font_size_2_icon from "../../assets/font-size-2.svg";
import font_size_3_icon from "../../assets/font-size-3.svg";
import language_pl_icon from "../../assets/language-pl.svg";

export default function TopBarComponent({ noStyleButtons }) {
	const clearURL = () => {
		window.history.replaceState({}, document.title, window.location.pathname + "#/");
	};
	return (
		<div className={styles.topBar}>
			<div className={styles.backHomeButton} onClick={clearURL}>
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
			{!noStyleButtons ? (
				<div className={styles.topBarButtons}>
					<div className={styles.buttonGroup}>
						<button className={styles.button}>
							<img
								className={styles.buttonImg}
								src={font_size_1_icon}
								alt="Default font size"
							/>
						</button>
						<button className={styles.button}>
							<img
								className={styles.buttonImg}
								src={font_size_2_icon}
								alt="Bigger font size"
							/>
						</button>
						<button className={styles.button}>
							<img
								className={styles.buttonImg}
								src={font_size_3_icon}
								alt="Biggest font size"
							/>
						</button>
					</div>
					<div className={styles.buttonGroup}>
						<button className={styles.button}>
							<img
								className={styles.buttonImg}
								src={contrast_1_icon}
								alt="Default contrast"
							/>
						</button>
						<button className={styles.button}>
							<img
								className={styles.buttonImg}
								src={contrast_2_icon}
								alt="More contrast"
							/>
						</button>
						<button className={styles.button}>
							<img
								className={styles.buttonImg}
								src={contrast_3_icon}
								alt="Most contrast"
							/>
						</button>
					</div>
					<div className={styles.buttonGroup}>
						<button className={styles.button}>
							<img
								className={styles.buttonImg}
								src={language_pl_icon}
								alt="Language - PL"
							/>
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}
