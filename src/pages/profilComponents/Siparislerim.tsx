import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {Link} from "react-router-dom";



const Siparislerim: React.FC = () => {
  const orderedItems = useSelector((state: RootState) => state.sepet.ordered);
  const [listOrdered, setListOrdered] = useState([] as typeof orderedItems[]);
  const containerRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    
    setListOrdered(prevList => [...prevList, orderedItems]);
    
    return () => {
      setListOrdered([]);
    };
  }, [orderedItems]);

  return (
    <div className='w-full relative h-full'>
      <div className='ordered-container  flex justify-center   overflow-y-auto h-[577px] my-5 ' ref={containerRef}>
        <div className=' '>
          <h1 className=' text-2xl flex font-bold  font-serif'></h1>
          {orderedItems.length == 0 ? (
            <div className='' style={{fontFamily: "Rubik-Bold,"}}> <p> Henüz bir sipariş bulunmamaktadır.</p>
           <Link to="/" className='bg-red-500 hover:bg-red-600 text-white w-[166PX] cursor-pointer h-[51px] rounded-full border pt-3 text-center  inline-block text-base mt-5' style={{ fontFamily: 'Roboto, sans-serif' }}>Siparişe Başla</Link>

            </div>
            
          ) : (
            <div className='text-center text-2xl text-red-500 font-bold '>Siparişlerim</div>
          )}
        
        </div>
        
        {listOrdered.map((items, index) => (
          <div key={index} className="ordered-row items-center   flex flex-col gap-8">
            {items.map((item, idx) => (
              <div key={idx} className="ordered-item text-center py-10 w-96 m-5">
                <p>Tür: {item.tür}</p>
                <p>Fiyat: {item.fiyatlar} TL</p>
                <img src={item.url} alt="Ürün resmi" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Siparislerim;
