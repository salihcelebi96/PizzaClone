import React, { useState, useRef, useEffect } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';

import "../css/profil.css";
import Order from "../svg/orderSvg";
import Adress from "../svg/adressSvg";
import MyAccount from "../svg/myaccounts";
import Pay from "../svg/paySvg";
import Exit from "../svg/exitSvg";
import { userLoginFalse } from '../reducers/loginSlice';
import Siparislerim from './profilComponents/Siparislerim';
import Adreslerim from './profilComponents/Adreslerim';
import Hesabım from './profilComponents/Hesabım';
import OdemeYontemi from "./profilComponents/OdemeYontemi";

const ProfilPage: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [activeComponent, setActiveComponent] = useState<string>('siparislerim');
    
    const activeUser = useSelector((state: RootState) => state.allUser.activeUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOutsideClick = (e: MouseEvent) => {
        if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [menuOpen]);

    const handleLogout = () => {
         dispatch(userLoginFalse());
         navigate("/");
    }

    return (
        <div className='containerStyle'>
            <div className=' flex   justify-center '>
                <div>
                    <div className='h-full flex flex-col gap-10  p-7 justify-start'>
                        <div className='flex gap-5'>
                            <div className='border rounded-full p-2 flex justify-center items-center bg-gray-200'>
                                <span className='text-gray-400 text-3xl'> <FaUserAlt /> </span>
                            </div>
                            <div>
                                <div className='flex h-full items-center '>
                                    {activeUser ? activeUser.name : "No active user"}
                                </div>
                            </div>
                        </div>
                        <div>
                            <ul className='flex w-full flex-col gap-8'>
                                <li className='liStyle'>
                                    <Link to="/profil/siparislerim" className='link' onClick={() => setActiveComponent('siparislerim')}>
                                        <span className='icon '><Order /></span>
                                        <span>Siparişlerim</span>
                                    </Link>
                                </li>
                                <li className='liStyle'>
                                    <Link to="/profil/adreslerim" className='link' onClick={() => setActiveComponent('adreslerim')}>
                                        <span className='icon'><Adress /></span>
                                        <span>Adreslerim</span>
                                    </Link>
                                </li>
                                <li className='liStyle  '>
                                    <Link to="/profil/hesabım" className='link' onClick={() => setActiveComponent('hesabım')}>
                                        <span className='icon'><MyAccount /></span>
                                        <span>Hesabım</span>
                                    </Link>
                                </li>
                                <li className='liStyle '>
                                    <Link to="/profil/ödeme-yöntemlerim" className='link' onClick={() => setActiveComponent('odemeyontemi')}>
                                        <span className='icon'><Pay /></span>
                                        <span>Ödeme Yöntemi</span>
                                    </Link>
                                </li>
                                <li onClick={handleLogout} className='liStyle'>
                                    <Link className='link   ' to="/">
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
                <div className='h-full border'></div>
            </div>
        </div>
    )
}

export default ProfilPage;
