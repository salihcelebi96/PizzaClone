import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import { logout, signUpOpen } from "../reducers/loginSlice";
import { useDispatch } from "react-redux";





const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();

  

  const handleSignUp = () => {
    dispatch(signUpOpen())
    dispatch(logout());
  }

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email");
      console.log(password)
      return;
    }
    
  }

  const closeLogin = () => {
    dispatch(logout());
  }



  return (
    <div className="text-black   ">
      <div className="bg-white  border-1 border-gray-400 absolute top-50 left-50 transform-translate-50-50 z-10 h-[500px] w-[400px] p-8 rounded-md">
        <div className="text-xl font-bold  mb-4">Giriş Yap</div>
        <div className="mb-4 ">
          <input onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border-black input-border" placeholder="E-posta" type="text" />
        </div>
        <div className="mb-4 ">
          <input onChange={(e) => setPassword(e.target.value)} maxLength={16} minLength={8} className="w-full p-2 border-black input-border" placeholder="Şifre" type="password" />
        </div>
        <div className="text-center bg-red-600 hover:bg-red-500 text-white border  py-2">
          <button onClick={handleLogin}>Giriş</button>
        </div>
        <div className="py-2 text-center  text-sm hover:text-red-600">
          <p>Şifremi unuttum</p>
        </div>
        <div className="text-center py-5">
          <h1>
            Hesabın yok mu?{" "}
            <Link to="/kayıtol" onClick={handleSignUp} className="text-red-600 link-arrow" >
              Kayıt Ol&gt;{" "}
            </Link>
          </h1>
        </div>
        <div className="absolute text-red-600  top-0 right-2 text-3xl">
          <button onClick={closeLogin}> x </button>
        </div>
      </div>
    </div>
  );
};

export default Login;