import React, {  useState } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

import "../css/profil.css";
import Order from "../svg/orderSvg";
import Adress from "../svg/adressSvg";
import MyAccount from "../svg/myaccounts";
import Pay from "../svg/paySvg";
import Exit from "../svg/exitSvg";
import { userLoginFalse } from '../reducers/loginSlice';
import { useNavigate } from 'react-router-dom';
import Siparislerim from './profilComponents/Siparislerim';
import Adreslerim from './profilComponents/Adreslerim';
import Hesabım from './profilComponents/Hesabım';
import OdemeYontemi from "./profilComponents/OdemeYontemi";

const ProfilPage: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<string>('siparislerim');
    const activeUser = useSelector((state: RootState) => state.allUser.activeUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(userLoginFalse());
        navigate("/");
    }

    return (
        <div className='h-[536px] w-screen flex justify-start gap-10 mx-36 my-5'>
            <div className=''>
                <div className='h-full w-[345px] flex flex-col gap-10 p-7 justify-start '>
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
                        <ul className='flex w-full flex-col gap-8'>
                            <li className='liStyle'>
                                <button className='link' onClick={() => setActiveComponent('siparislerim')}>
                                    <span className='icon'><Order /></span>
                                    <span>Siparişlerim</span>
                                </button>
                            </li>
                            <li className='liStyle'>
                                <button className='link' onClick={() => setActiveComponent('adreslerim')}>
                                    <span className='icon'><Adress /></span>
                                    <span>Adreslerim</span>
                                </button>
                            </li>
                            <li className='liStyle'>
                                <button className='link' onClick={() => setActiveComponent('hesabım')}>
                                    <span className='icon'><MyAccount /></span>
                                    <span>Hesabım</span>
                                </button>
                            </li>
                            <li className='liStyle'>
                                <button className='link' onClick={() => setActiveComponent('odemeyontemi')}>
                                    <span className='icon'><Pay /></span>
                                    <span>Ödeme Yöntemi</span>
                                </button>
                            </li>
                            <li className='liStyle'>
                                <button className='link' onClick={handleLogout}>
                                    <span className='icon'><Exit /></span>
                                    <span>Çıkış</span>
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-[576px]  '>
                {activeComponent === "adreslerim" && <Adreslerim />}
                {activeComponent === "siparislerim" && <Siparislerim />}
                {activeComponent === "hesabım" && <Hesabım />}
                {activeComponent === "odemeyontemi" && <OdemeYontemi />}
            </div>
        </div>
    )
}

export default ProfilPage;
