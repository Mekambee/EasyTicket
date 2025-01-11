import React, { Component, createContext, createRef, ReactNode } from "react";
import { navigate } from "wouter/use-hash-location";
import { effect, Signal, signal } from "@preact/signals-react";
import { GeoJsonObject, Geometry } from "geojson";
import L from "leaflet";
import Loading from "../Loading/Loading.tsx";
import {
	get_vehicles,
	get_stops,
	get_info,
	VehicleType,
	get_shape,
} from "../../api.ts";
import { cmp, get_stop_icon, get_vehicle_icon } from "../../util.ts";
import layers from "../../layers.json";
import style from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import "../../Styles/Map.css";

export const MapCtx = createContext<{
	map: L.Map;
	highlighted: Signal<string[]>;
	shapes: Signal<[string, string | undefined][]>;
	geojson: Signal<(GeoJsonObject & { color?: string })[]>;
} | null>(null);

export default class Map extends Component<
	{
		children: ReactNode;
		system: string;
	},
	{ map_init: boolean }
> {
	private map: L.Map | undefined;
	private map_container = createRef<HTMLElement>();
	private highlighted = signal<string[]>([]);
	private shapes = signal<[string, string | undefined][]>([]);
	private geojson = signal<(Geometry & { color?: string })[]>([]);
	private shape_lines: L.GeoJSON = L.geoJSON(null, {
		style: (feature: unknown) => {
			const f = feature as object;
			if ("color" in f) {
				return { color: `#${f.color}` };
			} else if ("geometry" in f && "color" in (f.geometry as object)) {
				return { color: `#${(f.geometry as { color: unknown }).color}` };
			} else {
				return {};
			}
		},
	});
	private stops: { [id in string]?: L.Marker } = {};
	private intervals: ReturnType<typeof setInterval>[] = [];

	constructor(props: { children: ReactNode; system: string }) {
		super(props);
		this.state = { map_init: false };
	}

	componentDidMount() {
		this.set_up_map();
		this.set_up_markers();
	}

	componentDidUpdate({ system: old_system }) {
		if (old_system !== this.props.system) {
			this.map?.remove();
			this.intervals.forEach((int) => clearInterval(int));

			this.set_up_map();
			this.set_up_markers();
		}
	}

	componentWillUnmount() {
		this.map?.remove();
		this.map = undefined;
		this.intervals.forEach((int) => clearInterval(int));
	}

	render() {
		return (
			<div className={style.wrapper}>
				<section className={style.sidebar}>
					{this.state.map_init ? (
						<MapCtx.Provider
							value={{
								map: this.map!,
								highlighted: this.highlighted,
								shapes: this.shapes,
								geojson: this.geojson,
							}}
						>
							{this.props.children}
						</MapCtx.Provider>
					) : (
						<Loading />
					)}
				</section>
				<section ref={this.map_container} className={style.map}></section>
			</div>
		);
	}

	private set_up_map() {
		const maps = Object.fromEntries(
			layers.maps.map((l) => [
				`<img src="${l.url.replace(/\{[rsxyz]\}/gu, (m) =>
					(layers.icon as { [key: string]: { toString: () => string } })[
						m
					].toString()
				)}" class="map-layer-icon" /> <span class="map-layer-name">${
					l.name
				}</span>`,
				L.tileLayer(l.url, {
					crossOrigin: "anonymous",
					attribution: l.attribution,
				}),
			])
		);

		const overlays = Object.fromEntries(
			layers.overlays.map((l) => [
				`<img src="${l.url.replace(/\{[rsxyz]\}/gu, (m) =>
					(layers.icon as { [key: string]: { toString: () => string } })[
						m
					].toString()
				)}" class="map-layer-icon" /> <span class="map-layer-name">${
					l.name
				}</span>`,
				L.tileLayer(l.url, {
					crossOrigin: "anonymous",
					attribution: l.attribution,
				}),
			])
		);

		if (this.map_container.current === null) {
			return;
		}

		this.map = L.map(this.map_container.current, {
			center: [0, 0],
			zoom: 2,
			layers: [Object.values(maps)[0]],
			zoomControl: true,
		});

		L.control.layers(maps, overlays, { autoZIndex: false }).addTo(this.map);
		this.shape_lines.addTo(this.map);
		L.control
			.scale({
				imperial: false,
				maxWidth: 300,
			})
			.addTo(this.map);

		get_info(this.props.system).then((info) => {
			if (info?.location !== undefined) {
				this.map?.flyToBounds(info.location);
			}
		});

		effect(() => {
			this.shape_lines.clearLayers();
			let current = true;

			this.geojson.value.forEach((o) => {
				if (current) {
					this.shape_lines.addData(o);
				}
			});

			this.shapes.value.forEach(([s, c]) => {
				get_shape(this.props.system, s).then((res) => {
					if (res !== undefined && current) {
						this.shape_lines.addData({
							...res,
							color: c,
						} as GeoJsonObject);
					}
				});
			});

			return () => {
				current = false;
			};
		});

		this.setState({ map_init: true });
	}

	private set_up_markers() {
		get_stops(this.props.system).then((stops) => {
			if (stops !== undefined && this.map !== undefined) {
				const map = this.map;
				const zoom = Math.pow(map.getZoom() / 22, 3);

				for (const stop of stops) {
					this.stops[stop.id] = L.marker([stop.lat, stop.lon], {
						alt: stop.name,
						title: `${stop.name} (${[
							...new Set(Object.values(stop.lines).map((l) => l!.name)),
						]
							.sort((a, b) => cmp([a], [b]))
							.join(", ")})`,
						draggable: false,
						icon: L.icon({
							iconUrl: get_stop_icon(stop.types[0] ?? VehicleType.Other),
							iconSize: [zoom * 48, zoom * 64],
						}),
					})
						.addTo(map)
						.on("click", () =>
							navigate(`/timetable/${this.props.system}/stop/${stop.id}`)
						);
				}

				const resize = () => {
					const zoom = Math.pow(map.getZoom() / 22, 3);

					for (const [id, marker] of Object.entries(this.stops)) {
						marker?.setIcon(
							L.icon({
								iconUrl: marker.getIcon().options.iconUrl!,
								iconSize: this.highlighted.value.includes(id)
									? [2 * zoom * 48, 2 * zoom * 64]
									: [zoom * 48, zoom * 64],
							})
						);

						marker?.closePopup();
						if (
							marker?.options?.alt &&
							this.highlighted.value.includes(id) &&
							this.highlighted.value.length > 1
						) {
							marker
								?.bindPopup(marker.options.alt, {
									autoClose: false,
									interactive: false,
									keepInView: false,
									className: "map-transit-stop-popup",
								})
								?.openPopup();
						}
					}
				};

				map.on("zoomend", resize);
				effect(resize);
			}
		});

		get_vehicles(this.props.system).then((vehicles) => {
			if (vehicles !== undefined && this.map !== undefined) {
				const map = this.map;
				const vehicle_markers = new globalThis.Map<string, L.Marker>();

				const zoom = Math.pow(map.getZoom() / 22, 3);

				for (const vehicle of vehicles) {
					vehicle_markers.set(
						vehicle.id,
						L.marker([vehicle.lat, vehicle.lon], {
							title: `${vehicle.line_name} ${vehicle.headsign} (${vehicle.name})`,
							draggable: false,
							icon: L.icon({
								iconUrl: get_vehicle_icon(vehicle.type),
								iconSize: [zoom * 64, zoom * 64],
							}),
						})
							.addTo(map)
							.on("click", () =>
								navigate(`/timetable/${this.props.system}/line/${vehicle.line}`)
							)
					);
				}

				map.on("zoomend", () => {
					const zoom = Math.pow(map.getZoom() / 22, 3);

					for (const marker of vehicle_markers.values()) {
						marker.setIcon(
							L.icon({
								iconUrl: marker.getIcon().options.iconUrl!,
								iconSize: [zoom * 64, zoom * 64],
							})
						);
					}
				});

				this.intervals.push(
					setInterval(async () => {
						const vehicles = (await get_vehicles(this.props.system)) ?? [];

						for (const [id, marker] of vehicle_markers) {
							if (vehicles.find((v) => v.id === id) === undefined) {
								marker.remove();
								vehicle_markers.delete(id);
							}
						}

						for (const vehicle of vehicles) {
							const marker = vehicle_markers.get(vehicle.id);

							if (marker !== undefined) {
								marker.setLatLng([vehicle.lat, vehicle.lon]);
							} else {
								const zoom = Math.pow(map.getZoom() / 22, 3);

								vehicle_markers.set(
									vehicle.id,
									L.marker([vehicle.lat, vehicle.lon], {
										title: `${vehicle.line_name} ${vehicle.headsign} (${vehicle.name})`,
										draggable: false,
										icon: L.icon({
											iconUrl: get_vehicle_icon(vehicle.type),
											iconSize: [zoom * 64, zoom * 64],
										}),
									})
										.addTo(map)
										.on("click", () =>
											navigate(
												`/timetable/${this.props.system}/line/${vehicle.line}`
											)
										)
								);
							}
						}
					}, 5000)
				);
			}
		});
	}
}
