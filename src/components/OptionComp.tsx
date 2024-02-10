import React, { useState, useEffect } from 'react';
import OptionsSmall from "./OptionSmall";
import OptionLarge from "./Options";

const OptionComp: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSmallScreen]);

  return (
    <div className=' '>
      {isSmallScreen ? <OptionsSmall /> : <OptionLarge />}
    </div>
  );
};

export default  OptionComp;
