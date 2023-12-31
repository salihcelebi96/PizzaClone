import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { Link,useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import Logo from "../assets/logo/pizzaLogo.svg";
import "../css/menu.css";
import { useDispatch, useSelector } from 'react-redux';
import googlePlay from "../assets/logo/googleplay.png";
import appStore from "../assets/logo/appStore.png";
import { RootState } from '../redux/store';
import { loginOpen, userLoginFalse } from "../reducers/loginSlice";
import { BsFillBasketFill } from "react-icons/bs";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Menu: React.FC = () => {
    const userLogin = useSelector((state: RootState) => state.login.userLogin);
    const dispatch = useDispatch();
    const sepet = useSelector((state: RootState) => state.sepet.items);
    const navigate = useNavigate();
    const sepetLength = sepet.length;
    const notify = () => toast("Çıkış Yapıldı !");

    const openLogin = () => {
        if (!userLogin) {
            dispatch(loginOpen());
            navigate("/login");
        } else {
            dispatch(userLoginFalse());
            notify();
        }

    };


    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

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

    return (
        <div className=' '>
            <div className='flex justify-between px-2 items-center'>
                <div onClick={handleMenuToggle} className='flex my-5'>
                    <div>
                        <AiOutlineMenu size={20} />
                    </div>
                    <div className=''>
                        {menuOpen && (
                            <div className='sidebar fixed top-0 left-0 w-full   z-50' />
                        )}
                        {menuOpen && (
                            <div className='sidebar  fixed top-0 left-0 w-60 h-screen bg-white  z-50' ref={menuRef}>
                                <nav className='w-full h-full'>
                                    <ul className='flex w-full  p-5 px-7 text-sm list-disc h-full  flex-col    '>
                                        <li className=' hover:text-black list-none   flex flex-col gap-4'>
                                            <h1 className='text-base'>Uygulalamımzı İndirin</h1>
                                            <Link className='' target='_blank' to="https://play.google.com/store/apps/details?id=tr.com.pizzahut&hl=en_US"> <img src={googlePlay} alt="" /></Link>
                                            <Link className=' ' target='_blank' to="https://apps.apple.com/tr/app/pizza-hut-t%C3%BCrkiye/id1444013628?l=tr"> <img src={appStore} alt="" />  </Link>

                                        </li>
                                        <li className='z-10 list-none  list'>
                                            <Link className="  link-item   z-10" to="/kampanyalar">Kampanyalar</Link>
                                        </li>
                                        <li className='list-none  list z-10'>
                                            <Link className="z-10  link-item " to="/pizzalar">Pizzalar</Link>
                                        </li>
                                        <li className='list-none list  list z-10'>
                                            <Link className=" z-10 link-item " to="/wingstreet">WingStreet</Link>
                                        </li>
                                        <li className='list-none  list  z-10'>
                                            <Link className=" z-10 link-item " to="/yanurunler">Yan Ürünler</Link>
                                        </li>
                                        <li className='list-none list z-10'>
                                            <Link className=" z-10 link-item " to="/restoranlar">Restoranlar</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </div>

                
                <div className='flex justify-center items-center relative gap-5 p-4'>
                <div onClick={openLogin}>
                    <div>
                    <FaRegCircleUser size={24} />
                    </div>
                   

                </div>

                    <div>
                        <Link to="/sepet">
                            <BsFillBasketFill size={22} />
                        </Link>
                    </div>
                    {sepetLength === 0 ? null : (
                        <div className='text-sm absolute top-0 right-0 border rounded-full text-white bg-red-600 px-2'>
                            {sepetLength}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Menu;
