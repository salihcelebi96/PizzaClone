import React, { useEffect } from 'react';
import { YanData } from '../reducers/yanurunSlice';
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { pushNewYanUrun } from '../reducers/yanurunSlice';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';

const YanUrun: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get<YanData[]>('http://localhost:3004/yanurun')
      .then((response: AxiosResponse<YanData[]>) => {
        dispatch(pushNewYanUrun(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        
      });
  }, []);
  
  

  const data = useSelector((state: RootState) => state.Yanurun.yanuruns);


  return (
    <div className='grid sm:grid-cols-2 text-xl font-semibold m-10 md:grid-cols-4 justify-center gap-5'>
      {data.map((item: YanData) => (
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
          <div className='border p-1 px-3 flex justify-center hover:bg-red-400 bg-red-600 text-white'>
            <Link to='/sepet'>Sipariş Ver</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YanUrun;
