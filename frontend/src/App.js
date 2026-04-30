import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navigationbar from "./components/Navigationbar.jsx";
import Home from "./components/pages/Home.jsx";
import Menu from "./components/pages/Menu/Menu.jsx";
import Contact from "./components/pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/pages/About.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import CartModal from "./components/pages/Cart/CartModal.jsx";
import { useState, useEffect, useContext } from "react";
import CheckoutForm from "./components/pages/Cart/CheckoutForm.jsx";
import { UserContextProvider, UserContext} from "./Authentication/UserContext.jsx";
import NotFound from "./components/NotFound.jsx";

// Pjesa e mbrojtjes se Admin
function AdminProtectedRoute() {
  const { userInfo, authChecked } = useContext(UserContext);

  if (!authChecked) {
    return null;
  }

  if (userInfo?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <AdminDashboard />;
}

function App() {
  const location = useLocation();

  const [shport, setShport] = useState(() => {
    const storedShport = localStorage.getItem("shport");
    return storedShport ? JSON.parse(storedShport) : [];
  });
  const [showShport, setShowShport] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // shto ne shport
  const addToShport = (meal) => {
    setShport((prev) => {
      const existing = prev.find((item) => item.name === meal.name);

      if (existing) {
        return prev.map((item) => {
          if (item.name === meal.name) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }

      return [...prev, { ...meal, quantity: 1 }];
    });
  };
  // rrit sasin ne shport
  const rritSasin = (id) => {
    setShport((prev) =>
      prev.map((item) => {
        if (item.name === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item; 
        }
      }),
    );
  };
  // zvogelon sasin ne shport
  const zvogelonSasin = (id) => {
    setShport((prev) =>
      prev.map((item) => {
          if (item.name === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        })
        .filter((item) => item.quantity > 0),
    );
  };
  // heq item nga shporta
  const removeFromShport = (id) => {
    setShport((prev) => prev.filter((item) => item.name !== id));
  };
  //pastron shporten pas checkout
  const clearShport = () => {
    setShport([]);
  };
  // ruan shporten ne localStorage per te mbajtur gjendjen edhe pas rifreskimit te faqes
  useEffect(() => {
    localStorage.setItem("shport", JSON.stringify(shport));
  }, [shport]);

  return (
    <UserContextProvider>
      {!location.pathname.startsWith("/admin/dashboard") &&
        !location.pathname.startsWith("/notfound") && (
          <Navigationbar
            shport={shport}
            openShport={() => setShowShport(true)}
          />
        )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={<Menu addToShport={addToShport} clearShport={clearShport} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* Permiresimi i route */}
        <Route path="/admin/dashboard/*" element={<AdminProtectedRoute />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
      <CartModal
        show={showShport}
        handleClose={() => setShowShport(false)}
        shport={shport}
        rritSasin={rritSasin}
        zvogelonSasin={zvogelonSasin}
        removeFromShport={removeFromShport}
        setShowShport={setShowShport}
        openCheckout={() => {
          setShowCheckout(true);
          setShowShport(false);
        }}
      />
      <CheckoutForm
        show={showCheckout}
        handleClose={() => setShowCheckout(false)}
        total={shport.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        )}
        shport={shport}
        clearShport={clearShport}
      />
      {!location.pathname.startsWith("/admin/dashboard") &&
        !location.pathname.startsWith("/notfound") && <Footer />}
    </UserContextProvider>
  );
}

export default App;
