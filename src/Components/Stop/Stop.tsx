import React, { useContext, useEffect } from "react";
import { navigate } from "wouter/use-hash-location";
import { MapCtx } from "../Map/Map.tsx";
import { VehicleType } from "../../api.ts";
import { cmp, get_type_name, get_vehicle_icon } from "../../util.ts";
import style from "./Stop.module.css";

export default function Stop({
	system,
	id,
	name,
	lines,
}: {
	system: string;
	id: string;
	name: string;
	lines: { id: string; name: string; headsign: string; type: VehicleType }[];
}) {
	const { highlighted } = useContext(MapCtx)!;
	useEffect(
		() => () => {
			highlighted.value = [];
		},
		[highlighted]
	);

	return (
		<div
			className={style.stop}
			onMouseLeave={() => (highlighted.value = [])}
			onMouseEnter={() => (highlighted.value = [id])}
		>
			<p
				className={style.name}
				onClick={() => navigate(`/timetable/${system}/stop/${id}`)}
			>
				{name}
			</p>
			<div className={style.lines}>
				{lines
					.sort((a, b) =>
						cmp([a.name, a.headsign, a.id], [b.name, b.headsign, b.id])
					)
					.map((l) => (
						<div
							key={l.id}
							className={style.line}
							title={`${l.name} ${l.headsign}`}
							onClick={() => navigate(`/timetable/${system}/line/${l.id}`)}
						>
							<img
								className={style.linetype}
								src={get_vehicle_icon(l.type)}
								alt={`${get_type_name(l.type)} line`}
							/>
							<span className={style.linename}>{l.name}</span>
							<span className={style.lineheadsign}>{l.headsign}</span>
						</div>
					))}
			</div>
		</div>
	);
}
