import { RouteObject } from "react-router-dom"
import homeRoutes from "../../main/home/home.routes"

const routes = () => {
    const all_routes : RouteObject[] = [
        ...homeRoutes
    ]
    return all_routes
}

export default routes
