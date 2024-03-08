import React, { useEffect } from 'react';
import { ImLocation } from "react-icons/im";
import { addAdressTrue } from '../../reducers/loginSlice';
import { addAddress } from "../../reducers/addressSlice";
import { useDispatch, useSelector } from 'react-redux';
import AddAdress from "../../components/AddAdress";
import { RootState } from '../../redux/store';
import axios from 'axios';

const Adreslerim: React.FC = () => {
  interface ExtendedImportMeta extends ImportMeta {
    env: {
      VITE_APP_URL: string;
    };
  }

  const apiUrl = (import.meta as ExtendedImportMeta).env.VITE_APP_URL;
  const activeUserEmail = useSelector((state: RootState) => state.allUser.activeUser?.email);
  const dispatch = useDispatch();

  const handleAddAdress = () => {
    dispatch(addAdressTrue());
  }

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/address`, {
          params: {
            userEmail: activeUserEmail
          }
        });
        dispatch(addAddress(response.data));
        console.log(response.data);
      } catch (error) {
        console.error('Adresleri getirme hatası:', error);
      }
    };

    if (activeUserEmail && adreslerim.length === 0) { // Eğer activeUserEmail değeri varsa ve adresler boşsa yalnızca o zaman fetchAddresses çalışacak
      fetchAddresses();
    }
  }, [activeUserEmail, adreslerim]); // activeUserEmail veya adresler değiştiğinde fetchAddresses çalışacak

  const adreslerim = useSelector((state: RootState) => state.adres.addresses);
  const addressState = useSelector((state: RootState) => state.login.addAdress);

  if (addressState) {
    return (
      <div className=''>
        <AddAdress />
      </div>
    );
  };

  return (
    <div className='h-full w-full p-7'>
      <div className='flex flex-col gap-5'>
        <div className='font-bold text-2xl' style={{ fontFamily: "Rubik-Bold" }}>
          Adreslerim
        </div>
        {adreslerim.map((adres, index) => (
          <div key={index}>
            <div className='font-bold'> {adres.addressName}</div>
            <div>
              {adres.neighborhood}, {adres.addressDetails}, {adres.district}, {adres.city},
            </div>
          </div>
        ))}
        <div onClick={handleAddAdress}>
          <button className='text-green-600 hover:text-red-600 font-bold flex gap-2 items-center'> <span className=''> <ImLocation /> </span> Yeni Adres Ekle </button>
        </div>
      </div>
    </div>
  )
}

export default Adreslerim;
