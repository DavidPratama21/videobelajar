import { createBrowserRouter} from "react-router"
import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"
import Login from "../features/auth/pages/Login"
import Payment from "../features/payment/pages/Payment"
import Home from "../pages/Home/Home"
import Category from "../pages/Category/Category"

export const router = createBrowserRouter([
    {
        path: "/",
        element:<Home />
    },
    {
        path: "/kategori",
        element: <Category />
    }
    ,{
        path: "/login",
        element:(
            <PublicRoute>
                <Login />
            </PublicRoute>
        )
    },{
        path: "/payment", //metode
        element:(
            <ProtectedRoute>
                <Payment />
            </ProtectedRoute>
        )
    }
])