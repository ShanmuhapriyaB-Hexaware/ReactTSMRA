import { Navigate, RouteObject } from "react-router-dom"
import homeRoutes from "../../main/home/home.routes"
import  RedirectHere  from "../../common/components/RedirectHere"
import NotAuthenticated from "../../common/components/NotAuthenticated"
import UnAuthorized from "../../common/components/UnAuthorized"
import NotFound from "../../common/components/NotFound"

const routes = () => {
    const all_routes: RouteObject[] = [
        ...homeRoutes,
        { path: '/redirect-here', element: <RedirectHere /> },
        { path: '/401', element: <NotAuthenticated /> },
        { path: '/403', element: <UnAuthorized /> },
        { path: '/404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
    ]
    return all_routes
}

export default routes
