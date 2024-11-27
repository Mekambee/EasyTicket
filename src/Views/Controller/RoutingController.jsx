import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePageView from "../HomePage/HomePageView";
import MyTicketsView from "../MyTickets/MyTicketsView";

const AppRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePageView></HomePageView>}></Route>
				<Route
					path="/my-tickets"
					element={<MyTicketsView></MyTicketsView>}
				></Route>
			</Routes>
		</Router>
	);
};

export default AppRoutes;
