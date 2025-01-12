import React from "react";
import style from "./Loading.module.css";

export default function Loading() {
	return (
		<p className={style.loading}>
			Ładowanie {/* Loading */} <span className={style.ellipsis}>.</span>
			<span className={style.ellipsis}>.</span>
			<span className={style.ellipsis}>.</span>
		</p>
	);
}
