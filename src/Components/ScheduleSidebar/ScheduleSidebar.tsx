import React, { useContext, useEffect, useState } from "react";
import { navigate } from "wouter/use-hash-location";
import { useTranslation } from "react-i18next";
import { Temporal } from "temporal-polyfill";
import { TFunction } from "i18next";

import Loading from "../Loading/Loading.tsx";
import ScheduledStop from "../ScheduledStop/ScheduledStop.tsx";
import { MapCtx } from "../Map/Map.tsx";
import { get_stop, StopSchedule } from "../../api.ts";
import { cmp } from "../../util.ts";
import style from "./ScheduleSidebar.module.css";
import TopBarComponent from "../TopBar/TopBarComponent.jsx";

export default function ScheduleSidebar({
	system,
	id,
}: {
	system: string;
	id: string;
}) {
	const { t } = useTranslation();
	const { map, highlighted } = useContext(MapCtx)!;
	const [refresh_counter, refresh_inner] = useState<number>(0);
	const refresh = () => {
		setSchedule(null);
		refresh_inner((c) => c + 1);
	};
	const [schedule, setSchedule] = useState<StopSchedule | "error" | null>(null);
	const [tab, setTabInner] = useState<"arrivals" | "schedule">("arrivals");
	const setTab = (tab: "arrivals" | "schedule") => {
		if (tab === "arrivals") {
			setTimeout(() => {
				document
					.getElementById(style.now)
					?.previousElementSibling?.previousElementSibling?.scrollIntoView({
						behavior: "instant",
						block: "start",
					});
			}, 50);
		} else {
			setTimeout(() => {
				document.getElementsByClassName(style.content)[0]?.scroll({
					top: 0,
					behavior: "instant",
				});
			}, 50);
		}

		setTabInner(tab);
	};
	const [filter, setFilterInner] = useState<string | null>(null);
	const setFilter = (line: string) => {
		setTimeout(() => {
			document
				.getElementById(style.now)
				?.previousElementSibling?.previousElementSibling?.scrollIntoView({
					behavior: "instant",
					block: "start",
				});
		}, 50);

		setFilterInner((f) => (f === line ? null : line));
	};

	useEffect(() => {
		highlighted.value = [id];

		return () => {
			highlighted.value = [];
		};
	}, [system, highlighted, id]);

	useEffect(() => {
		let valid = true;
		setSchedule(null);
		get_stop(system, id).then((s) => {
			if (s === undefined) {
				setSchedule("error");
				return;
			} else if (!valid) {
				return;
			} else {
				setSchedule(s);
				setTimeout(() => {
					document
						.getElementById(style.now)
						?.previousElementSibling?.previousElementSibling?.scrollIntoView({
							behavior: "smooth",
							block: "start",
						});
				}, 50);
			}
		});

		const int = setInterval(() => {
			get_stop(system, id).then((s) => {
				if (s !== undefined) {
					setSchedule(s);
				}
			});
		}, 10000);

		return () => {
			valid = false;
			clearInterval(int);
		};
	}, [system, id, refresh_counter]);

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
					<h1 className={style.title}>{t("sidebar.error")}</h1>
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
				<h1 className={style.name}>
					{schedule === null ? "" : schedule?.name}
				</h1>
				<button
					className={style.locate}
					onClick={() =>
						schedule === null
							? null
							: map.flyTo(
									[schedule.lat, schedule.lon],
									Math.max(map.getZoom(), 16)
							  )
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

			<div className={style.tabs}>
				<a
					href="#arrivals"
					className={`${style.tab} ${tab === "arrivals" ? style.current : ""}`}
					onClick={(e) => {
						e.preventDefault();
						setTab("arrivals");
					}}
				>
					{t("schedule.departures")}
				</a>
				<a
					href="#schedule"
					className={`${style.tab} ${tab === "schedule" ? style.current : ""}`}
					onClick={(e) => {
						e.preventDefault();
						setTab("schedule");
					}}
				>
					{t("schedule.timetable")}
				</a>

				{schedule === null ? null : (
					<div className={style.lines}>
						{[...new Set(Object.values(schedule.lines).map((l) => l!.name))]
							.sort((a, b) => cmp([a], [b]))
							.map((l) => (
								<span
									className={`${style.line} ${
										filter === l
											? style.selectedline
											: filter !== null
											? style.nonselectedline
											: ""
									}`}
									onClick={() => setFilter(l)}
								>
									{l}
								</span>
							))}
					</div>
				)}

				<div className={style.content}>
					{schedule === null ? (
						<Loading />
					) : tab === "arrivals" ? (
						arrivals_content(schedule, filter, system)
					) : (
						schedule_content(schedule, filter, t)
					)}
				</div>
			</div>
		</div>
	);
}

function arrivals_content(
	schedule: StopSchedule,
	filter: string | null,
	system: string
) {
	const now = Temporal.Now.zonedDateTimeISO();

	return schedule.arrivals
		.filter((a) => filter === null || filter === schedule.lines[a.line]?.name)
		.map((a) => ({
			...a,
			arrival: Temporal.ZonedDateTime.from(a.arrival),
			departure: Temporal.ZonedDateTime.from(a.departure),
		}))
		.map((v, i, a) => (
			<>
				{i === 0 ||
				!a[i - 1].arrival.toPlainDate().equals(v.arrival.toPlainDate()) ? (
					<p key={v.arrival.toString()} className={style.date}>
						{v.arrival.toPlainDate().toLocaleString()}
					</p>
				) : null}

				{(a[i - 1]?.arrival?.since(now)?.sign ?? v.arrival.since(now).sign) !==
				v.arrival.since(now).sign ? (
					<hr id={style.now} />
				) : null}

				<ScheduledStop
					now={now}
					key={`${v.line}-${v.arrival}-${v.departure}`}
					stop={{ ...schedule.lines[v.line]!, ...v }}
					onClick={() => navigate(`/timetable/${system}/line/${v.line}`)}
				/>
			</>
		));
}

function schedule_content(
	schedule: StopSchedule,
	filter: string | null,
	t: TFunction
) {
	const named_schedule: {
		[name in string]?: {
			id: string;
			schedule: (typeof schedule.schedule.schedule)[string];
		};
	} = {};

	for (const [k, v] of Object.entries(schedule.schedule.schedule)) {
		const name = schedule.lines[k]?.name;

		if (name === undefined || v === undefined) {
			continue;
		}

		if (named_schedule[name] === undefined) {
			named_schedule[name] = { id: k, schedule: v };
		} else {
			Object.entries(named_schedule[name].schedule!).forEach(([k, s]) =>
				s.push(...v[k as keyof typeof v])
			);
		}
	}

	for (const s of Object.values(named_schedule)) {
		const cmp = (a: [string, string], b: [string, string]): number =>
			Temporal.PlainTime.from(a[0]).since(b[0]).total("second");

		s?.schedule?.monday?.sort(cmp);
		s?.schedule?.tuesday?.sort(cmp);
		s?.schedule?.wednesday?.sort(cmp);
		s?.schedule?.thursday?.sort(cmp);
		s?.schedule?.friday?.sort(cmp);
		s?.schedule?.saturday?.sort(cmp);
		s?.schedule?.sunday?.sort(cmp);
	}

	return (
		<>
			{(
				Object.entries(named_schedule)
					.filter(([n, _]) => filter === null || filter === n)
					.filter(([_, s]) => s !== undefined) as [
					string,
					{
						id: string;
						schedule: (typeof schedule.schedule.schedule)[string];
					}
				][]
			).map(([line, s]) => (
				<div key={line} className={style.schedulewrapper}>
					<h2 className={style.scheduleheader}>{line}</h2>
					<div className={style.scheduletable}>
						<table>
							<thead>
								<tr>
									<th scope="col"></th>
									<th scope="col">{t("schedule.monday")}</th>
									<th scope="col">{t("schedule.tuesday")}</th>
									<th scope="col">{t("schedule.wednesday")}</th>
									<th scope="col">{t("schedule.thursday")}</th>
									<th scope="col">{t("schedule.friday")}</th>
									<th scope="col">{t("schedule.saturday")}</th>
									<th scope="col">{t("schedule.sunday")}</th>
								</tr>
							</thead>
							<tbody>
								{[...range(24)].map((h) => (
									<tr>
										<th scope="row">{h.toFixed(0).padStart(2, "0")}</th>
										{[
											"monday",
											"tuesday",
											"wednesday",
											"thursday",
											"friday",
											"saturday",
											"sunday",
										].map((d) => (
											<td>
												{s.schedule?.[d as keyof typeof s.schedule]
													?.map((t) => Temporal.PlainTime.from(t[0]))
													.filter((t) => t.hour === h)
													.map((t) => (
														<span>{t.minute.toFixed(0).padStart(2, "0")}</span>
													))}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			))}

			<h3 className={style.noteheading}>{t("schedule.note")}</h3>
			<p className={style.note}>
				{t("schedule.extra-service", {
					val: schedule.schedule.additional.map((d) =>
						Temporal.PlainDate.from(d).toLocaleString()
					),
				})}
			</p>
			<p className={style.note}>
				{t("schedule.removed-service", {
					val: schedule.schedule.removed.map((d) =>
						Temporal.PlainDate.from(d).toLocaleString()
					),
				})}
			</p>
			<p className={style.note}>{t("schedule.disclaimer")}</p>
		</>
	);
}

function* range(a: number, b?: number) {
	const from = b === undefined ? 0 : a;
	const to = b === undefined ? a : b;

	for (let i = from; i < to; i++) {
		yield i;
	}
}
