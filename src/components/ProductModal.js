import React, { useContext } from 'react';
import { ModalContext, CartContext, ProductContext } from '../context';

const ProductModal = () => {
  const { isModalOpen, selectedProductId, closeModal } = useContext(ModalContext);
  const { addToCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);

  const product = products.find(p => p.id === selectedProductId);

  if (!isModalOpen || !product) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        <span className="close-modal" onClick={closeModal}>×</span>
        <img src={product.image} alt={product.name} className="modal-image" loading="lazy" />
        <h2 className="modal-title" data-product-id={product.id}>{product.name}</h2>
        <p className="modal-price">${product.price}</p>
        <p className="modal-category">Category: {product.category}</p>
        <p className="modal-description">{product.description}</p>
        <button className="add-to-cart" onClick={() => { addToCart(product.id); closeModal(); }}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductModal;