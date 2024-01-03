import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { RootState } from '../redux/store';
import { SepetData } from '../reducers/sepetSlice';

const Sepet: React.FC = () => {
  const data = useSelector((state: RootState) => state.sepet.items);

  return (

    <div>
      <div className='grid sm:grid-cols-2  text-xl font-semibold mx-10 md:grid-cols-4 justify-center '>
        {data.map((item: SepetData) => (
          <div className='' key={item._id}>
            <div className='  flex  p-2 my-2'>
              <div className='flex    items-center'>
                <div>{item.tür}</div>
                <div> <img src={item.url} alt={item.tür} className='w-40' /> </div>
                <div>{item.fiyatlar} TL</div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>

  )
}

export default Sepet
