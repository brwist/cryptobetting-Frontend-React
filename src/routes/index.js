import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
// import Login from "../pages/Authentication/Login";
// import Logout from "../pages/Authentication/Logout";
// import Register from "../pages/Authentication/Register";
// import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
// Pages Calendar
import DashboardDecimalOdds from "../pages/DashboardDecimalOdds/index";
import DashboardWithRake from "../pages/DashboardWithRake/index";
import TradingViewChart from "../pages/TradingViewChart/index"
const authProtectedRoutes = [
	//Kanban Board
	// { path: "/dashboard", component: Dashboard },
	// { path: "/dashboard-decimal-odds", component: DashboardDecimalOdds },
	{ path: "/dashboard-with-rake", component: DashboardWithRake },
	{ path: "/chart", component: TradingViewChart },

	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard-with-rake" /> }
];

const publicRoutes = [
	// { path: "/logout", component: Logout },
	// { path: "/login", component: Login },
	// { path: "/register", component: Register },
];

export { authProtectedRoutes, publicRoutes };
