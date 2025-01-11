import React from "react";
import { Temporal } from "temporal-polyfill";

import { get_type_name, get_vehicle_icon } from "../../util.ts";
import { VehicleType } from "../../api.ts";
import style from "./Route.module.css";

export default function Route({
	onClick,
	selected,
	start,
	end,
	legs,
}: {
	onClick: () => void;
	selected: boolean;
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
	legs: {
		from: { id: string; name: string };
		to: { id: string; name: string };
		lines: { name: string; id: string; type: VehicleType }[];
	}[];
}) {
	return (
		<div
			onClick={onClick}
			className={`${style.wrapper} ${selected ? style.selected : ""}`}
		>
			<div className={style.header}>
				<span className={style.time}>
					{time(start)} - {time(end)}
				</span>

				<span className={style.duration}>{duration(end.since(start))}</span>
			</div>

			<div className={style.legs}>
				{legs.map((l) => (
					<div className={style.leg}>
						<img
							className={style.legicon}
							src={get_vehicle_icon(l.lines[0]?.type ?? VehicleType.Other)}
							alt={get_type_name(l.lines[0]?.type ?? VehicleType.Other)}
						/>

						<span className={style.lines}>
							{l.lines.map((l) => l.name).join(" / ")}
						</span>
						<span className={style.stops}>
							{l.from.name} &gt; {l.to.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

function time(datetime: Temporal.ZonedDateTime): string {
	if (
		datetime
			.toPlainDate()
			.equals(Temporal.Now.plainDateISO(datetime.timeZoneId))
	) {
		return datetime
			.toPlainTime()
			.toLocaleString(undefined, { timeStyle: "short" });
	} else {
		return datetime
			.toPlainDateTime()
			.toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });
	}
}

function duration(duration: Temporal.Duration): string {
	const hours = Math.floor(duration.total("hours"));
	const minutes = duration.total("minutes") % 60;

	if (hours !== 0) {
		return `${hours} h ${minutes} min`;
	}

	return `${minutes} min`;
}
