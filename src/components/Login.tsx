import React, {useEffect} from "react";

interface LoginProps {
  isLoginOpen: boolean;
  setLoginOpen: (isOpen: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ isLoginOpen, setLoginOpen }) => {
 
 
  useEffect(() => {
    console.log("isLoginOpen changed:", isLoginOpen);
  }, [isLoginOpen]);



  return (
    <div className="text-black relative">
      {isLoginOpen && (
        <div className="bg-white absolute top-10 left-1/2 z-10 h-[300px] w-[400px] p-8 rounded-md">
          <div className="text-xl mb-4">Giriş Yap</div>
          <div className="mb-4">
            <input className="w-full p-2 border-black" placeholder="E-posta" type="text" />
          </div>
          <div className="mb-4">
            <input className="w-full p-2 border-black" placeholder="Şifre" type="password" />
          </div>
          <div className="absolute top-0 right-1 text-2xl">
            <button onClick={() => setLoginOpen(false)}> x </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
