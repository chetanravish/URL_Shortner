import { createRoute } from "@tanstack/react-router";
import Homepage from "../pages/Homepage";
import { rootRoute } from "./route_tree";

export const homepageRoute=createRoute({
    getParentRoute:()=> rootRoute,
    path:'/',
    component: Homepage
})  