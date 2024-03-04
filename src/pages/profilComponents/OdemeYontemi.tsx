import React, { useState } from 'react';
import "../../css/odeme.css";
import Mastercard from "../../assets/logo/masterpass.png";
import { addCard } from '../../reducers/creditCardSlice';
import { useDispatch } from 'react-redux';

interface FormData {
  cardNumber: string;
  month: string;
  year: string;
  cvc: string;
  cardName: string;
}

const OdemeYontemi: React.FC = () => {
  const dispatch = useDispatch();

  const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  const years = ['2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034'];

  const [formData, setFormData] = useState<FormData>({
    cardNumber: '',
    month: '',
    year: '',
    cvc: '',
    cardName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if ((name === 'cardNumber' || name === 'cvc') && !/^\d+$/.test(value)) {
      return; 
    }
    

    if(name ==="cardNumber" && value.length > 16) {
      return;
    }

    if (name === 'cvc' && value.length > 3) {
      return; 
    }
    setFormData({ ...formData, [name]: value });
  }

  




  const handleSave = () => {
    const isFormDataComplete = Object.values(formData).every(value => value !== '');
    // Kart numarası 16 basamak, CVC kodu ise 3 basamak olmalı
    const isValidLength = formData.cardNumber.length === 16 && formData.cvc.length === 3;
    if (isFormDataComplete && isValidLength) {
      dispatch(addCard(formData));
      console.log('formData tamam, kaydediliyor...',formData);
    } else {
      console.log('formData eksik veya geçersiz, kaydedilemiyor...');
    }
  }

  return (
    <div className='h-full w-full'>
      <div className='flex flex-col gap-5'>
        <div className='text-2xl font-bold'>Ödeme Yöntemi</div>
        <div className='border option flex items-center'>
          <input
            className='h-full w-full p-2 outline-none'
            type="text"
            placeholder='Kart Numarası'
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
          />
        </div>
        <div className='flex gap-5 w-full'>
          <div className='border option w-1/6'>
            <select
              className='h-full w-full p-1'
              value={formData.month}
              name="month"
              onChange={handleChange}
            >
              <option value="" disabled hidden>Ay</option>
              {months.map(month => (
                <option value={month} key={month}>{month}</option>
              ))}
            </select>
          </div>
          <div className='border option w-1/6'>
            <select
              className='h-full w-full p-1'
              value={formData.year}
              name="year"
              onChange={handleChange}
            >
              <option value="" disabled hidden>Yıl</option>
              {years.map(year => (
                <option value={year} key={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className='border option w-4/6'>
            <input
              className='w-full h-full outline-none p-2'
              type="text"
              placeholder='CVC Kodu'
              name="cvc"
              value={formData.cvc}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='border option w-full h-full'>
          <input
            type="text"
            className='h-full w-full p-1 outline-none'
            placeholder='Kartınızı isim verin'
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
          />
        </div>
        <div className='flex gap-6'>
          <div><img src={Mastercard} alt="" /></div>
          <div className='text-xs h-[48px] w-[366px]'>
            Kredi kartı bilgileriniz Pizza Hut tarafından saklanmamaktadır.
            Ödeme altyapısı MasterCard tarafından sağlanmaktadır.
            Masterpass Nedir? Kullanım koşulları için tıklayınız.
          </div>
        </div>
        <div className='bg-red-500 h-[51px] w-[576px text-white flex justify-center items-center text-xl font-bold]' onClick={handleSave}>Kaydet</div>
      </div>
    </div>
  );
}

export default OdemeYontemi;
