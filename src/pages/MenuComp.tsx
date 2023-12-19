import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

const MenuComp: React.FC = () => {
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
      {windowWidth <= 768 ? <Menu /> : <Navbar />}
    </div>
  );
}

export default MenuComp;