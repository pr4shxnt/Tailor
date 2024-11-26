// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cardshandler from './Components/Cards/Cardshandler';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Navbar from './Components/Navbar/Navbar';
import Contact from './Components/Contact/Contact'; // Import the Contact component
import Lmain from './Components/Landingpage/Lmain';
import Login from './Components/Log-in/Login';
import Register from './Components/Register/Register';
import Homepage from './Components/Landingpage/Homepage/Homepage';
import AboutUSmp from './Components/AboutCard/AboutUSmp';
import CartScreen from './Components/Cart/CartScreen';







const App = () => {


  return (



    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Lmain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Homepage />} />
        <Route path="/shop" element={<Cardshandler />} />
        <Route path="/product/:id" element={<ProductDetails />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUSmp/>} />
          <Route path="/cart" element={<CartScreen />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
