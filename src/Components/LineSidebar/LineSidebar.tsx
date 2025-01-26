import React, { useContext, useEffect, useState } from "react";
import { navigate } from "wouter/use-hash-location";
import { useTranslation } from "react-i18next";

import Loading from "../Loading/Loading.tsx";
import TopBarComponent from "../TopBar/TopBarComponent";
import { get_line } from "../../api.ts";
import type { Line } from "../../api.ts";
import { get_stop_icon, get_type_name } from "../../util.ts";
import { MapCtx } from "../Map/Map.tsx";
import style from "./LineSidebar.module.css";

export default function LineSidebar({
	system,
	id,
}: {
	system: string;
	id: string;
}) {
	const { t } = useTranslation();
	const [refresh_counter, refresh_inner] = useState<number>(0);
	const refresh = () => {
		setSchedule(null);
		refresh_inner((c) => c + 1);
	};
	const [schedule, setSchedule] = useState<Line | "error" | null>(null);
	const { map, highlighted, shapes } = useContext(MapCtx)!;
	useEffect(
		() => () => {
			highlighted.value = [];
		},
		[system, id, highlighted]
	);

	useEffect(() => {
		get_line(system, id).then((s) => {
			if (s === undefined) {
				setSchedule("error");
			} else {
				shapes.value = s.shape.map((sh) => [sh, s.color]);
				setSchedule(s);
			}
		});

		return () => {
			shapes.value = [];
		};
	}, [system, shapes, id, refresh_counter]);

	if (schedule === "error") {
		return (
			<>
				<TopBarComponent noStyleButtons />
				<div className={style.header}>
					<button onClick={() => window.history.back()} className={style.back}>
						<svg
							width="48"
							height="48"
							viewBox="0 0 48 48"
							className={style.backicon}
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="m15.65 26 11.2 11.2L24 40 8 24 24 8l2.85 2.8L15.65 22H40v4H15.65Z"
								fill="currentColor"
							/>
						</svg>
					</button>
					<h1 className={style.title}>{t("schedule.error")}</h1>
					<button className={style.refresh} onClick={() => refresh()}>
						<svg
							width="48"
							height="48"
							viewBox="0 0 48 48"
							className={style.refreshicon}
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M24 40c-4.467 0-8.25-1.55-11.35-4.65C9.55 32.25 8 28.467 8 24s1.55-8.25 4.65-11.35C15.75 9.55 19.533 8 24 8c2.3 0 4.5.475 6.6 1.425 2.1.95 3.9 2.308 5.4 4.075V8h4v14H26v-4h8.4a11.675 11.675 0 0 0-4.375-4.4C28.175 12.533 26.167 12 24 12c-3.333 0-6.167 1.167-8.5 3.5S12 20.667 12 24s1.167 6.167 3.5 8.5S20.667 36 24 36c2.567 0 4.883-.733 6.95-2.2s3.517-3.4 4.35-5.8h4.2c-.933 3.533-2.833 6.417-5.7 8.65C30.933 38.883 27.667 40 24 40Z"
								fill="currentColor"
							/>
						</svg>
					</button>
				</div>
			</>
		);
	}

	return (
		<div className={style.wrapper}>
			<TopBarComponent noStyleButtons />
			<div className={style.header}>
				<button onClick={() => window.history.back()} className={style.back}>
					<svg
						width="48"
						height="48"
						viewBox="0 0 48 48"
						className={style.backicon}
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="m15.65 26 11.2 11.2L24 40 8 24 24 8l2.85 2.8L15.65 22H40v4H15.65Z"
							fill="currentColor"
						/>
					</svg>
				</button>
				<div className={style.title}>
					<h1 className={style.name}>
						{schedule === null ? "" : schedule?.name}
					</h1>
					<h2 className={style.headsign}>
						{schedule === null ? "" : schedule?.headsign}
					</h2>
				</div>
				<button
					className={style.locate}
					onClick={() =>
						schedule === null
							? null
							: map.flyToBounds(schedule.stops.map((s) => [s.lat, s.lon]))
					}
				>
					<svg
						width="48"
						height="48"
						viewBox="0 0 48 48"
						className={style.locateicon}
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22 45.9v-4c-4.167-.467-7.742-2.192-10.725-5.175C8.292 33.742 6.567 30.167 6.1 26h-4v-4h4c.467-4.167 2.192-7.742 5.175-10.725C14.258 8.292 17.833 6.567 22 6.1v-4h4v4c4.167.467 7.742 2.192 10.725 5.175C39.708 14.258 41.433 17.833 41.9 22h4v4h-4c-.467 4.167-2.192 7.742-5.175 10.725C33.742 39.708 30.167 41.433 26 41.9v4h-4Zm2-7.9c3.867 0 7.167-1.367 9.9-4.1 2.733-2.733 4.1-6.033 4.1-9.9s-1.367-7.167-4.1-9.9C31.167 11.367 27.867 10 24 10s-7.167 1.367-9.9 4.1C11.367 16.833 10 20.133 10 24s1.367 7.167 4.1 9.9c2.733 2.733 6.033 4.1 9.9 4.1Zm0-6c-2.2 0-4.083-.783-5.65-2.35C16.783 28.083 16 26.2 16 24s.783-4.083 2.35-5.65C19.917 16.783 21.8 16 24 16s4.083.783 5.65 2.35C31.217 19.917 32 21.8 32 24s-.783 4.083-2.35 5.65C28.083 31.217 26.2 32 24 32Zm0-4c1.1 0 2.042-.392 2.825-1.175C27.608 26.042 28 25.1 28 24s-.392-2.042-1.175-2.825C26.042 20.392 25.1 20 24 20s-2.042.392-2.825 1.175C20.392 21.958 20 22.9 20 24s.392 2.042 1.175 2.825C21.958 27.608 22.9 28 24 28Zm0-4Z"
							fill="currentColor"
						/>
					</svg>
				</button>
			</div>

			<div className={style.content}>
				{schedule === null ? (
					<Loading />
				) : (
					schedule.stops.map((s, i) => (
						<React.Fragment key={i}>
							{i === 0 ? null : <div className={style.gap}>&zwnj;</div>}

							<div
								className={style.stop}
								onClick={() => navigate(`/timetable/${system}/stop/${s.id}`)}
								onMouseLeave={() => (highlighted.value = [])}
								onMouseEnter={() => (highlighted.value = [s.id])}
							>
								<img
									className={style.stopicon}
									src={get_stop_icon(schedule.type)}
									alt={`${t(`stop-type.${get_type_name(schedule.type)}`)}`}
								/>
								<span className={style.stopname}>{s.name}</span>
							</div>
						</React.Fragment>
					))
				)}
			</div>
		</div>
	);
}
