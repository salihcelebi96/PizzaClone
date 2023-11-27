import React from 'react'
import drinks from "../assets/options/drinksImg.png";
import kampanyalar from "../assets/options/kampanyalarImg.png";
import pizzalar from "../assets/options/pizzalarImg.png";
import tatlılar from "../assets/options/tatlıImg.png";
import wings from "../assets/options/wingstreetImg.png";
import yanurunler from "../assets/options/yanurnImg.png";

const Image = [ kampanyalar,pizzalar,wings,yanurunler, tatlılar,drinks];
const option =["Kampanyalar", "Pizzalar", "WingStreet","Yan Ürünler", "Tatlılar", "İçecekler"];
const compact = Image.map((img, index) => ({
    image: img,
    optionText: option[index],
  }));
const Options:React.FC = () => {
  return (
    <div className='flex flex-col items-center gap-7 my-10  '>
        <div className='flex w-[1100px]'>
             <h3 className='text-center font-semibold text-xl '>Siparişe Başla</h3>
        </div>
       <div className='flex justify-center'>
        <div className='flex   w-[1100px]'>
      {compact.map((item, index) => (
        <div className='gap-5 hover:scale-110  hover:text-red-600 duration-500' key={index}>
          <img src={item.image} alt={item.optionText} />
          <p className='text-center font-semibold'>{item.optionText}</p>
        </div>
      ))}
    </div>
       </div>
        
    </div>
  )
}

export default Options;
