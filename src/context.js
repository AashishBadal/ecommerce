import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();
export const FilterContext = createContext();
export const CartContext = createContext();
export const ModalContext = createContext();

// src/context.js (excerpt)
const productsData = [
    { id: 1, name: "Quantum Headphones", price: "79.99", image: "/assets/images/headphone.jpg", category: "electronics", description: "High-fidelity wireless audio experience" },
    { id: 2, name: "Pulse Speaker", price: "129.99", image: "/assets/images/speaker.jpg", category: "electronics", description: "360-degree surround sound" },
    { id: 3, name: "Holo Phone", price: "599.99", image: "/assets/images/iphone.jpg", category: "electronics", description: "Holographic display smartphone" },
    { id: 4, name: "Vortex Earbuds", price: "49.99", image: "/assets/images/earbuds.jpg", category: "electronics", description: "Noise-cancelling earbuds" },
    { id: 5, name: "Nova Charger", price: "29.99", image: "/assets/images/charger.jpg", category: "electronics", description: "Fast-charging USB-C adapter" },
    { id: 6, name: "Eclipse Tablet", price: "349.99", image: "/assets/images/tablet.jpg", category: "electronics", description: "10-inch OLED tablet" },
    { id: 7, name: "Photon Mouse", price: "39.99", image: "/assets/images/mouse.jpg", category: "electronics", description: "Ergonomic gaming mouse" },
    { id: 8, name: "Neon Jacket", price: "89.99", image: "/assets/images/jacket.jpg", category: "clothing", description: "Waterproof light-up jacket" },
    { id: 9, name: "Cyber Sneakers", price: "99.99", image: "/assets/images/sneakers.jpg", category: "clothing", description: "LED-illuminated sneakers" },
    { id: 10, name: "Flux Hoodie", price: "59.99", image: "/assets/images/hoodie.jpg", category: "clothing", description: "Thermal-regulating hoodie" },
    { id: 11, name: "Prism Shirt", price: "34.99", image: "/assets/images/tshirt.jpg", category: "clothing", description: "Color-changing t-shirt" },
    { id: 12, name: "Aurora Scarf", price: "24.99", image: "/assets/images/scarf.jpg", category: "clothing", description: "Glow-in-the-dark scarf" },
    { id: 13, name: "Nimbus Hoodie", price: "69.99", image: "/assets/images/hoodie1.jpg", category: "clothing", description: "Weather-resistant hoodie" },
    { id: 14, name: "Zephyr Jacket", price: "79.99", image: "/assets/images/jacket1.jpg", category: "clothing", description: "Lightweight windbreaker" },
    { id: 15, name: "Gravity Watch", price: "149.99", image: "/assets/images/watch.jpg", category: "accessories", description: "Fitness tracking smartwatch" },
    { id: 16, name: "Lunar Smartwatch", price: "199.99", image: "/assets/images/smartwatch.jpg", category: "accessories", description: "Premium smartwatch with GPS" },
    { id: 17, name: "Astro Backpack", price: "69.99", image: "/assets/images/backpack.jpg", category: "accessories", description: "Anti-theft travel backpack" },
    { id: 18, name: "Cosmo Sunglasses", price: "39.99", image: "/assets/images/sunglass.jpg", category: "accessories", description: "Polarized UV-protection glasses" },
    { id: 19, name: "Stellar Belt", price: "29.99", image: "/assets/images/belt.jpg", category: "accessories", description: "LED-buckle smart belt" },
    { id: 20, name: "Zephyr Ring", price: "19.99", image: "/assets/images/ring.jpg", category: "accessories", description: "Mood-sensing smart ring" }
  ];
  
  // ... (rest of context.js remains unchanged)

export const AppProvider = ({ children }) => {
  // Product Context
  const [products] = useState(productsData);

  // Filter Context
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');

  // Cart Context
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (index, change) => {
    const newCart = [...cart];
    newCart[index].quantity += change;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const checkout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      alert(`Thank you for your purchase! Total: $${cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2)}`);
      setCart([]);
      toggleCart();
    }
  };

  // Modal Context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  // Save cart to localStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, 500);
    return () => clearTimeout(timeout);
  }, [cart]);

  return (
    <ProductContext.Provider value={{ products }}>
      <FilterContext.Provider value={{ searchTerm, setSearchTerm, category, setCategory, sort, setSort }}>
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, isCartOpen, toggleCart, checkout }}>
          <ModalContext.Provider value={{ isModalOpen, selectedProductId, openModal, closeModal }}>
            {children}
          </ModalContext.Provider>
        </CartContext.Provider>
      </FilterContext.Provider>
    </ProductContext.Provider>
  );
};