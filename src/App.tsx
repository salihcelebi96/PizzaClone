import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Home from './pages/Home';
import Navbar from "./pages/MenuComp";
import Footer from "./components/FooterComp";
import Pizzas from "./pages/Pizzas";
import Kampanya from './pages/Kampanyalar';
import Wings from "./pages/Wings";
import YanUrun from './pages/YanUrun';
import Tatlılar from "./pages/Tatlı";
import Icecekler from "./pages/Icecekler";
import Restoranlar from './pages/GoogleMap';
import LoginMenu from "./pages/LoginMenu";
import SignUp from './pages/SignUp';
import Sepet from "./pages/Sepet";
import Payment from './pages/Payment';
import AdminPage from './pages/AdminPage';
import Manager from './pages/Manager';
import ProfilPage from "./pages/ProfilPage";
import Siparislerim from "./pages/profilComponents/Siparislerim";
import Adreslerim from "./pages/profilComponents/Adreslerim";
import Hesabım from "./pages/profilComponents/Hesabım";
import OdemeYontemleri from "./pages/profilComponents/OdemeYontemi";




const App = () => {
  
  const isAdminLogin = useSelector((state: RootState) => state.admin.adminLogin);
  
  


 

  

  return (
    <Router>
      <Navbar />
      
        
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizzalar" element={<Pizzas />} />
            <Route path='/kampanyalar' element={<Kampanya />} />
            <Route path='/wingstreet' element={<Wings />} />
            <Route path='/yanurunler' element={<YanUrun />} />
            <Route path='/tatlılar' element={<Tatlılar />} />
            <Route path='/icecekler' element={<Icecekler />} />
            <Route path='/restoranlar' element={<Restoranlar />} />
            <Route path='/login' element={<LoginMenu />} />
            <Route path='/kayıtol' element={<SignUp />} />
            <Route path='/sepet' element={<Sepet />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/manager' element={isAdminLogin ? <Manager /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path='/profil' element={<ProfilPage/>}  />
            <Route path='/profil/siparislerim' element={<Siparislerim/>}  />
            <Route path='/profil/adreslerim' element={<Adreslerim/>}  />
            <Route path='/profil/hesabım' element={<Hesabım/>}  />
            <Route path='/profil/ödeme-yöntemlerim' element={<OdemeYontemleri/>}  />
            
          </Routes>
          <Footer />
       
     
       
    </Router>
  );
};

export default App;
