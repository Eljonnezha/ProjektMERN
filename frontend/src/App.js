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
import {
  UserContextProvider,
  UserContext,
} from "./Authentication/UserContext.jsx";

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

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // shto ne kart
  const addToCart = (meal) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === meal.name);

      if (existing) {
        return prev.map((item) =>
          item.name === meal.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...meal, quantity: 1 }];
    });
  };
  // rrit sasin ne kart
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };
  // zvogelon sasin ne kart
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };
  // heq item nga karta
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.name !== id));
  };
  //pastron karten pas checkout
  const clearCart = () => {
    setCart([]);
  };
  // ruan kart ne localStorage per te mbajtur gjendjen edhe pas rifreskimit te faqes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <UserContextProvider>
      {!location.pathname.startsWith("/admin/dashboard") && (
        <Navigationbar cart={cart} openCart={() => setShowCart(true)} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* Permiresimi i route */}
        <Route path="/admin/dashboard/*" element={<AdminProtectedRoute />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <CartModal
        show={showCart}
        handleClose={() => setShowCart(false)}
        cart={cart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        setShowCart={setShowCart}
        openCheckout={() => {
          setShowCheckout(true);
          setShowCart(false);
        }}
      />
      <CheckoutForm
        show={showCheckout}
        handleClose={() => setShowCheckout(false)}
        total={cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
        cart={cart}
        clearCart={clearCart}
      />
      {!location.pathname.startsWith("/admin/dashboard") && <Footer />}
    </UserContextProvider>
  );
}

export default App;
