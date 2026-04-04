import { Routes, Route } from "react-router-dom";
import Navigationbar from "./components/Navigationbar.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";

function App() {
  return (
    <>
      <Navigationbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
