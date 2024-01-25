import React, { useState } from 'react';
import axios from 'axios'; 
import "../css/manager.css";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PizzaDataState {
  tür: string;
  fiyatlar: {
    büyük: number;
    orta: number;
    küçük: number;
  };
  url: string;
}

const PizzaData: React.FC = () => {
  const [image, setImage] = useState<string>("");
  const [pizzaData, setPizzaData] = useState<PizzaDataState>({
    tür: '',
    fiyatlar: {
      büyük: 0,
      orta: 0,
      küçük: 0,
    },
    url: "",
  });
  const notify = () => toast("Pizza Gönderildi !  ");
  const PizzaPost = async () => {
    try {
      const apiUrl = "http://localhost:3006/pizza";
  
      const postData = {
        tür: pizzaData.tür,
        fiyatlar: {
          büyük: pizzaData.fiyatlar.büyük,
          orta: pizzaData.fiyatlar.orta,
          küçük: pizzaData.fiyatlar.küçük,
        },
        url: image || "",
      };
  
      const response = await axios.post(apiUrl, postData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      console.log("Server Response:", response.data);
      notify();
    } catch (error:any) {
      console.error('Error:', error.message);
    }
  };
  

  const convertToBase64 = (e: any) => {
    console.log(e);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const base64String = reader.result as string;
      setImage(base64String); 
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  };

  return (
    <div className=''>
      <div className='h-[500px] relative  border flex flex-col gap-5  p-5  '>
        <div className='labelStyle'>
          <label className='w-28 '>Pizza Türü</label>
          <input
            className='input '
            type="text"
            onChange={(e) => setPizzaData({ ...pizzaData, tür: e.target.value })}
          />
        </div>
        <div className='flex flex-col gap-5'>
          <div className='labelStyle '>
            <label className='w-28 '>Büyük Fiyat</label>
            <input
              className='input'
              type="text"
              onChange={(e) => setPizzaData({ ...pizzaData, fiyatlar: { ...pizzaData.fiyatlar, büyük: parseFloat(e.target.value) } })}
            />
          </div>
          <div className='labelStyle'>
            <label className='w-28 '>Orta Fiyat</label>
            <input
              className='input'
              type="text"
              onChange={(e) => setPizzaData({ ...pizzaData, fiyatlar: { ...pizzaData.fiyatlar, orta: parseFloat(e.target.value) } })}
            />
          </div>
          <div className='labelStyle'>
            <label className='w-28 '>Küçük Fiyat</label>
            <input
              className='input'
              type="text"
              onChange={(e) => setPizzaData({ ...pizzaData, fiyatlar: { ...pizzaData.fiyatlar, küçük: parseFloat(e.target.value) } })}
            />
          </div>
        </div>
        <div className='labelStyle '>
          <label className='w-28'>Image</label>
          <input
            className='input border-none  '
            type="file"
            accept='image/*'
            onChange={convertToBase64}
          />
        </div>
        <div className='absolute left-0 bottom-0 w-full '>
          <button onClick={PizzaPost} className=' hover:bg-green-400 font-semibold w-full p-1 rounded-lg text-white bg-green-600' >Pizza Ekle</button>
        </div>
      </div>
    </div>
  );
};

export default PizzaData;
