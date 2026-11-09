import { useEffect, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { MotionConfig, motion } from 'motion/react';
import ScrollProgress from './components/motion/ScrollProgress';
import theme from './theme';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SubcategoryPage from './pages/SubcategoryPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

// Start each new page at the top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function Layout() {
  const [cartOpen, setCartOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Header onCartClick={() => setCartOpen(true)} />
      {/* each page fades in when you navigate to it */}
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

// Clean page addresses (e.g. /category/ethical-hacking) so search engines can index every page.
// Hosting rewrite rules are in public/_redirects, public/.htaccess and vercel.json.
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* reducedMotion="user": calmer animations for visitors who turned on "reduce motion" */}
      <MotionConfig reducedMotion="user">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="category/:categoryId" element={<CategoryPage />} />
              <Route path="category/:categoryId/:subId" element={<SubcategoryPage />} />
              <Route path="product/:productId" element={<ProductPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
