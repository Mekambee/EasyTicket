import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePageView from "../HomePage/HomePageView";
import MyTicketsView from "../MyTickets/MyTicketsView";
import BuyTicketView from "../BuyTicket/BuyTicketView";
import SearchRouteView from "../SearchRoute/SearchRouteView";
import TimetableView from "../Timetable/TimetableView.tsx";
import OuterSiteView from "../OuterSite/OuterSiteView";
import YourTicketView from "../YourTicketView/YourTicketView";

const AppRoutes = () => {
	return (
		// <Router>
			<Routes>
				<Route path="/" element={<HomePageView></HomePageView>}></Route>
				<Route
					path="/buy-ticket"
					element={<BuyTicketView></BuyTicketView>}
				></Route>
				<Route
					path="/my-tickets"
					element={<MyTicketsView></MyTicketsView>}
				></Route>
				<Route
					path="/search-route"
					element={<SearchRouteView></SearchRouteView>}
				></Route>
				<Route
					path="/timetable"
					element={<TimetableView></TimetableView>}
				></Route>
				<Route
					path="/outer-site"
					element={<OuterSiteView></OuterSiteView>}
				></Route>
				<Route
					path="/your-ticket"
					element={<YourTicketView></YourTicketView>}
				></Route>
			</Routes>
		// </Router>
	);
};

export default AppRoutes;
