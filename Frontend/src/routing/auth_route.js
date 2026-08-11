import { createRoute } from "@tanstack/react-router";
import AuthPage from "../pages/Auth_page";
import { rootRoute } from "./route_tree";

export const authRoute=createRoute({
    getParentRoute:()=> rootRoute,
    path:'/auth',
    component: AuthPage
})