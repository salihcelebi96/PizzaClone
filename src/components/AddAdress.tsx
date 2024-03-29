import React, { useState } from 'react';
import { addAdressFalse } from '../reducers/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import "../css/addAdress.css";
import { addAddress } from '../reducers/addressSlice';
import axios from 'axios';
import { RootState } from '../redux/store';


interface Address {
    addressName: string;
    neighborhood: string;
    street:string;
    addressDetails: string;
    district: string;
    city: string;
    userEmail: string;
   
  }



const AddAdress: React.FC = () => {
    const dispatch = useDispatch();
    const [city, setCity] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [neighborhood, setNeighborhood] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [addressName, setAddressName] = useState<string>("");
    const [addressDetails, setAddressDetails] = useState<string>("");

    const user = useSelector((state: RootState) => state.allUser.activeUser);

    const newAddress: Address = {
        addressName: addressName,
        neighborhood: neighborhood,
        street: street, 
        addressDetails: addressDetails,
        district: district,
        city: city,
        userEmail: user?.email || "",
        
    };   
        
       
        
    

    interface ExtendedImportMeta extends ImportMeta {
        env: {
          VITE_APP_URL: string;
        };
      }
      
      const apiUrl = (import.meta as ExtendedImportMeta).env.VITE_APP_URL;
      

    const closeAdress = () => {
        dispatch(addAdressFalse());
    }

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    }

    const handleDistrictChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDistrict(event.target.value);
    }

    const handleNeighborhoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNeighborhood(event.target.value);
    }

    const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStreet(event.target.value);
    }

    const handleAddressNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddressName(event.target.value);
    }

    const handleAddressDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddressDetails(event.target.value);
    }

    const handleSave = async () => {
        
        if (city && district && neighborhood && street && addressName && addressDetails && user?.email) {
            try {
                await axios.post(`${apiUrl}/api/address`, newAddress);
                dispatch(addAddress([newAddress]));
                dispatch(addAdressFalse());
            } catch (error) {
                console.log("Adres ekleme hatası:", error);
            }
        } else {
            console.log("Lütfen tüm alanları doldurun.");
        }
    };
    

    return (
        <div className=' overlay flex justify-center '>
            <div className='w-[470px]    h-[701px] border bg-white relative   rounded-lg '>
                <div className=' p-10 h-full w-[430px]    flex flex-col gap-10'>
                    <div className='font-bold text-2xl' style={{ fontFamily: "Rubik-Bold" }}>
                        Yeni Adres Ekle
                    </div>
                    <div className='flex gap-2 '>
                        <div>
                            <input className='input' type="text" placeholder='Şehir' value={city} onChange={handleCityChange} />
                        </div>
                        <div>
                            <input className='input' type="text" placeholder='İlçe' value={district} onChange={handleDistrictChange} />
                        </div>
                    </div>
                    <div>
                        <input className='input' type="text" placeholder='Mahalle' value={neighborhood} onChange={handleNeighborhoodChange} />
                    </div>
                    <div>
                        <input className='input' type="text" placeholder='Sokak' value={street} onChange={handleStreetChange} />
                    </div>
                    <div>
                        <input className='input' type="text" placeholder='Adres Adı' value={addressName} onChange={handleAddressNameChange} />
                    </div>
                    <div>
                        <input className='input' type="text" placeholder='Adres Detayı (Bina No,Bina Adi,Kapi No)' value={addressDetails} onChange={handleAddressDetailsChange} />
                    </div>
                    <div onClick={handleSave}>
                        <button className='input bg-red-600 border-none hover:bg-red-700 text-white text-lg cursor-pointer'> Adresimi Kaydet </button>
                    </div>
                    <div onClick={closeAdress} className='absolute sm:right-2 right-8  top-0  text-2xl font-bold cursor-pointer '>
                        X
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAdress;
