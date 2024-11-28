import React from "react";
import { Link } from "react-router-dom";

export default function SearchRouteView() {
	return (
		<div>
			<h1>wyszukiwanie trasy w robocie</h1>
			<Link to={"/"}>
				<button>Go back</button>
			</Link>
		</div>
	);
}
