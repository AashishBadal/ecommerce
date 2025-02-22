import React, { useContext } from 'react';
import { ProductContext, FilterContext, CartContext, ModalContext } from '../context';

const ProductGrid = () => {
  const { products } = useContext(ProductContext);
  const { searchTerm, category, sort } = useContext(FilterContext);
  const { addToCart } = useContext(CartContext);
  const { openModal } = useContext(ModalContext);

  let filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === 'all' || product.category === category)
  );

  switch (sort) {
    case 'price-asc':
      filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case 'name-asc':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return (
    <main className="products-grid">
      {filteredProducts.map(product => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onClick={() => openModal(product.id)}
          />
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">${product.price}</p>
          <p className="product-category">{product.category}</p>
          <button className="add-to-cart" onClick={() => addToCart(product.id)}>Add to Cart</button>
        </div>
      ))}
    </main>
  );
};

export default ProductGrid;