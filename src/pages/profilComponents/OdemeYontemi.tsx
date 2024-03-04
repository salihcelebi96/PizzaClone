import React, { useState } from 'react';
import "../../css/odeme.css";

const OdemeYontemi: React.FC = () => {
  const months = [1,2,3,4,5,6,7,8,9,10,11,12];
  const years = [24,25,26,27,28,29,30,31,32,33,34];

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  return (
    <div className='h-full w-full '>
      <div className='flex flex-col gap-5'>
        <div className='text-2xl font-bold'>
          Ödeme Yöntemi
        </div>
        <div className='border option flex items-center  '>
          <input className='h-full w-full p-2 outline-none' type="text" placeholder='Kart Numarası' />
        </div>
        <div className='flex gap-5 w-full '>
          <div className='border option w-1/6' >
            <select className=' h-full w-full p-1' value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option className=' ' value="" disabled hidden>Ay</option>
              {months.map(month => (
                <option className='  ' value={month} key={month}> {month} </option>
              ))}
            </select>
          </div>
          <div className='border option w-1/6 '>
            <select className=' h-full w-full p-1' value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="" disabled hidden>Yıl</option>
              {years.map(year => (
                <option  value={year} key={year}> {year}  </option>
              ))}
            </select>
          </div>
          <div className='border option w-4/6'>
            <input className=' w-full h-full outline-none text-center' type="text" placeholder='CVC Kodu' />
          </div>
        </div>
        <div className='border option w-full h-full  '>
          <input type="text" className='h-full w-full p-1 outline-none' placeholder='Kartınızı isim verin' />
        </div>
      </div>
    </div>
  );
}

export default OdemeYontemi;
