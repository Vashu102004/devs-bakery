import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomOrders from './pages/CustomOrders';
import ComingSoon from './pages/ComingSoon';
import CartDrawer from './components/CartDrawer';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <CartDrawer />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/our-outlets" element={<ComingSoon />} />
            <Route path="/project-charcoal" element={<ComingSoon />} />
            <Route path="/blog" element={<ComingSoon />} />
            <Route path="/custom-orders" element={<CustomOrders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/tracking" element={<OrderTracking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
