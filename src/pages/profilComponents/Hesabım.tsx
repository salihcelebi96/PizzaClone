import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import "../../css/hesabım.css";

const Hesabım: React.FC = () => {
  const user = useSelector((state: RootState) => state.allUser.activeUser);
  return (
    <div className='h-full w-full p-7'>
      <div className='flex flex-col gap-5'>
        <div className='text-2xl font-bold'>
          Hesabım
        </div>
        <div className="user">
          <input type="text" value={user?.name} />
        </div>

        <div className="user">
          <input type="text" value={user?.email} />
        </div>

        <div className="user">
          <input type="text" value={user?.phoneNumber} />
        </div>

        <div className='input text-center bg-red-500 hover:bg-red-400 text-white text-xl'>Kaydet</div>
      </div>

    </div>
  )
}

export default Hesabım
