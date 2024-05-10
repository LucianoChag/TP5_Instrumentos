import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./Navbar";
import Home from "./Home";
import DondeEstamos from "./DondeEstamos";
import Detalle from "./Detalle";
import Instrument from "./Instrument";

export const AppRouter = () => (
  <Router>
    <Menu />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/DondeEstamos" element={<DondeEstamos />} />
      <Route path="/Instrumentos" element={<Instrument />} />
      <Route path="/Detalle/:id" element={<Detalle></Detalle>} />{" "}
    </Routes>
  </Router>
);
