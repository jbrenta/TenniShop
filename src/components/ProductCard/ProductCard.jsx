import React from 'react';

const ProductCard = ({ product, onBuyNow, className = '' }) => {
  if (!product) return null;

  // Funzione per ottenere le prime 10 parole
  const getFirst10Words = (text) => {
    return text.split(' ').slice(0, 10).join(' ') + '...';
  };

  return (
    <div className={`card bg-base-100 w-72 shadow-2xl glass ${className}`}>
      <figure className="px-10 pt-10 h-40 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="rounded-xl max-h-full"
        />
      </figure>
      <div className="card-body items-center text-center">
        {product.promo && (
          <div className="badge badge-secondary absolute top-2 left-2 z-50">
            Promo
          </div>
        )}
        <h2 className="card-title">{product.name}</h2>
        {product.promo ? (
          <span className="inline-flex">
            <p className="line-through text-gray-500 mr-2">
              ${product.price + 20}
            </p>
            <p className="text-green-500">${product.price}</p>
          </span>
        ) : (
          <p className="text-sm font-normal">${product.price}</p>
        )}
        <p className="text-sm text-gray-600">{getFirst10Words(product.description)}</p>
        <div className="card-actions">
          <button 
            className="btn btn-primary"
            onClick={() => onBuyNow(product)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 