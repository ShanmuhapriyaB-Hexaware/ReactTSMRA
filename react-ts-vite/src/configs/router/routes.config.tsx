import { Navigate, RouteObject } from "react-router-dom"
import NotAuthenticated from "../../common/pages/NotAuthenticated"
import NotFound from "../../common/pages/NotFound"
import RedirectHere from "../../common/pages/RedirectHere"
import UnAuthorized from "../../common/pages/UnAuthorized"
import homeRoutes from "../../main/home/home.routes"
import WebLayout from "../../theme/layout/pages/Layout"
import MultiAuthProvider from "../auth/MultiAuthProvider"

const routes = () => {
    const all_routes: RouteObject[] = [
        { element: <WebLayout />, children: [...homeRoutes] },
        { path: '/redirect-here', element: <RedirectHere /> },
        { path: '/401', element: <NotAuthenticated /> },
        { path: '/403', element: <UnAuthorized /> },
        { path: '/404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: '/login', element: <MultiAuthProvider /> },
    ]
    return all_routes
}

export default routes
