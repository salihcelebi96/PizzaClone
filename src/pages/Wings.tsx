import React, { useEffect,useState } from 'react'
import { WingsData } from "../reducers/WingsSlice";
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { pushNewWings } from '../reducers/WingsSlice';
import { RootState } from '../redux/store';
import {Link} from "react-router-dom";
import { pushNewItems, SepetData} from "../reducers/sepetSlice";

const Wings: React.FC = () => {
  const dispatch = useDispatch();
  const [sepet, setSepet] = useState<string>("");
  
  
  const handleBasket = (item: WingsData) => {
    const newSepetData: SepetData = {
      _id: item.id,
      tür: item.tür,
      fiyatlar: item.Fiyat,
      url: item.Url,
    };

   
    dispatch(pushNewItems([newSepetData]));

    console.log(sepet)
    setSepet("Yeni veri eklendi");
  };




  interface ExtendedImportMeta extends ImportMeta {
    env: {
      VITE_APP_URL: string;
      // Diğer ortam değişkenleri buraya eklenebilir
    };
  }
  
  const apiUrl = (import.meta as ExtendedImportMeta).env.VITE_APP_URL;


  useEffect(() => {
    axios.get<WingsData[]>(`${apiUrl}/wings`)
      .then((response: AxiosResponse<WingsData[]>) => {
        if (Array.isArray(response.data)) {
          response.data.forEach(wing => {
            dispatch(pushNewWings(wing));
          });
        } else {
          console.error('Error fetching data: Data is not an array');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  const data = useSelector((state: RootState) => state.wings.wings)

  return (
    <div className='grid sm:grid-cols-2 text-xl font-semibold  m-16 md:grid-cols-4 justify-center gap-5'>
    {data.map((item: WingsData) => (
      <div  key={item.id} className='border hover:scale-105 duration-300' >
        <div className='h-64 items-center flex justify-center p-2 my-2'>
          <div className='flex flex-col justify-center gap-3 items-center'>
            <div>{item.tür}</div>
            
            <div className=''> 
            <img src={item.Url}  className='w-40' /> 
            </div>
            <div className='text-base'> {item.Açıklama} </div>
            <div className=''>{item.Fiyat} TL
            </div>
          </div>
        </div>
        <div  onClick={()=> handleBasket(item)} className='border p-1 px-3 flex justify-center hover:bg-red-400 bg-red-600 text-white'>
          <Link className='w-full h-full text-center' to="/sepet">Sipariş Ver</Link>
        </div>
      </div>
    ))}
  </div>
  
  
  )
}

export default Wings