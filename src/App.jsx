// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Navbar from './Components/Navbar/Navbar';
import Contact from './Components/Contact/Contact'; // Import the Contact component
import Lmain from './Components/Landingpage/Lmain';
import Login from './Components/Log-in/Login';
import Register from './Components/Log-in/Register';
import Homepage from './Components/Landingpage/Homepage/Homepage';
import AboutUSmp from './Components/AboutUSmp';
import CartScreen from './Components/Cart/CartScreen';
import Footer from './Components/Footer';
import Collection from './Components/ProductBox/Collection';
import ScrollToTop from '../essUtils/ScrollToTop';







const App = () => {


  return (



    <BrowserRouter>
      <div>
        <Navbar />
<ScrollToTop/>
        <Routes>
          <Route path="/" element={<Lmain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Homepage />} />
        <Route path="/category/all_collection" element={<Collection/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUSmp/>} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/category/:masterCategory" element={<Collection/>} />
          <Route path="/category/:masterCategory/:category" element={<Collection/>} />
          <Route path="/category/:masterCategory/:category/:subCategory" element={<Collection/>} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
};

export default App;
