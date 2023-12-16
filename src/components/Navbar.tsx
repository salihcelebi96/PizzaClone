import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo/pizzaLogo.svg";
import { FaRegCircleUser } from "react-icons/fa6";
import "../css/navbar.css";
import Login from "./Login";


const Navbar: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const openLogin = () => {
    setLoginOpen(true);
    console.log(isLoginOpen)
  };
  

 
  
  


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
          <li className="nav-item"><Link to="/yanurunler">Yan Ürünler</Link></li>
          <li className="nav-item"><Link to="/restoranlar">Restoranlar</Link></li>
        </ul>
      </div>
      

<div   className="flex items-center gap-2">
  <FaRegCircleUser />
  {isLoginOpen ? (
  <div>
    <h1>Giriş Yap</h1>
    <Login isLoginOpen={isLoginOpen} setLoginOpen={setLoginOpen} />
  </div>
) : (
  <div onClick={openLogin}>
    <h1>Giriş Yap</h1>
  </div>
  
)}

</div>



    </div>
  );
}

export default Navbar;
