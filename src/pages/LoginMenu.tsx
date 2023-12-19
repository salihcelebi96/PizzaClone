import React from "react";
import { Link } from "react-router-dom";
import "../css/login.css";



const Login: React.FC = () => {
 
   
  
  return (
    <div className=" flex justify-center ">
      <div className="bg-white  border-1 border-gray-400  h-[500px] w-[400px] p-8 rounded-md">
        <div className="text-xl text-center font-bold  mb-4">Giriş Yap</div>
        <div className="mb-4 ">
          <input className="w-full p-2 border-black input-border" placeholder="E-posta" type="text" />
        </div>
        <div className="mb-4 ">
          <input className="w-full p-2 border-black input-border" placeholder="Şifre" type="password" />
        </div>
        <div className="text-center bg-red-600 text-white border  py-2">
          <button>Giriş</button>
        </div>
        <div className="py-2 text-center  text-sm hover:text-red-600">
          <p>Şifremi unuttum</p>
        </div>
        <div className="text-center py-5">
          <h1>
            Hesabın yok mu?{" "}
            <Link className="text-red-600 link-arrow" to="/kayıtol">
              Kayıt Ol&gt;{" "}
            </Link>
          </h1>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
