import React from 'react';

const PromoCard = ({ product }) => {
  if (!product) return null;

  return (
    <div
      key={product.id}
      className="card glass w-72 shadow-2xl card-uniform border-2"
    >
      <figure className="px-10 pt-10 h-40 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="rounded-xl max-h-full"
        />
      </figure>
      <div className="card-body items-center text-center">
        <div className="badge badge-secondary absolute top-2 left-2 z-20">
          Promo
        </div>
        <h2 className="card-title">{product.name}</h2>
        <span className="inline-flex">
          <p className="line-through text-gray-500 mr-2">
            ${product.price + 20}
          </p>
          <p className="text-green-500">${product.price}</p>
        </span>
        <p>{product.description}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default PromoCard; 