import React, { useContext, useEffect, useState } from "react";

import { get_routes, RouteSearchMode } from "../../api.ts";
import type { Route } from "../../api.ts";
import TopBarComponent from "../../Components/TopBar/TopBarComponent.jsx";
import Map, { MapCtx } from "../../Components/Map/Map.tsx";
import ResultRoute from "../../Components/Route/Route.tsx";
import style from "./SearchRouteView.module.css";

// UI prototype only:
// This will definitely be changed (to the result of api.ts's get_stops) when
// this very real website goes into production.
const STOPS = ["Ruczaj", "AGH / UR"];

export default function SearchRouteView({ system }: { system: string }) {
	return (
		<Map system={system}>
			<Sidebar system={system} />
		</Map>
	);
}

const Sidebar = ({ system }) => {
	const map_ctx = useContext(MapCtx)!;
	const [mode, setMode] = useState<RouteSearchMode>("fastest");
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [results, setResults] = useState<Route[]>([]);
	const [selected, setSelected] = useState<number | null>(null);

	useEffect(() => {
		let current = true;

		get_routes(system, from, to, mode).then((res) => {
			if (current) {
				setResults(res ?? []);
				setSelected(0);
			}
		});

		return () => {
			current = false;
			setSelected(null);
		};
	}, [system, to, from, mode]);

	useEffect(() => {
		if (map_ctx) {
			map_ctx.geojson.value =
				results[selected ?? 1 << 31]?.legs?.map((l) => l.route) ?? [];
			map_ctx.highlighted.value =
				results[selected ?? 1 << 31]?.legs?.flatMap((l) => [
					l.from.id,
					l.to.id,
				]) ?? [];
		}

		return () => {
			if (map_ctx) {
				map_ctx.geojson.value = [];
				map_ctx.highlighted.value = [];
			}
		};
	}, [results, selected, map_ctx]);

	return (
		<>
			<TopBarComponent noStyleButtons />

			<div className={style.inputs}>
				<label className={style.input}>
					Z{" "}
					<select onChange={(e) => setFrom(e.currentTarget.value)}>
						<option key="" value=""></option>
						{STOPS.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</label>
				<label className={style.input}>
					Do{" "}
					<select onChange={(e) => setTo(e.currentTarget.value)}>
						<option key="" value=""></option>
						{STOPS.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</label>
			</div>

			<div className={style.modes}>
				{(
					[
						["fastest", "Najszybciej"],
						["fewest transfers", "Najmniej Przesiadek"],
						["least walking", "Najmniej Chodzenia"],
					] as [RouteSearchMode, string][]
				).map(([m, text]) => (
					<span
						className={`${style.mode} ${mode === m ? style.selectedmode : ""}`}
						onClick={() => setMode(m)}
					>
						{text}
					</span>
				))}
			</div>

			{results.length === 0 ? (
				<p className={style.explanation}>
					Po wybraniu nazwy przystanku początkowego i przystanku końcowego tu
					pokażą się wyniki wyszukiwania trasy.
				</p>
			) : null}

			{results.map((res, i) => (
				<ResultRoute
					key={JSON.stringify(res)}
					onClick={() => setSelected(i)}
					selected={selected === i}
					start={res.start}
					end={res.end}
					legs={res.legs}
				/>
			))}
		</>
	);
};
