import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo/pizzaLogo.svg";
import { FaRegCircleUser } from "react-icons/fa6";
import "../css/navbar.css";
import Login from "./Login";
import { useDispatch, useSelector } from 'react-redux';
import {loginOpen , userLoginFalse} from "../reducers/loginSlice";
import { RootState } from '../redux/store';



const Navbar: React.FC = () => {
  
  const dispatch = useDispatch();

  const openLogin = () => {
    dispatch(loginOpen())
    
  };

const isLoginOpen = useSelector((state : RootState) => state.login.isAuthenticated)
const userLogin = useSelector((state : RootState) => state.login.userLogin);

const userLoginHandle = () => {
  dispatch(userLoginFalse())
}
const toggleUserLogin = () => {
  if (userLogin) {
    
    userLoginHandle();
  } else {
    
    openLogin();
  }
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

     


      <div className="flex items-center gap-2">
        <div className='flex gap-2 items-center' onClick={toggleUserLogin}>
        <FaRegCircleUser />
        {isLoginOpen && (
          <h1>Giriş Yap</h1>
        )}
        </div>
        
        {isLoginOpen ? (
          <div className='overlay'>
             <div className=' '>
            
             <Login  />
          </div>
          </div>
         
        ) :(
          userLogin ? <h1 onClick={userLoginHandle}>Çıkış Yap</h1> : <h1 onClick={openLogin}>Giriş Yap</h1>
        ) }

      </div>



    </div>
  );
}

export default Navbar;
