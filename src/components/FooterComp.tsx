import FooterSmall from "../components/FooterSmall";
import FooterLarge from "../components/Footer";
import { useEffect, useState } from "react";

const FooterComp : React.FC = () => {
    const [windowWidth,setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])


    
  return (
    <div>
      {windowWidth <=768 ? <FooterSmall/> : <FooterLarge/> } 
    </div>
  )
}

export default FooterComp
