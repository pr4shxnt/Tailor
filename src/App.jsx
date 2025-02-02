// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Navbar from './Components/Navbar/Navbar';
import Contact from './Components/Contact/Contact';
import Lmain from './Components/Landingpage/Lmain';
import Login from './Components/Log-in/Login';
import Register from './Components/Log-in/Register';
import Homepage from './Components/Landingpage/Homepage/Homepage';
import AboutUSmp from './Components/AboutUSmp';
import CartScreen from './Components/Cart/CartScreen';
import Footer from './Components/Footer';
import Collection from './Components/ProductBox/Collection';
import ScrollToTop from '../essUtils/ScrollToTop';
import MasterCategory from './Components/AdminUI/MasterCategory';

const routesConfig = [
  { path: "/", element: <Lmain /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <Homepage /> },
  { path: "/category/all_collection", element: <Collection /> },
  { path: "/product/:id", element: <ProductDetails /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <AboutUSmp /> },
  { path: "/cart", element: <CartScreen /> },
  { path: "/category/:masterCategory", element: <Collection /> },
  { path: "/category/:masterCategory/:category", element: <Collection /> },
  { path: "/category/:masterCategory/:category/:subCategory", element: <Collection /> },
  { path: "/crud", element: <MasterCategory /> },
];

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <ScrollToTop />
        <Routes>
          {routesConfig.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
