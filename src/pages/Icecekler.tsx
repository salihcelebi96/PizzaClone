import React, { useEffect, useState } from 'react';
import { IceceklerData } from '../reducers/iceceklerSlice';
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { pushNewIcecek } from '../reducers/iceceklerSlice';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { tatlıData } from '../reducers/tatlıSlice';
import { pushNewTatlı } from '../reducers/tatlıSlice';
import { pushNewItems, SepetData } from '../reducers/sepetSlice';
import Loading from "../components/Loadings";


const Icecekler: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const [sepet, setSepet] = useState<string>("");

  interface ExtendedImportMeta extends ImportMeta {
    env: {
      VITE_APP_URL: string;
    };
  }

  const apiUrl = (import.meta as ExtendedImportMeta).env.VITE_APP_URL;

  

  const handleBasket = (item: IceceklerData) => {
    const newSepetData: SepetData = {
      _id: item._id,
      tür: item.tür,
      fiyatlar: item.fiyat,
      url: item.url,
    };

    dispatch(pushNewItems([newSepetData]));

    console.log(sepet);

    setSepet("Yeni veri eklendi");
  };

  useEffect(() => {
    axios
      .get<IceceklerData[]>(`${apiUrl}/api/icecekler`)
      .then((response: AxiosResponse<IceceklerData[]>) => {
        dispatch(pushNewIcecek(response.data));
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get<tatlıData[]>(`${apiUrl}/api/tatlilar`)
      .then((response: AxiosResponse<tatlıData[]>) => {
        dispatch(pushNewTatlı(response.data));
        
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const data = useSelector((state: RootState) => state.icecekler.icecekler);

  
  useEffect(() => {
    if(data.length > 0) {
      setLoading(false);
  }
  },[data]);


  




  return (
    <div className='m-10'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='text-2xl py-1 font-semibold'>
            İçecekler
          </div>
          <div className='grid sm:grid-cols-2 text-xl font-semibold md:grid-cols-4 justify-center gap-5'>
            {data.map((item: IceceklerData) => (
              <div className='border hover:scale-105 duration-300' key={item._id}>
                <div className='h-64 items-center flex justify-center p-2 my-2'>
                  <div className='flex flex-col justify-center gap-3 items-center'>
                    <div>{item.tür}</div>

                    <div className=''>
                      <img src={item.url} className='w-40' alt={item.tür} />
                    </div>

                    <div>{item.fiyat} TL</div>
                  </div>
                </div>
                <div onClick={() => handleBasket(item)} className='border p-1 px-3 flex justify-center hover:bg-red-400 bg-red-600 text-white'>
                  <Link className='w-full h-full text-center' to='/sepet'>Sipariş Ver</Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Icecekler;
