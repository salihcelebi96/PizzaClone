import React, { useState } from 'react';
import axios from 'axios';
import Mastercard from "../../assets/logo/masterpass.png";
import { addCard } from '../../reducers/creditCardSlice';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  cardNumber: string;
  name: string;
  month: string;
  years: string;
  cvc: string;
  cardName: string;
  activeUserEmail: string;
}

const OdemeYontemi: React.FC = () => {
  const notify = () => toast("Kayıtlı Kartları Ödemeler Sayafasında görebilirsiniz  !");

  interface ExtendedImportMeta extends ImportMeta {
    env: {
      VITE_APP_URL: string;
    };
  }
  
  const apiUrl = (import.meta as ExtendedImportMeta).env.VITE_APP_URL;
  const activeUser = useSelector((state: RootState) => state.allUser.activeUser?.email) ?? "";




  const dispatch = useDispatch();

  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const years = ['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34'];

  const [formData, setFormData] = useState<FormData>({
    cardNumber: "",
    name:"",
    month: "",
    years: "",
    cvc: "",
    cardName: "",
    activeUserEmail:activeUser,
   
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
   
  }

  const handleSave = () => {
    const isFormDataComplete = Object.values(formData).every(value => value !== '');
    const isValidLength = formData.cardNumber.length === 16 && formData.cvc.length === 3;
    if (isFormDataComplete && isValidLength) {
      axios.post(`${apiUrl}/api/card`, formData)
        .then(() => { 
          dispatch(addCard(formData));
          console.log('formData kaydedildi:', formData);
          notify();
          setFormData({  
            cardNumber: "",
            name:"",
            month: "",
            years: "",
            cvc: "",
            cardName: "",
            activeUserEmail: activeUser,
          });
        })
        .catch(error => {
          console.error('formData kaydedilirken bir hata oluştu:', error);
        });

    } else {
      console.log('formData eksik veya geçersiz, kaydedilemedi...');
    }
  }

  return (
    <div className='h-full  p-7 '>
      <div className='flex flex-col gap-5'>
        <div className='text-2xl font-bold'>Ödeme Yöntemi</div>
        <div className='border option flex items-center'>
          <input
            className='h-full w-full p-2 outline-none'
            type="text"
            placeholder='Kart Numarası'
            name="cardNumber"
            value={formData.cardNumber}
            onChange={(e) => {
              const formattedCardNumber = e.target.value.replace(/\D/g, '').slice(0, 16);
              setFormData({ ...formData, cardNumber: formattedCardNumber });
            }}
          />
        </div>
        <div className='border option flex items-center'>
          <input 
          type="text" 
          className='h-full w-full p-2 outline-none' 
          placeholder='Kart Sahibinin Adı'
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
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
              value={formData.years}
              name="years"
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
              onChange={(e) => {
                const formattedCvc = e.target.value.replace(/\D/g, '').slice(0, 3); 
                setFormData({ ...formData, cvc: formattedCvc });
               }}
            />
          </div>
        </div>
        <div className='border option w-full h-full'>
          <input
            type="text"
            className='h-full w-full p-2 outline-none'
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
        <div className='bg-red-500  cursor-pointer  h-[51px] w-[576px text-white flex justify-center items-center text-xl font-bold]' onClick={handleSave}>Kaydet</div>
      </div>
    </div>
  );
}

export default OdemeYontemi;