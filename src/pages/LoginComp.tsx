import LoginMenu from "../components/LoginMenu";
import Login from "../components/Login";
import { useState,useEffect } from "react";

const LoginComp :React.FC = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  return (
    <div>
       {windowWidth <= 768 ? <LoginMenu /> : <Login />}
    </div>
  )
}

export default LoginComp
