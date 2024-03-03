import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Siparislerim: React.FC = () => {
  const orderedItems = useSelector((state: RootState) => state.sepet.ordered);
  const [listOrdered, setListOrdered] = useState([] as typeof orderedItems[]); // Yeni sipariş listesi state'i
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Her bir sipariş öğesini listOrdered listesine ekleyelim
    setListOrdered(prevList => [...prevList, orderedItems]);
    // orderedItems'ı sıfırlayalım
    return () => {
      setListOrdered([]);
    };
  }, [orderedItems]);

  return (
    <div className='w-full relative h-full'>
      {!listOrdered.length && (
        <div>Siparişlerimde ürün yok.</div>
      )}
      <div className='ordered-container overflow-y-auto h-[566px] ' ref={containerRef}>
        <h1 className='text-center text-2xl text-red-600'>Siparişlerim</h1>
        {listOrdered.map((items, index) => (
          <div key={index} className="ordered-row flex flex-col  gap-8  w-80">
            {items.map((item, idx) => (
              <div key={idx} className="ordered-item m-5">
                <p>Tür: {item.tür}</p>
                <p>Fiyat: {item.fiyatlar} TL</p>
                <img className='' src={item.url} alt="Ürün resmi" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Siparislerim;
