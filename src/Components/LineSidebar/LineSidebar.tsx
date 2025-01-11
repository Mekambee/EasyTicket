import React, { useContext, useEffect, useState } from "react";
import { navigate } from "wouter/use-hash-location";

import back_icon from "../../assets/back.svg";
import locate_icon from "../../assets/locate.svg";
import refresh_icon from "../../assets/refresh.svg";

import Loading from "../Loading/Loading.tsx";
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
	const [refresh_counter, refresh_inner] = useState<number>(0);
	const refresh = () => (setSchedule(null), refresh_inner((c) => c + 1));
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
	}, [system, id, refresh_counter]);

	if (schedule === "error") {
		return (
			<div className={style.header}>
				<a
					className={style.back}
					onClick={() => navigate(`/timetable/${system}`)}
				>
					<img className={style.backicon} src={back_icon} alt="wróć" />
				</a>
				<h1 className={style.title}>Błąd</h1>
				<a className={style.refresh} onClick={() => refresh()}>
					<img className={style.refreshicon} src={refresh_icon} alt="odśwież" />
				</a>
			</div>
		);
	}

	return (
		<div className={style.wrapper}>
			<div className={style.header}>
				<a
					className={style.back}
					onClick={() => navigate(`/timetable/${system}`)}
				>
					<img className={style.backicon} src={back_icon} alt="wróć" />
				</a>
				<div className={style.title}>
					<h1 className={style.name}>
						{schedule === null ? "" : schedule?.name}
					</h1>
					<h2 className={style.headsign}>
						{schedule === null ? "" : schedule?.headsign}
					</h2>
				</div>
				<a
					className={style.locate}
					onClick={() =>
						schedule === null
							? null
							: map.flyToBounds(schedule.stops.map((s) => [s.lat, s.lon]))
					}
				>
					<img
						className={style.locateicon}
						src={locate_icon}
						alt="pokaż na mapie"
					/>
				</a>
			</div>

			<div className={style.content}>
				{schedule === null ? (
					<Loading />
				) : (
					schedule.stops.map((s, i) => (
						<>
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
									alt={`przystanek ${get_type_name(schedule.type)}`}
								/>
								<span className={style.stopname}>{s.name}</span>
							</div>
						</>
					))
				)}
			</div>
		</div>
	);
}
