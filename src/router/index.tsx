import { RouteObject } from "react-router-dom";
import { PATH } from "constant";
import { AdminLayout, AuthLayout, MainLayouts, ManageBookingTemplate, ManageLocationTemplate, ManageRoomTemplate, ManageUserTemplate, RoomDetailTemplate } from "components";
import { Home, Login, Register, Room, User } from "pages";
import { Booking } from "pages/Booking";

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
    },
    {
        element: <MainLayouts />,
        children: [
            {
                element: <Home />,
                path: PATH.home,
            },
            {
                element: <Room />,
                path: PATH.room,
            },
            {
                element: <RoomDetailTemplate />,
                path: PATH.roomDetail
            }
            ,
            {
                element: <User />,
                path: PATH.userDetail,
            },
            {
                element: <Booking />,
                path: PATH.bookingDetail,
            },
            
        ]
    },
    {
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <ManageUserTemplate />,
                path: PATH.manageUser
            },
            {
                element: <ManageLocationTemplate />,
                path: PATH.manageLocation
            },
            {
                element: <ManageRoomTemplate />,
                path: PATH.manageRoom
            },
            {
                element: <ManageBookingTemplate />,
                path: PATH.manageBooking
            }
        ]
    }
]