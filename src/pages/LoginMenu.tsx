import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../css/login.css";
import { logout, signUpOpen,userLoginFalse,userLoginTrue } from "../reducers/loginSlice";
import { useDispatch } from "react-redux";
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login: React.FC = () => {
  // const [user, setUser] = useState<string[] | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userLogin, setuserLogin] = useState<boolean>(false);
  const notify = () => toast("Giriş Yapıldı !");
 

  const dispatch = useDispatch();
  const navigate =  useNavigate();
  


  const handleSignUp = () => {
    dispatch(signUpOpen());
    dispatch(logout());
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3006/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setuserLogin(true);
      dispatch(userLoginTrue());
      notify();
      navigate('/'); 
      console.log("login başarılı gibimsi")
      fetchProtectedData();

      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
    
  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("Token not found");
        return;
      }
  
      const response = await fetch("http://localhost:3006/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Protected data:", data);
      } else {
        console.error("Failed to fetch protected data");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   setuserLogin(false);
  //   console.log("Logout successful");
  //   console.log(user);
  // };
  

  useEffect(() => {
    // userLogin durumu değiştiğinde yapılacak işlemler
    if (userLogin) {
      dispatch(logout());
      dispatch(userLoginTrue());
      console.log("Login successful");
      
    }else{
      dispatch((userLoginFalse()));
      console.log("userLogin false çalıştımmss");
      
    }
  }, [userLogin]);
  

 

  // const closeLogin = () => {
  //   dispatch(logout());
  // };





   
  
  return (
    <div className=" flex justify-center ">
      <div className="bg-white  border-1 border-gray-400  h-[500px] w-[400px] p-8 rounded-md">
        <div className="text-xl text-center font-bold  mb-4">Giriş Yap</div>
        <div className="mb-4 ">
          <input 
          onChange={(e)=> setEmail(e.target.value)}
          className="w-full p-2 border-black input-border" 
          placeholder="E-posta" type="text" />
        </div>
        <div className="mb-4 ">
          <input 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border-black input-border" placeholder="Şifre" type="password" />
        </div>
        <div onClick={handleLogin} className="text-center bg-red-600 text-white border  py-2">
          <button>Giriş</button>
        </div>
        <div className="py-2 text-center  text-sm hover:text-red-600">
          <p>Şifremi unuttum</p>
        </div>
        <div className="text-center py-5">
          <h1>
            Hesabın yok mu?{" "}
            <Link onClick={handleSignUp} className="text-red-600 link-arrow" to="/kayıtol">
              Kayıt Ol&gt;{" "}
            </Link>
          </h1>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
