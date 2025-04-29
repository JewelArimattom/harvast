import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SearchBar from './components/searchBar';
import ResetPassword from './pages/restetPassword';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Cart = lazy(() => import('./pages/Cart'));
const Collection = lazy(() => import('./pages/Collection'));
const Orders = lazy(() => import('./pages/Orders'));
const Product = lazy(() => import('./pages/Product'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'));
const Policy = lazy(() => import('./pages/Privacy Policy'));

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Navigation Bar */}
      <NavBar />

      {/* Search Bar */}
      <SearchBar />

      {/* Routes with Suspense for lazy loading */}
      <Suspense fallback={<div className="text-center text-2xl font-bold mt-10">Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          {/* Fallback Route for 404 Not Found */}
        </Routes>
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;