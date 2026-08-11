import { createRootRoute } from "@tanstack/react-router"
import App from "../App"
import { homepageRoute } from "./homepage"
import { authRoute } from "./auth_route"
import { dashboardRoute } from "./dashboard"

export const rootRoute= createRootRoute({
    component : App
})

export const routeTree=rootRoute.addChildren([
    homepageRoute,
    authRoute,
    dashboardRoute])