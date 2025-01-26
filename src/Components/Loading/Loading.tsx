import React from "react";
import { useTranslation } from "react-i18next";

import style from "./Loading.module.css";

export default function Loading() {
	const { t } = useTranslation();

	return (
		<p className={style.loading}>
			{t("loading")} <span className={style.ellipsis}>.</span>
			<span className={style.ellipsis}>.</span>
			<span className={style.ellipsis}>.</span>
		</p>
	);
}
