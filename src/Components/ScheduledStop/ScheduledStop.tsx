import React from "react";
import { Temporal } from "temporal-polyfill";

import { get_type_name, get_vehicle_icon } from "../../util.ts";
import { VehicleType } from "../../api.ts";
import style from "./ScheduledStop.module.css";
import { useTranslation } from "react-i18next";

export default function ScheduledStop({
	now,
	onClick,
	stop: { line, type, name, headsign, arrival, departure, delay },
}: {
	now: Temporal.ZonedDateTime;
	onClick: () => void;
	stop: {
		line: string;
		type: VehicleType;
		name: string;
		headsign: string;
		arrival: Temporal.ZonedDateTime;
		departure: Temporal.ZonedDateTime;
		delay?: [number, number | undefined];
	};
}) {
	const { t } = useTranslation();

	return (
		<div
			key={`${line}-${arrival.toString()}`}
			onClick={onClick}
			className={`${style.stop} ${
				arrival.since(now).sign === -1 ? style.past : style.future
			}`}
		>
			<p className={style.header}>
				<img
					className={style.icon}
					src={get_vehicle_icon(type)}
					alt={t(`vehicle-type.${get_type_name(type)}`)}
				/>
				<span className={style.name}>{name}</span>
				<span className={style.headsign}>{headsign}</span>
			</p>
			<p className={style.times}>
				{arrival.equals(departure) ? null : (
					<>
						<span className={style.arrival}>
							{arrival.toPlainTime().toLocaleString()}
						</span>
						<span>-</span>
					</>
				)}
				<span className={style.departure}>
					{departure.toPlainTime().toLocaleString()}
				</span>
				<span className={style.delay}>
					{delay?.[0] === undefined
						? t("schedule.scheduled")
						: delay?.[0] === 0
						? t("schedule.on-time")
						: delay?.[0] >= 0
						? t("schedule.late", { val: Math.abs(delay?.[0] / 60).toFixed(1) })
						: t("schedule.early", {
								val: Math.abs(delay?.[0] / 60).toFixed(1),
						  })}
				</span>
			</p>
		</div>
	);
}
