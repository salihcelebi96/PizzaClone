import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import Logo from "../assets/logo/pizzaLogo.svg";
import LoginMenu from "../components/Footer";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { loginOpen } from '../reducers/loginSlice';

const Menu: React.FC = () => {
    const dispatch = useDispatch();
    const openLogin = () => {
        dispatch(loginOpen());
    };
    const isLoginOpen = useSelector((state: RootState) => state.login.isAuthenticated)

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
                        <AiOutlineMenu />
                    </div>
                    <div className=''>
                        {menuOpen && (
                            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50' />
                        )}
                        {menuOpen && (
                            <div className='fixed top-0 left-0 w-60  z-50' ref={menuRef}>
                                <nav className='w-full'>
                                    <ul className='flex w-full p-5 px-7 text-sm list-disc h-48 flex-col gap-3 sm:gap-10 lg:gap-10 bg-black text-white lg:text-2xl sm:text-xl'>
                                        <li className='z-10'>
                                            <Link className="navbar-link z-10" to="/kampanyalar">Kampanyalar</Link>
                                        </li>
                                        <li className='z-10'>
                                            <Link className="navbar-link z-10" to="/pizzalar">Pizzalar</Link>
                                        </li>
                                        <li className='z-10'>
                                            <Link className="navbar-link z-10" to="/wingstreet">WingStreet</Link>
                                        </li>
                                        <li className='z-10'>
                                            <Link className="navbar-link z-10" to="/yanurunler">Yan Ürünler</Link>
                                        </li>
                                        <li className='z-10'>
                                            <Link className="navbar-link z-10" to="/restoranlar">Restoranlar</Link>
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

                <div onClick={openLogin}>
                    <FaRegCircleUser size={24} />
                    {isLoginOpen && (
                        <div>
                            <LoginMenu />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Menu;
