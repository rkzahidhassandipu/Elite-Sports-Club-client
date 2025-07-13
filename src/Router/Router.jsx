import { createBrowserRouter, RouterProvider } from "react-router";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/Login/Login";
import Profile from "../Component/Profile/Profile";
import Courts from "../Pages/courts/Courts/Courts";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import PendingBookings from "../Pages/Dashboard/PendingBookings/PendingBookings";
import ApprovedBookings from "../Pages/Dashboard/ApprovedBookings/ApprovedBookings";
import ConfirmedBookings from "../Pages/Dashboard/ConfirmedBookings/ConfirmedBookings";
import PaymentPage from "../Pages/Dashboard/PaymentPage/PaymentPage";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import BookingApproval from "../Pages/Dashboard/Admin/BookingApproval/BookingApproval";
import ManageMember from "../Pages/Dashboard/Admin/ManageMember/ManageMember";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import ManageCourts from "../Pages/Dashboard/Admin/ManageCourts/ManageCourts";
import ManageBookings from "../Pages/Dashboard/Admin/ManageBookings/ManageBookings";
import MakeAnnouncement from "../Pages/Dashboard/Admin/MakeAnnouncement/MakeAnnouncement";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons/ManageCoupons";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'courts',
        Component: Courts,
      },
    ],
  },

  {
    path: 'dashboard',
    Component: DashboardLayout,
    children:[
      {
        path: "pending-bookings",
        Component: PendingBookings
      },
      {
        path: "profile",
        Component: Profile
      },
      {
        path: "approved-bookings",
        Component: ApprovedBookings
      },
      {
        path: "confirmed-bookings",
        Component: ConfirmedBookings
      },
      {
        path: "payment-page/:id",
        Component: PaymentPage
      },
      {
        path: "payment-history",
        Component: PaymentHistory
      },
      {
        path: "admin/manage-booking-approval",
        Component: BookingApproval
      },
      {
        path: "admin/manage-members",
        Component: ManageMember
      },
      {
        path: "admin/all-users",
        Component: AllUsers
      },
      {
        path: "admin/manage-courts",
        Component: ManageCourts
      },
      {
        path: "admin/manage-bookings",
        Component: ManageBookings
      },
      {
        path: "admin/manage-coupons",
        Component: ManageCoupons
      },
      {
        path: "admin/make-announcement",
        Component: MakeAnnouncement
      },
    ]
  },
  {
    path: "Register",
    Component: Register,
  },
  {
    path: "login",
    Component: Login,
  },
]);
