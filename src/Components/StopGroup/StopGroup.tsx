import React, { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

import { VehicleType } from "../../api.ts";
import { get_stop_icon, get_type_name } from "../../util.ts";
import style from "./StopGroup.module.css";

export default function StopGroup({
	name,
	types,
	children,
}: {
	name: string;
	types: VehicleType[];
	children: ReactNode;
}) {
	const { t } = useTranslation();
	const [expanded, setExpanded] = useState(false);

	return (
		<>
			<div className={style.group} onClick={() => setExpanded((e) => !e)}>
				<div className={style.header}>
					{types.map((type) => (
						<img
							key={type}
							className={style.icon}
							src={get_stop_icon(type)}
							alt={t(`stop-type.${get_type_name(type)}`)}
						/>
					))}
					<span className={style.name}>{name}</span>
				</div>

				{expanded ? (
					<svg
						width="48"
						height="48"
						viewBox="0 0 48 48"
						xmlns="http://www.w3.org/2000/svg"
						className={style.arrow}
					>
						<path
							fill="currentColor"
							d="m24 26.4 9.2-9.2L36 20 24 32 12 20l2.8-2.8 9.2 9.2Z"
						/>
					</svg>
				) : (
					<svg
						width="48"
						height="48"
						viewBox="0 0 48 48"
						xmlns="http://www.w3.org/2000/svg"
						className={style.arrow}
					>
						<path
							fill="currentColor"
							d="m24 21.6-9.2 9.2L12 28l12-12 12 12-2.8 2.8-9.2-9.2Z"
						/>
					</svg>
				)}
			</div>

			{expanded ? children : null}
		</>
	);
}
