import React, { useEffect } from "react";
import addidas from "../assets/marquee/addidas.png";
import nikelogo from "../assets/marquee/nike-logo.png";
import gucci from "../assets/marquee/gucci.png";
import lv from "../assets/marquee/lv.png";
import levi from "../assets/marquee/levi.png";
import supreme from "../assets/marquee/supreme.png";
import logo from "../assets/logo.png";
import balen from "../assets/marquee/balenciaga.png";
import cdior from "../assets/marquee/cdior.png";

const brands = [addidas, nikelogo, gucci, lv, levi, supreme, logo, balen, cdior];

const Marquee = () => {
  return (
    <div className="overflow-hidden w-screen">
      <div className="flex  items-center mover shadow-xl">
        {brands.concat(brands).map((img, index) => (
          <img key={index} src={img} alt="Brand" draggable={false} className="item " />
        ))}
      </div>
    </div>
  );
};

export default Marquee;
