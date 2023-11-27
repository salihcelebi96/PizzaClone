import React, { useState, useEffect } from 'react';
import SlideLarge from "../components/Slide";
import SlideSmall from "../components/SlideSmall";

const SlideComp: React.FC = () => {
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
      {windowWidth <= 768 ? <SlideSmall /> : <SlideLarge />}
    </div>
  );
}

export default SlideComp;
