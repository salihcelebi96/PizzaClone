import Logo from "../assets/logo/pizzaLogo.svg";
import { FaRegCircleUser } from "react-icons/fa6";
import "../css/navbar.css";


const navbar:React.FC = () => {
  return (
    
    <div className="flex justify-center items-center gap-24 h-16 font-semibold cursor-pointer border  text-lg ">
      <div className="">
        <img src={Logo} alt="" />
        
      </div>
      <div>
        <ul className="flex gap-5 ">
          <li className="nav-item">Kampanyalar</li>
          <li className="nav-item">Pizzalar</li>
          <li className="nav-item">WingStreet</li>
          <li className="nav-item">Yan Ürünler</li>
          <li className="nav-item">Restoranlar</li>
        </ul>
      </div>
      <div className="flex items-center  gap-2 ">
        <FaRegCircleUser />
        <h1>Giriş Yap</h1>
      </div>
    </div>
  )
}

export default navbar
