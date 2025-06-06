import React from 'react';
import Categories from '../Categorie/Categories';
import { categoryBanners } from '../../data/images';

const BrandSection = ({ brand, products }) => {
  return (
    <>
      <div className="flex justify-start mt-5 border-b-2 border-yellow-500 max-w-[830px] mx-auto">
        <h1 className="font-graffiti text-[2px] xs:text-[6px] sm:text-base lg:text-2xl p-2 md:py-6 sm:p-4 transform hover:scale-105 transition-transform duration-300 text-white text-stroke-graffiti tracking-wider">
          COLLEZIONE {brand.toUpperCase()}
        </h1>
      </div>
      <img
        src={categoryBanners[brand.toLowerCase()]}
        alt={`${brand} Collection`}
        className="w-full h-32 sm:h-36 md:h-40 lg:h-52 xl:h-56 object-cover mt-5"
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