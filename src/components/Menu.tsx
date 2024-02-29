import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import Logo from "../assets/logo/pizzaLogo.svg";
import "../css/menu.css";
import {  useSelector } from 'react-redux';
import googlePlay from "../assets/logo/googleplay.png";
import appStore from "../assets/logo/appStore.png";
import { RootState } from '../redux/store';
import { BsFillBasketFill } from "react-icons/bs";
import 'react-toastify/dist/ReactToastify.css';
import ProfilPage from "../pages/ProfilPageSmall";

const Menu: React.FC = () => {
    const userLogin = useSelector((state: RootState) => state.login.userLogin);
   
    const sepet = useSelector((state: RootState) => state.sepet.items);
    const navigate = useNavigate();
    const sepetLength = sepet.length;
    const [profileOpen, setProfileOpen] = useState<Boolean>(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const openLogin = () => {
        if (!userLogin) {
            navigate("/login");
            
            
        } else {
            setProfileOpen(prevState => !prevState);
            setMenuOpen(false); // Menüyü kapat
        }
    };



    useEffect(()=>{
        if (!userLogin) {
            setProfileOpen(false);

        }

    },[userLogin]);








    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    }

    const handleOutsideClick = (e: any) => {
        if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
        if (profileOpen && !e.target.closest('.profile-container')) {
            setProfileOpen(false);
        }
        if (!e.target.closest('.menu-container')) {
            setProfileOpen(false); // Profil dışında bir yere tıklandığında profil kapanacak
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [menuOpen]);

    return (
        <div className='menu-container'>
            {
                profileOpen && (
                    <div className='profile-container'>
                        <ProfilPage    />

                    </div>
                )
            }
            <div className='flex justify-between px-2 items-center'>
                <div onClick={handleMenuToggle} className='flex my-5'>
                    <div className=''>
                        <AiOutlineMenu size={20} />
                    </div>
                    
                    <div className=''>
                        {menuOpen && (
                            <div className='sidebar fixed top-0 left-0 w-full overlay z-50' />
                        )}
                        {menuOpen && (
                            <div className='sidebar fixed top-0 left-0 w-60 h-screen bg-white z-50' ref={menuRef}>
                                <nav className='w-full h-full'>
                                    <ul className='flex w-full p-5 px-7 text-sm list-disc h-full flex-col'>
                                        <li className='hover:text-black list-none flex flex-col gap-4'>
                                            <div>
                                                <h1 className='text-base'>Uygulamamızı İndirin</h1>
                                            </div>
                                            <div className='py-1 bg-black rounded-md'>
                                                <Link className='' target='_blank' to="https://play.google.com/store/apps/details?id=tr.com.pizzahut&hl=en_US">
                                                    <img src={googlePlay} alt="" />
                                                </Link>
                                            </div>
                                            <div className='py-2 rounded-md bg-black'>
                                                <Link className=' ' target='_blank' to="https://apps.apple.com/tr/app/pizza-hut-t%C3%BCrkiye/id1444013628?l=tr">
                                                    <img src={appStore} alt="" />
                                                </Link>
                                            </div>
                                        </li>
                                        <li className='z-10 list-none list'>
                                            <Link className="link-item z-10" to="/kampanyalar">Kampanyalar</Link>
                                        </li>
                                        <li className='list-none list z-10'>
                                            <Link className="z-10 link-item" to="/pizzalar">Pizzalar</Link>
                                        </li>
                                        <li className='list-none list z-10'>
                                            <Link className="z-10 link-item" to="/wingstreet">WingStreet</Link>
                                        </li>
                                        <li className='list-none list z-10'>
                                            <Link className="z-10 link-item" to="/yanurunler">Yan Ürünler</Link>
                                        </li>
                                        <li className='list-none list z-10'>
                                            <Link className="z-10 link-item" to="/restoranlar">Restoranlar</Link>
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
                    <div className='' onClick={openLogin}>
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
