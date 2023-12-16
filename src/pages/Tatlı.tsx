import React from 'react';

import {  useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { tatlıData } from '../reducers/tatlıSlice';


const Tatlılar: React.FC = () => {
  

 

 
  
  

  const data = useSelector((state: RootState) => state.tatlılar.tatlılar);
  


  return (
    <div className='m-10'>
      <div className='text-2xl py-1 font-semibold'>
        Tatlılar
      </div>
      <div className='grid sm:grid-cols-2 text-xl font-semibold  md:grid-cols-4   justify-center gap-5'>
      {data.map((item:  tatlıData) => (
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


    </div>
    
  );
};

export default Tatlılar;
