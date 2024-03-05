import React from 'react';
import { ImLocation } from "react-icons/im";
import { addAdressTrue } from '../../reducers/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddAdress from "../../components/AddAdress";
import { RootState } from '../../redux/store';

const Adreslerim: React.FC = () => {
  const adreslerim = useSelector((state: RootState) => state.adres.addresses);
  const dispatch = useDispatch();

  const handleAddAdress = () => {
    dispatch(addAdressTrue());
  }
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
