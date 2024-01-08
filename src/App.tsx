import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const App = () => {

  






  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizzalar" element={<Pizzas />} />
        <Route path='/kampanyalar' element={<Kampanya/>}/>
        <Route path='/wingstreet' element={<Wings/>}/>
        <Route path='/yanurunler' element={<YanUrun/>}/>
        <Route path='/tatlılar' element={<Tatlılar/>}/>
        <Route path='/icecekler' element={<Icecekler/>}/>
        <Route path='/restoranlar' element={<Restoranlar/>}/>
        <Route path='/login' element={<LoginMenu/>}/>
        <Route path='/kayıtol' element={<SignUp/>}/>
        <Route path='/sepet' element={<Sepet />}/>
        <Route path='/payment' element={<Payment />}/>
        <Route path='/admin' element={<AdminPage />}/>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
