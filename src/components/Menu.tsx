import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import Logo from "../assets/logo/pizzaLogo.svg";


const Menu: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    }

    const handleOutsideClick = (e: any) => {
        
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, []);

    return (

        <div className=' '>

            <div className='flex justify-between items-center'>
                <div className='w-12 h-12 flex  '>
                    <div className='p-5 text-black' onClick={handleMenuToggle}>
                        <AiOutlineMenu />

                    </div>
                    {menuOpen && (
                        <div className='w-screen z-10' ref={menuRef}>
                            <nav className='w-screen z-10'>
                                <ul className='flex z-10  w-1/4 p-5 px-7 text-sm list-disc  h-30 flex-col  gap-3 sm:gap-10 lg:gap-10 bg-black text-white lg:text-2xl sm:text-xl'>
                                    <li className='z-10'>
                                        <Link className="navbar-link z-10" to="/">Kampanyalar</Link>
                                    </li>
                                    <li className='z-10'>
                                        <Link className="navbar-link z-10" to="/about">Pizzalar</Link>
                                    </li>
                                    <li className='z-10'>
                                        <Link className="navbar-link z-10" to="/sepet">WingStreet</Link>
                                    </li>
                                    <li className='z-10'>
                                        <Link className="navbar-link z-10" to="/sepet">Yan Üürünler</Link>
                                    </li>
                                    <li className='z-10'>
                                        <Link className="navbar-link z-10" to="/sepet">Restoranlar</Link>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                    )}




                </div>


                <div>
                    <img src={Logo} alt="" />
                </div>

                <div>
                    <FaRegCircleUser size={24} />
         
                </div>

            </div>
        </div>

    );
}

export default Menu;