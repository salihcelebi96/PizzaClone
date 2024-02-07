import React, { useState, useEffect } from 'react';
import OptionsSmall from "./OptionSmall";
import OptionLarge from "./Options";

const OptionComp: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isSmallScreen ? <OptionsSmall /> : <OptionLarge />}
    </div>
  );
};

export default  OptionComp;
