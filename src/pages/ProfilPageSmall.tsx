import React, { useEffect, useState, useRef } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { useSelector ,useDispatch} from 'react-redux';
import { RootState } from '../redux/store';
import "../css/smallProfile.css";
import { Link, useNavigate, } from "react-router-dom";
import { userLoginFalse } from '../reducers/loginSlice';
import Order from "../svg/orderSvg";
import Adress from "../svg/adressSvg";
import MyAccount from "../svg/myaccounts";
import Pay from "../svg/paySvg";
import Exit from "../svg/exitSvg";

const ProfilPage: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
     // Redux store'dan kullanıcı oturum durumu alınıyor
    const userLogin = useSelector((state: RootState) => state.login.userLogin);
    const activeUser = useSelector((state: RootState) => state.allUser.activeUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

   

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    }

    const handleOutsideClick = (e: any) => {
        if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [menuOpen]);

    useEffect(() => {
        console.log("activeuser", activeUser);
    }, [activeUser]);


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
                                    <Link className='link' to="/link1">
                                        <span className='icon'>
                                            <Order />
                                        </span>
                                        <span>
                                            Siparişlerim
                                        </span>
                                    </Link>
                                </li>
                                <li className='liStyle'>
                                    <Link className='link' to="/link1">
                                        <span className='icon'>
                                            <Adress />
                                        </span>
                                        <span>
                                            Adreslerim
                                        </span>
                                    </Link>
                                </li>
                                <li className='liStyle'>
                                    <Link className='link' to="/link1">
                                        <span className='icon'>
                                            <MyAccount />
                                        </span>
                                        <span>
                                            Hesabım
                                        </span>
                                    </Link>
                                </li>
                                <li className='liStyle'>
                                    <Link className='link' to="/link1">
                                        <span className='icon'>
                                            <Pay />
                                        </span>
                                        <span>
                                            Ödeme Yöntemi
                                        </span>
                                    </Link>
                                </li>
                                <li onClick={handleLogout} className='liStyle'>
                                    <Link  className='link   ' to="/">
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
