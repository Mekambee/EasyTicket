import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

document.documentElement.dataset.contrast =
	localStorage.getItem("contrast") ?? "default";

document.documentElement.dataset.fontSize =
	localStorage.getItem("font-size") ?? "default";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
