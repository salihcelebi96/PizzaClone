import React, { useEffect } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import "../css/profil.css";
import { Link } from "react-router-dom";
import "../css/profil.css";
import Order from "../svg/orderSvg";
import Adress from "../svg/adressSvg";
import MyAccount from "../svg/myaccounts";
import Pay from "../svg/paySvg";
import Exit from "../svg/exitSvg";






const ProfilPage: React.FC = () => {

    const activeUser = useSelector((state: RootState) => state.allUser.activeUser);


    useEffect(() => {
        console.log("activeuser", activeUser);
    }, [activeUser]);

    return (
        <div className='h-[536px]   w-screen  flex justify-center my-5'>
            <div className=''>
                <div className='h-full w-[345px] flex flex-col gap-10 p-7 justify-start border'>
                    <div className='flex gap-5'>
                        <div className='h-[64px] w-[64px] border rounded-full p-2 flex justify-center items-center bg-gray-200'>
                            <span className='text-gray-400 text-3xl'> <FaUserAlt /> </span>
                        </div>
                        <div>
                            <div className='h-[64px] flex items-center'>
                                {activeUser ? activeUser.name : "No active user"}
                            </div>
                        </div>
                    </div>
                    <div>
                        <ul className='flex w-full  flex-col gap-8'>
                            <li className='liStyle '>
                                <Link className='link' to="/link1">
                                   <span className='icon'>
                                     <Order />
                                   </span>
                                   <span>
                                        Siparişlerim
                                    </span>
                                </Link>


                            </li>
                             <li className='liStyle '>
                                <Link className='link' to="/link1">
                                   <span className='icon'>
                                     <Adress />
                                   </span>
                                   <span>
                                        Adreslerim
                                    </span>
                                    </Link>


                             </li>
                             <li className='liStyle '>
                                <Link className='link' to="/link1">
                                   <span className='icon'>
                                     <MyAccount />
                                   </span>
                                   <span>
                                        Hesabım
                                    </span>
                                    </Link>


                             </li>
                             <li className='liStyle '>
                                <Link className='link' to="/link1">
                                   <span className='icon'>
                                     <Pay />
                                   </span>
                                   <span>
                                        Ödeme Yöntemi
                                    </span>
                                    </Link>


                             </li>
                             <li className='liStyle '>
                                <Link className='link' to="/link1">
                                   <span className='icon'>
                                     <Exit />
                                   </span>
                                   <span>
                                        Çıkış
                                    </span>
                                    </Link>


                             </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-[576px] h-full border'></div>
        </div>
    )
}

export default ProfilPage