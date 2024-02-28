import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import "../css/login.css";
import { logout, signUpOpen, userLoginTrue, setUserName } from "../reducers/loginSlice";
import { useDispatch } from "react-redux";
import { setActiveUserByEmail, setUsers } from "../reducers/userSlice";
import Loading from "../components/Loadings";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {





  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userLogin, setuserLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); 
  const notify = () => toast("Giriş Yapıldı !");
  const notifyError = () => toast("Girilen bilgilerde hata var !!");
  
  interface ExtendedImportMeta extends ImportMeta {
    env: {
      VITE_APP_URL: string;
    };
  }

  const apiUrl = (import.meta as ExtendedImportMeta).env.VITE_APP_URL;


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/loginjwt/users`);
        dispatch(setUsers(response.data.users));
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []); 







  const handleSignUp = () => {
    dispatch(logout());
    dispatch(signUpOpen());
  };

  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await fetch(`${apiUrl}/loginjwt/protected`, {
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

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/loginjwt/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setuserLogin(true);
      notify();
      navigate('/');
      fetchProtectedData();
      dispatch(setUserName(email));
      dispatch(setActiveUserByEmail(email));
      console.log("setusername",  email);
      
    } catch (error) {
      console.error('Login failed:', error);
      notifyError();
    }
  };

  const closeLogin = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (userLogin) {
      dispatch(logout());
      dispatch(userLoginTrue());
      console.log("Login successful");
    }
  }, [userLogin, dispatch]);

  if(loading){
    return <Loading/>;
  }

  return (
    <div className="text-black   ">
      <div className="bg-white  border-1 border-gray-400 absolute top-50 left-50 transform-translate-50-50 z-10 h-[500px] w-[400px] p-8 rounded-md">
        <div className="text-xl font-bold  mb-4">Giriş Yap</div>
        <div className="mb-4 ">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border-black input-border"
            placeholder="E-posta"
            type="text"
          />
        </div>
        <div className="mb-4 ">
          <input
            onChange={(e) => setPassword(e.target.value)}
            maxLength={16}
            minLength={8}
            className="w-full p-2 border-black input-border"
            placeholder="Şifre"
            type="password"
          />
        </div>
        <div
          onClick={() => handleLogin()}
          className="text-center bg-red-600 hover:bg-red-500 text-white border  py-2"
        >
          <button>Giriş</button>
        </div>
        <div className="py-2 text-center  text-sm hover:text-red-600">
          <p>Şifremi unuttum</p>
        </div>
        <div className="text-center py-5">
          <h1>
            Hesabın yok mu?{" "}
            <Link to="/kayıtol" onClick={() => handleSignUp()} className="text-red-600 link-arrow">
              Kayıt Ol&gt;{" "}
            </Link>
          </h1>
        </div>
        <div className="absolute text-red-600  top-0 right-2 text-3xl">
          <button onClick={closeLogin}> x </button>
        </div>
        <div onClick={closeLogin} className="text-sm absolute bottom-0 right-2 ">
          <Link to="/admin">  Admin <span className="text-xl"> &rarr;</span> </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
