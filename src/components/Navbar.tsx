import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo/pizzaLogo.svg";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsFillBasketFill } from "react-icons/bs";
import "../css/navbar.css";
import Login from "./LoginSign";
import { useDispatch, useSelector } from 'react-redux';
import { loginOpen, signUpClose } from "../reducers/loginSlice";
import { RootState } from '../redux/store';

import 'react-toastify/dist/ReactToastify.css';




const Navbar: React.FC = () => {
  
  
  const dispatch = useDispatch();

  const openLogin = () => {
    dispatch(loginOpen())
    dispatch(signUpClose());

  };

  const isLoginOpen = useSelector((state: RootState) => state.login.isAuthenticated);
  const userLogin = useSelector((state: RootState) => state.login.userLogin);
  // const isSignUp = useSelector((state: RootState) => state.login.isSignUp);
  const sepet = useSelector((state: RootState) => state.sepet.items);
  
  const sepetLength = sepet.length;

 const name = useSelector((state: RootState) => state.login.name);


  // const userLoginHandle = () => {
  //   dispatch(userLoginFalse());
  //   notify();
    
  // }
  // const toggleUserLogin = () => {
  //   if (userLogin) {
      
  //     userLoginHandle();
  //   } 
  // };

  const firstLetterName = name.substring(0,1);



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




      <div className="flex items-center gap-10">
        <div className='flex gap-2'>
          <div className='flex gap-2 items-center' >
            {
              !userLogin && (
                <FaRegCircleUser />
              ) 
            }
          
            {isLoginOpen && (
              <h1>Giriş Yap</h1>
            )}
          </div>

          {isLoginOpen ? (
            <div className='overlay'>
              <div className=' '>

                <Login />
              </div>
            </div>

          ) : (
            userLogin ?  //Giriş yapıldıysa böyle gözükür
            <Link to="/profil">
            <div className='border rounded-full w-7 h-7 flex justify-center items-center  text-sm bg-gray-400 text-white'>
              <h1 className='' > {firstLetterName}  </h1>

            </div>
            </Link>
            
             : <h1 onClick={openLogin}>Giriş Yap</h1>
          )}
        </div>


        <div className='flex justify-center items-center relative p-4'>

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

export default Navbar;