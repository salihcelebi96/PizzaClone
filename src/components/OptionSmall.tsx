import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className='flex h-20 flex-col items-center gap-7 my-2 mb-10'>
      <Slider {...settings}>
        {compact.map((item, index) => (
          <div className='gap-5 hover:scale-110 hover:text-red-600 duration-500' key={index}>
            <Link to={`/${item.optionPath}`} className='h-full'>
              <img className='h-full px-1' src={item.image} alt={item.optionText} />
              <p className='text-center font-semibold'>{item.optionText}</p>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Options;
