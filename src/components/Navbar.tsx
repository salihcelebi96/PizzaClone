import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo/pizzaLogo.svg";
import { FaRegCircleUser } from "react-icons/fa6";
import "../css/navbar.css";


const Navbar: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-24 h-16 font-semibold cursor-pointer border text-lg">
      <Link to="/">
      <img src={Logo} alt="" />
    </Link>
      <div>
        <ul className="flex gap-5">
          <li className="nav-item"><Link to="/kampanyalar">Kampanyalar</Link></li>
          <li className="nav-item"><Link to="/pizzalar">Pizzalar</Link></li>
          <li className="nav-item"><Link to="/wingstreet">WingStreet</Link></li>
          <li className="nav-item"><Link to="/yan-urunler">Yan Ürünler</Link></li>
          <li className="nav-item"><Link to="/restoranlar">Restoranlar</Link></li>
        </ul>
      </div>
      <div className="flex items-center gap-2">
        <FaRegCircleUser />
        <h1>Giriş Yap</h1>
      </div>
    </div>
  );
}

export default Navbar;
