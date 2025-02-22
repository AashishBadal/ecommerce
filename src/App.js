import React from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import ProductModal from './components/ProductModal';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ProductGrid />
      <CartSidebar />
      <ProductModal />
    </div>
  );
}

export default App;