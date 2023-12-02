import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from "./components/MenuComp";
import Footer from "./components/FooterComp";
import Pizzas from "./pages/Pizzas";
import Kampanya from './pages/Kampanyalar';
import Wings from "./pages/Wings";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizzalar" element={<Pizzas />} />
        <Route path='/kampanyalar' element={<Kampanya/>}/>
        <Route path='/wingstreet' element={<Wings/>}/>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
