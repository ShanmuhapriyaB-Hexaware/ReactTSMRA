import homeRoutes from '../views/home/homeRoutes'
import { Navigate } from 'react-router-dom'

export const AllPages = () => {
    const all_routes = [
        {
            element: <" " />,
            children: [...homeRoutes]
        },
    ]
    return all_routes
}
