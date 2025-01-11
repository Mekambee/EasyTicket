import React, { ReactNode, useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import TopBarComponent from "../../Components/TopBar/TopBarComponent.jsx";
import Map from "../../Components/Map/Map.tsx";
import Loading from "../../Components/Loading/Loading.tsx";
import ScheduleSidebar from "../../Components/ScheduleSidebar/ScheduleSidebar.tsx";
import LineSidebar from "../../Components/LineSidebar/LineSidebar.tsx";
import Stop from "../../Components/Stop/Stop.tsx";
import StopGroup from "../../Components/StopGroup/StopGroup.tsx";
import { cmp } from "../../util.ts";
import style from "./TimetableView.module.css";
import { get_stops } from "../../api.ts";

export default function TimetableView({ system }: { system: string }) {
	const [search, setSearch] = useState<string>("");
	const [content, setContent] = useState<
		ReactNode | ((search: string) => ReactNode)
	>(<Loading />);

	useEffect(() => {
		stops(system).then((s) => {
			setContent(() => s);
		});
	}, [system]);

	return (
		<Map system={system}>
			<Switch>
				<Route path="/stop/:id">
					{({ id }) => <ScheduleSidebar system={system} id={id} />}
				</Route>
				<Route path="/line/:id">
					{({ id }) => <LineSidebar system={system} id={id} />}
				</Route>
				<Route path="/">
					<TopBarComponent noStyleButtons />
					<div className={style.wrapper}>
						{typeof content === "function" ? (
							<input
								type="text"
								className={style.search}
								placeholder="Search"
								onInput={(ev) =>
									setSearch(ev.currentTarget.value.toLowerCase())
								}
							/>
						) : null}

						<div className={style.content}>
							{typeof content === "function" ? content(search) : content}
						</div>
					</div>
				</Route>
			</Switch>
		</Map>
	);
}

async function stops(system: string): Promise<(search: string) => ReactNode> {
	const stops = (await get_stops(system)) ?? [];
	const groups = new global.Map<string, typeof stops>();

	for (const stop of stops) {
		const group = groups.get(stop.name);

		if (group === undefined) {
			groups.set(stop.name, [stop]);
		} else {
			group.push(stop);
		}
	}

	return (search: string) => (
		<>
			{[...groups.entries()]
				.filter(([k, _]) => k.toLowerCase().includes(search))
				.sort(([a, _a], [b, _b]) => cmp([a], [b]))
				.map(([name, stops]) => (
					<StopGroup
						key={name}
						name={name}
						types={[...new Set(stops.flatMap((s) => s.types))].sort(
							(a, b) => a - b
						)}
					>
						{stops
							.sort((a, b) => cmp([a.id], [b.id]))
							.map((s) => (
								<Stop
									key={s.id}
									system={system}
									id={s.id}
									name={s.name}
									lines={Object.entries(s.lines).map(([k, v]) => ({
										id: k,
										...v!,
									}))}
								/>
							))}
					</StopGroup>
				))}
		</>
	);
}
