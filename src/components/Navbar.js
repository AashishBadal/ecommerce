import React, {  useContext } from 'react';
import { CartContext, FilterContext } from '../context';

const Navbar = () => {
  const { toggleCart } = useContext(CartContext);
  const { cart } = useContext(CartContext);
  const { setSearchTerm, setCategory, setSort } = useContext(FilterContext);

  return (
    <nav className="navbar">
      <div className="logo">NeonStore</div>
      <div className="nav-links">
        <input
          type="text"
          id="search-input"
          placeholder="Search products..."
          onChange={(e) => setTimeout(() => setSearchTerm(e.target.value), 300)}
        />
        <select id="category-filter" className="category-dropdown" onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
        </select>
        <select id="sort-filter" className="category-dropdown" onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
        <a href="##" className="nav-item">Home</a>
        <div className="cart-btn" onClick={toggleCart}>
          <span id="cart-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          <svg className="cart-icon" viewBox="0 0 24 24">
            <path d="M17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm0-3l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1v2h2l3.6 7.59L3.62 17H19v-2H7z"/>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;