import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ToastContainer } from './components/Toast';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { CategoryPage } from './pages/Category';
import { ProductDetails } from './pages/ProductDetails';
import { Favorites } from './pages/Favorites';
import { Promotions } from './pages/Promotions';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastProvider>
        <CartProvider>
          <FavoritesProvider>
            <div id="app-root" className="flex flex-col min-h-screen bg-white text-[#171717] font-sans antialiased selection:bg-[#F3E5DF] selection:text-[#171717]">
              {/* Site Header */}
              <Header />

              {/* Main Content View */}
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/produtos" element={<Products />} />
                  <Route path="/categoria/:slug" element={<CategoryPage />} />
                  <Route path="/produto/:slug" element={<ProductDetails />} />
                  <Route path="/favoritos" element={<Favorites />} />
                  <Route path="/promocoes" element={<Promotions />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/contato" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>

              {/* Footer */}
              <Footer />

              {/* Global Floating Elements & Drawers */}
              <CartDrawer />
              <WhatsAppButton />
              <ToastContainer />
            </div>
          </FavoritesProvider>
        </CartProvider>
      </ToastProvider>
    </Router>
  );
}
