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
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComp />,
    children: [
      { path: "/", element: <Lmain /> },
      { path: "/login", element: <UserLogin /> },
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
      { path: "/product/:id", element: <ProductsDetails /> }
    ],
  },
  {
    path: "/admin",
    element: <AdminPageLayout />,
    children: [{ path: "", element: <ProductCategoriesManager />, },
    { path: "product-management", element: <ProductsManager />, }],
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
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <WishListProvider>
        <RouterProvider router={router} />
      </WishListProvider>
    </AuthProvider>
  );
}
