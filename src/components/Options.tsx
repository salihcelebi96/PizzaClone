import React from 'react';

import drinks from "../assets/options/drinksImg.png";
import kampanyalar from "../assets/options/kampanyalarImg.png";
import pizzalar from "../assets/options/pizzalarImg.png";
import tatlılar from "../assets/options/tatlıImg.png";
import wings from "../assets/options/wingstreetImg.png";
import yanurunler from "../assets/options/yanurnImg.png";
import { Link } from "react-router-dom";

const Image = [kampanyalar, pizzalar, wings, yanurunler, tatlılar, drinks];
const option = ["Kampanyalar", "Pizzalar", "WingStreet", "Yan Ürünler", "Tatlılar", "İçecekler"];
const optionPath = ["kampanyalar", "pizzalar", "wingStreet", "yanurunler", "tatlılar", "icecekler"];

const compact = Image.map((img, index) => ({
  image: img,
  optionText: option[index],
  optionPath: optionPath[index]
}));

const Options: React.FC = () => {
  return (
    <div className='flex flex-col items-center gap-7 my-2 '>
      <div className=''>
        <div className='grid grid-cols-6 mb-10  '>
          {compact.map((item, index) => (
            <div className='gap-5 hover:scale-110 hover:text-red-600 duration-500 ' key={index}>
              <Link to={`/${item.optionPath}`}>
                <img className='px-1' src={item.image} alt={item.optionText} />
                <p className='text-center font-semibold'>{item.optionText}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Options;
