import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navigationbar from "./components/Navigationbar.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import CartModal from "./pages/CartModal.jsx";
import { useState, useEffect } from "react";
import CheckoutForm from "./pages/CheckoutForm.jsx";
import { UserContextProvider } from "./Authentication/UserContext.jsx";  

function App() {
  const location = useLocation();

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // ADD TO CART
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

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.name !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

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
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
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
