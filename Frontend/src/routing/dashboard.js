import { createRoute } from "@tanstack/react-router";
import Dashboard from "../pages/Dashboard";
import { rootRoute } from "./route_tree";

export const dashboardRoute=createRoute({
    getParentRoute:()=> rootRoute,
    path:'/dashboard',
    component: Dashboard
}) 