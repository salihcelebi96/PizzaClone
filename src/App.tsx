
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from "./components/MenuComp";
import Footer from "./components/FooterComp";
import Pizzas from "./pages/Pizzas";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizzalar" element={<Pizzas />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
