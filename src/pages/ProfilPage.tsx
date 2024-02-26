import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import "../css/profil.css";

const ProfilPage: React.FC = () => {
    const profilName = useSelector((state: RootState) => state.login.profilName);

    return (
        <div className='h-[536px] flex justify-center m-7'>
            <div>
                <div className='h-full w-[345px] flex justify-center border  '>
                    <div>
                        <div className='h-[64px] w-[64px] border rounded-full p-2 flex justify-center items-center bg-gray-300'>
                            <span className='text-gray-400 text-3xl'> <FaUserAlt /> </span>
                        </div>
                        <div>
                            {profilName}
                        </div>

                    </div>


                </div>
            </div>
            <div className='w-[576px] h-full border'>

            </div>
        </div>
    )
}

export default ProfilPage 
