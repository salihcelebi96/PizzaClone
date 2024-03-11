import React, { useEffect, useState } from 'react';
import { ImLocation } from "react-icons/im";
import { addAdressTrue } from '../../reducers/loginSlice';
import { addAddress } from "../../reducers/addressSlice";
import { useDispatch, useSelector } from 'react-redux';
import AddAdress from "../../components/AddAdress";
import { RootState } from '../../redux/store';
import axios from 'axios';
import Loading from "../../components/Loadings";

interface Address {
  addressName: string;
  neighborhood: string;
  street: string;
  addressDetails: string;
  district: string;
  city: string;
  userEmail: string;
}

const Adreslerim: React.FC = () => {
  const [loadingState, setLoadingState] = useState(true);

  interface ExtendedImportMeta extends ImportMeta {
    env: {
      VITE_APP_URL: string;
    };
  }
  
  const apiUrl = (import.meta as ExtendedImportMeta).env.VITE_APP_URL;

  const [adreslerim, setAdreslerim] = useState<Address[]>([]);
  const activeUserEmail = useSelector((state: RootState) => state.allUser.activeUser?.email);
  const adresState = useSelector((state: RootState) => state.adres.addresses);
  const dispatch = useDispatch();

  const handleAddAdress = () => {
    dispatch(addAdressTrue());
  }

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/address`);
        const addresses: Address[] = response.data;
       
        const userAddresses = addresses.filter(address => address.userEmail === activeUserEmail);
        
        dispatch(addAddress(userAddresses)); 
        setAdreslerim(userAddresses); 
        setLoadingState(false);
      } catch (error) {
        console.error('Adresleri getirme hatası:', error);
      }
    };
  
    if (activeUserEmail && apiUrl) {
      fetchAddresses();
    }
  }, [activeUserEmail, apiUrl,  adresState]);

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
        
        {loadingState ? <Loading /> : 
          adreslerim.map((adres, index) => (
            <div key={index}>
              <div className='font-bold'>{adres.addressName}</div>
              <div>
                {adres.neighborhood}, {adres.addressDetails}, {adres.district}, {adres.city},
              </div>
            </div>
          ))
        }

        <div onClick={handleAddAdress}>
          <button className='text-green-600 hover:text-red-600 font-bold flex gap-2 items-center'>
            <span className=''><ImLocation /></span> Yeni Adres Ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Adreslerim;
