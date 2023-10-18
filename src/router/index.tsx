import { RouteObject } from "react-router-dom";
import { PATH } from "constant";
import { AuthLayout } from "components";
import { Login, Register } from "pages";

export const router: RouteObject[] = [
    {
        element: <AuthLayout />,
        children: [
            {
                element: <Login />,
                path: PATH.login
            },
            {
                element: <Register />,
                path: PATH.register
            }
        ]
    }
]