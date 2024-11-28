import React from "react";
import { Link } from "react-router-dom";

export default function TimetableView() {
	return (
		<div>
			<h1>rozklad jazdy w robocie</h1>
			<Link to={"/"}>
				<button>Go back</button>
			</Link>
		</div>
	);
}
