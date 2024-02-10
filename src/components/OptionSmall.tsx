import React from 'react';

import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css'; // İsteğe bağlı animasyon
import { Link } from "react-router-dom";
import drinks from "../assets/options/drinksImg.png";
import kampanyalar from "../assets/options/kampanyalarImg.png";
import pizzalar from "../assets/options/pizzalarImg.png";
import tatlılar from "../assets/options/tatlıImg.png";
import wings from "../assets/options/wingstreetImg.png";
import yanurunler from "../assets/options/yanurnImg.png";
import "../css/option.css";

const Options: React.FC = () => {
  const options = [
    { image: kampanyalar, text: "Kampanyalar", path: "kampanyalar" },
    { image: pizzalar, text: "Pizzalar", path: "pizzalar" },
    { image: wings, text: "WingStreet", path: "wingStreet" },
    { image: yanurunler, text: "Yan Ürünler", path: "yanurunler" },
    { image: tatlılar, text: "Tatlılar", path: "tatlılar" },
    { image: drinks, text: "İçecekler", path: "icecekler" }
  ];

  return (
    <div className='flex cont overflow-scroll     items-center gap-7 my-2'>
      {options.map((option, index) => (
        <div key={index} className='gap-5 hover:scale-110   hover:text-red-600 duration-500'>
          <Link to={`/${option.path}`} className="">
            <img className='' src={option.image} alt={option.text} />
            <p className='text-center font-semibold'>{option.text}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Options;
