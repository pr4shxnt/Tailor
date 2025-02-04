import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Navbar from './Components/Navbar/Navbar';
import Contact from './Components/Contact/Contact';
import Lmain from './Components/Landingpage/Lmain';
import Login from './Components/Log-in/Login';
import Register from './Components/Log-in/Register';
import Homepage from './Components/Landingpage/Homepage/Homepage';
import AboutUSmp from './Components/AboutUSmp';
import CartScreen from './Components/Cart/CartScreen';
import Collection from './Components/ProductBox/Collection';
import ScrollToTop from '../essUtils/ScrollToTop';
import MasterCategory from './Components/AdminUI/MasterCategory';
import Category from './Components/AdminUI/Category';
import RootComp from "./Components/RootComp";
import SubCategorySelect from "./Components/AdminUI/SubCategory";
import AdminPageLayout from "./admin/AdminPageLayout";
import ProductCategoriesManager from "./admin/ProductCategoriesManager";
import AdminLogin from "./admin/AdminLogin";
import AdminHandling from "./admin/admin panel/AdminManager";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootComp />, // Wraps Navbar, Footer, and renders children using <Outlet>
      children: [
        { 
          path: "/", 
          element: <Lmain /> 
        },
        { 
          path: "/login", 
          element: <Login /> 
        },
        { 
          path: "/register",
           element: <Register />
          },
        { 
          path: "/home", 
          element: <Homepage /> 
        },
        {
           path: "/category/all_collection", 
           element: <Collection /> 
        },
        { 
          path: "/product/:id", 
          element: <ProductDetails />
        },
        {
           path: "/contact", 
           element: <Contact /> 
        },
        { 
          path: "/about", 
          element: <AboutUSmp /> 
        },
        { 
          path: "/cart", 
          element: <CartScreen /> 
        },
        {
           path: "/category/:masterCategory", 
           element: <Collection /> 
        },
        { 
          path: "/category/:masterCategory/:category", 
          element: <Collection /> 
        },
        { 
          path: "/category/:masterCategory/:category/:subCategory", 
          element: <Collection /> 
        },
        { 
          path: "/crud", 
          element: <MasterCategory /> 
        },
        { 
          path: "/crud2", 
          element: <Category /> 
        },
        {
          path: "/crud3",
          element: <AdminHandling/>
        },
        {
          path: "/admin/login",
          element: <AdminLogin/>,
        }

      ],
    },
    {
      path: "/admin",
      element: <AdminPageLayout/>,
      children: [
        {
          path: "",
          element: <ProductCategoriesManager/>
        }]

    }


  ]);

  return <RouterProvider router={router} />;
}