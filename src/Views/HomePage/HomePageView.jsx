import React, { useState } from "react";
import { Link } from "wouter";
import styles from "./HomePageStyle.module.css";
import HomeButtonComponent from "../../Components/HomeButton/HomeButtonComponent";
import TopBarComponent from "../../Components/TopBar/TopBarComponent";
import { useTranslation } from "react-i18next";

export default function HomePage() {
	const { t } = useTranslation();
	const buyTicketText = t("buy-ticket");
	const myTicketsText = t("my-tickets");
	const searchRouteText = t("search-route");
	const timetableText = t("timetable");

	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const [problemDescription, setProblemDescription] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [triedSubmittingEmpty, setTriedSubmittingEmpty] = useState(false);


	const handleReportProblemClick = () => {
		setIsPopupVisible(true);
		setIsSubmitted(false);
		setProblemDescription("");
		setTriedSubmittingEmpty(false);
	};

	const handlePopupClose = () => {
		setIsPopupVisible(false);
	};

	const handleProblemSubmit = () => {
		if (problemDescription === "") {
			setTriedSubmittingEmpty(true);
			return;
		}

		setIsSubmitted(true);
		setTimeout(() => {
			setIsPopupVisible(false);
		}, 2000);
	};

	return (
		<div className={styles.homeBody}>
			<TopBarComponent />
			<div className={styles.content}>
				<h1>{t("welcome")}</h1>
				<div className={styles.buttonBox}>
					<div className={styles.navlink}>
						<Link to="/buy-ticket">
							<HomeButtonComponent buttonText={buyTicketText} />
						</Link>
					</div>
					<div className={styles.navlink}>
						<Link to="/my-tickets">
							<HomeButtonComponent buttonText={myTicketsText} />
						</Link>
					</div>
					<div className={styles.navlink}>
						<Link to="/search-route/Kraków">
							<HomeButtonComponent buttonText={searchRouteText} />
						</Link>
					</div>
					<div className={styles.navlink}>
						<Link to="/timetable/Kraków">
							<HomeButtonComponent buttonText={timetableText} />
						</Link>
					</div>
				</div>
				<div className={styles.reportProblemContainer}>
					<button
						className={styles.reportProblemButton}
						onClick={handleReportProblemClick}
					>
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
					<p>{t("report-problem")}</p>
				</div>
			</div>

			{isPopupVisible && (
				<div className={styles.popup}>
					<div className={styles.popupContent}>
						<h2 className={styles.popupTitle}>{t("report-problem-while-driving")}</h2>
						{isSubmitted ? (
							<p className={styles.successMessage}>
								{t("send-report")}
							</p>
						) : (
							<>
								<p className={styles.popupText}>{t("describe-problem")}</p>
								<textarea
									className={styles.textArea}
									value={problemDescription}
									onChange={(e) => setProblemDescription(e.target.value)}
								></textarea>
								{triedSubmittingEmpty ? (
									<p className={styles.textError}>{t("describe-problem")}</p>
								) : null}
								<div className={styles.popupActions}>
									<button
										className={styles.cancelButton}
										onClick={handlePopupClose}
									>
										{t("go-back")}
									</button>
									<button
										className={styles.submitButton}
										onClick={handleProblemSubmit}
									>
										{t("report")}
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
