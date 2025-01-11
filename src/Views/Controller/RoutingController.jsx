import React from "react";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import HomePageView from "../HomePage/HomePageView";
import MyTicketsView from "../MyTickets/MyTicketsView";
import BuyTicketView from "../BuyTicket/BuyTicketView";
import SearchRouteView from "../SearchRoute/SearchRouteView";
import TimetableView from "../Timetable/TimetableView.tsx";
import OuterSiteView from "../OuterSite/OuterSiteView";
import YourTicketView from "../YourTicketView/YourTicketView";
import TicketsFaqView from "../TicketsFAQ/TicketsFaqView.jsx";

const AppRoutes = () => {
	return (
		<Router hook={useHashLocation}>
			<Switch>
				<Route path="/">
					<HomePageView />
				</Route>
				<Route path="/buy-ticket">
					<BuyTicketView />
				</Route>
				<Route path="/my-tickets">
					<MyTicketsView />
				</Route>
				<Route path="/search-route/:system" nest>
					{({ system }) => <SearchRouteView system={system} />}
				</Route>
				<Route path="/timetable/:system" nest>
					{({ system }) => <TimetableView system={system} />}
				</Route>
				<Route path="/outer-site">
					<OuterSiteView />
				</Route>
				<Route path="/your-ticket">
					<YourTicketView />
				</Route>
				<Route path="/tickets-faq">
					<TicketsFaqView />
				</Route>
			</Switch>
		</Router>
	);
};

export default AppRoutes;
