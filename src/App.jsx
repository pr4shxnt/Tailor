import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./Components/Log-in/AuthProvider"; // Import AuthProvider
import Contact from "./Components/Contact/Contact";
import Lmain from "./Components/Landingpage/Lmain";
import UserLogin from "./Components/Log-in/UserLogin";
import Homepage from "./Components/Landingpage/Homepage/Homepage";
import AboutUSmp from "./Components/AboutUSmp";
import CartScreen from "./Components/Cart/CartScreen";
import Collection from "./Components/ProductBox/Collection";
import RootComp from "./Components/RootComp";
import MasterCategory from "./Components/AdminUI/MasterCategory";
import AdminPageLayout from "./admin/AdminPageLayout";
import ProductCategoriesManager from "./admin/ProductCategoriesManager";
import AdminLogin from "./admin/AdminLogin";
import AdminHandling from "./admin/admin panel/AdminManager";
import ProductsCRUD from "./admin/Products/ProductsCRUD";
import Register from "./Components/Log-in/UserRegister";
import ProductsDetails from "./Components/ProductBox/ProductsDetails";
import WishListProvider from "./Components/Wishlist/WishlistContext";
import WishListContainer from "./Components/Wishlist/WishListContainer";
import AccountRootComp from "./Components/UserAccount/AccountRootComp";
import UserDetails from "./Components/UserAccount/UserDetails";
import ProductsManager from "./Components/AdminUI/ProductsManager";
import UserDetailsMeasurement from "./Components/UserAccount/UserDetailsMeasurement";
import ContextProvider from "./Context/ContextProvider";
import MainMeasurementPage from "./Components/UserAccount/Measurement/MainMeasurementPage";
import CheckOutPage from "./Components/UserAccount/PaymentGateway/CheckOutPage";
import PaymentSuccess from "./Components/UserAccount/PaymentGateway/PaymentSuccess";
import OrdersPage from "./Components/UserAccount/Orders/OrdersPage";
import OrderTracking from "./Components/UserAccount/Orders/OrderTracking";
import ForgotPasswordPage from "./Components/Log-in/ForgotPasswordPage";




const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComp />,
    children: [{ path: "/", element: <Lmain /> },
      { path: "/login", element: <UserLogin /> },
      {path: "/forgot-password", element: <ForgotPasswordPage />},
      { path: "/register", element: <Register /> },
      { path: "/home", element: <Homepage /> },
      { path: "/category/all_collection", element: <Collection /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <AboutUSmp /> },
      { path: "/category/:masterCategory", element: <Collection /> },
      { path: "/category/:masterCategory/:category", element: <Collection /> },
      { path: "/category/:masterCategory/:category/:subCategory", element: <Collection /> },
      { path: "/crud", element: <MasterCategory /> },
      { path: "/crud2", element: <ProductsCRUD /> },
      { path: "/crud3", element: <AdminHandling /> },
      { path: "/product/:id", element: <ProductsDetails /> },
      { path: "user/payment-success", element: <PaymentSuccess/>,}
    ],
  },
  {
    path: "/admin",
    element: <AdminPageLayout />,
    children: [{ path: "category-management", element: <ProductCategoriesManager />, },
    { path: "product-management", element: <ProductsManager />, },
      { path: "user-management", element: <ProductsManager />, },
  ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/user",
    element: <AccountRootComp />,
    children: [{ path: "", element: 'damn bro' },
    { path: "wishlist", element: <WishListContainer /> },
    { path: "account", element: <UserDetailsMeasurement/> },
    { path: "cart", element: <CartScreen /> },
    {
      path: "measurement",
      element: <MainMeasurementPage/>,
    },
    {
      path: "user-checkout",
      element: <CheckOutPage/>
      
    },
    {
      path: "orders",
      element: <OrdersPage/>,
    },
    {
      path: "order-track/:orderId",
      element: <OrderTracking/>
    }
    ],
  },
 
 
]);

export default function App() {
  return (
    <AuthProvider>
      <ContextProvider>
      <WishListProvider>
        <RouterProvider router={router} />
      </WishListProvider>
      </ContextProvider>
    </AuthProvider>
  );
}
