import { Routes, Route } from "react-router-dom";
import Navigationbar from "./components/Navigationbar.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Navigationbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
