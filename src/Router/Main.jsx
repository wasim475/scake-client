import {
  createBrowserRouter,
} from "react-router-dom";
import Root from '../RootLayout/Root';
import Home from '../pages/Home/Home';
import ShopPage from '../pages/Shop/Shop';
import CakeDetailPage from '../pages/cake-details/CakeDetails.jsx';
import CartPage from '../pages/Cart-CheckOut/CartPage.jsx';
import CheckOut from '../pages/Cart-CheckOut/CheckOut.jsx';
import ProfileDashboard from '../pages/ProfileSignInSignUp/Profile.jsx';
import LoginPage from '../pages/ProfileSignInSignUp/Login.jsx';
import SignupPage from '../pages/ProfileSignInSignUp/SignUp.jsx';
import OrderHistory from '../pages/OrderHistry/OrderHIstry.jsx';
import ErrorPage from '../pages/ErrorPage/ErrorPage.jsx';
import CustomOrderPage from '../pages/CustomOrderPage/CustomOrderPage.jsx';
import AdminLayout from '../AdminLayouts/AdminLayouts.jsx';
import DashboardHome from '../AdminLayouts/Pages/DashboardHome.jsx';
import ManageCakes from '../AdminLayouts/Pages/ManageCakes.jsx';
import ManageOrders from '../AdminLayouts/Pages/ManageOrders.jsx';
import { ManageUsers, ManageCoupons, ManageReviews } from "../AdminLayouts/Pages/AdminPages.jsx";
import ManageCustomOrders from '../AdminLayouts/Pages/ManageCustomOrder.jsx';
import LoadingPage from '../components/Loading.jsx';
import TestPage from '../pages/TestPage/TestPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children:[
        {
            path:'/',
            element: <Home/>
        },
        {
            path:'/test',
            element: <TestPage/>
        },
        {
            path:'/shop',
            element: <ShopPage/>
        },
        {
            path:'/shop:id',
            element: <ShopPage/>
        },
        {
            path:'/ckd',
            element: <CakeDetailPage/>
        },
        {
            path:'/cart',
            element: <CartPage/>
        },
        {
            path:'/check-out',
            element: <CheckOut/>
        },
        {
            path:'/custom-order',
            element: <CustomOrderPage/>
        },
        {
            path:'/order-history',
            element: <OrderHistory/>
        },
        {
            path:'/profile',
            element: <ProfileDashboard/>
        },
        {
            path:'/sign-up',
            element: <SignupPage/>
        },
        {
            path:'/login',
            element: <LoginPage/>
        },
    ]
  },
//   Admin Pannel
{
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <DashboardHome />
      },
      {
        path: "cakes",
        element: <ManageCakes />
      },
      {
        path: "orders",
        element: <ManageOrders />
      },
      {
        path: "custom-order",
        element: <ManageCustomOrders />
      },
      {
        path: "users",
        element: <ManageUsers />
      },
      {
        path: "coupons",
        element: <ManageCoupons />
      },
      {
        path: "reviews",
        element: <ManageReviews />
      },
      {
        path: "settings",
        element: <LoadingPage />
      },
      // future routes
      // {
      //   path: "products",
      //   element: <ManageProducts />
      // }
    ]
  }
]);

export default router
