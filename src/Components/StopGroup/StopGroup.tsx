import React, { ReactNode, useState } from "react";
import { VehicleType } from "../../api.ts";
import { get_stop_icon, get_type_name } from "../../util.ts";
import unexpand_icon from "../../assets/unexpand.svg";
import expand_icon from "../../assets/expand.svg";
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
							alt={`${get_type_name(type)} stop`}
						/>
					))}
					<span className={style.name}>{name}</span>
				</div>

				{expanded ? (
					<img className={style.arrow} src={unexpand_icon} alt="" />
				) : (
					<img className={style.arrow} src={expand_icon} alt="" />
				)}
			</div>

			{expanded ? children : null}
		</>
	);
}
