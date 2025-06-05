import React from 'react';
import Categories from '../Categorie/Categories';
import { categoryBanners } from '../../data/images';

const BrandSection = ({ brand, products }) => {
  return (
    <>
      <div className="flex justify-start mt-5 border-b-2 border-red-500 max-w-[830px] mx-auto">
        <h1 className="font-semibold text-xl sm:text-3xl lg:text-4xl p-4">
          Collezioni {brand}
        </h1>
      </div>
      <img
        src={categoryBanners[brand.toLowerCase()]}
        alt={`${brand} Collection`}
        className="w-full h-56 object-cover md:h-auto md:max-h-56 mt-5"
      />
      <Categories
        prodotti={products}
        limit={12}
        useCarousel={true}
        responsive={true}
        filtroBrand={brand}
      />
    </>
  );
};

export default BrandSection; 