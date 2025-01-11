import React, { ReactNode, useContext, useEffect, useState } from "react";
import { get_routes, Route, RouteSearchMode } from "../../api.ts";
import TopBarComponent from "../../Components/TopBar/TopBarComponent.jsx";
import Map, { MapCtx } from "../../Components/Map/Map.tsx";
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
	const [selected, setSelected] = useState<Route | null>(null);

	useEffect(() => {
		let current = true;

		get_routes(system, from, to, mode).then((res) => {
			if (current) {
				setResults(res ?? []);
				setSelected((res ?? [])[0] ?? null);
			}
		});

		return () => {
			current = false;

			setSelected(null);
		};
	}, [system, to, from, mode]);

	useEffect(() => {
		if (map_ctx) {
			map_ctx.geojson.value = selected?.legs?.map((l) => l.route) ?? [];
			map_ctx.highlighted.value =
				selected?.legs?.flatMap((l) => [l.from.id, l.to.id]) ?? [];
		}

		return () => {
			if (map_ctx) {
				map_ctx.geojson.value = [];
				map_ctx.highlighted.value = [];
			}
		};
	}, [selected, map_ctx]);

	return (
		<>
			<TopBarComponent noStyleButtons />

			<label>
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
			<label>
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

			{results.length === 0 ? (
				<p>
					Po bybraniu nazwy przystanku początkowego i przystanku końcowego tu
					pokażą się wyniki wyszukiwania trasy.
				</p>
			) : null}

			{results.map((res) => (
				<p>TODO: show {JSON.stringify(res)}</p>
			))}
		</>
	);
};
