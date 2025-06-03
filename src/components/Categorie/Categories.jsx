import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { hiddenDetails, visibleDetails } from "../ProductsDetails/ProductDetailsSlice";
import { visibleSingleProduct, setSelectedProduct } from "../SingleProduct/SingleProductSlice";
import { moveToTwo } from "../Navbar/NavbarSlice";
import { useNavigate } from "react-router-dom";
import useResponsiveCards from '../../hooks/useResponsiveCards';

function Categories({
  prodotti = [],
  limit = 4,
  filtroBrand = null,
  category = null, // Nuovo prop per filtrare per categoria
  useCarousel = true,
  visibleCount = 4,
  responsive = true,
  sortOrder = null, // "asc" | "desc" | null
  minPrice = null,
  bilancio = null,
  promoOnly = false,
  searchTerm = null, // Nuovo prop per il termine di ricerca
}) {
  const [slides, setSlides] = useState([]); 
  const [startIndex, setStartIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const visibleCards = useResponsiveCards(responsive, visibleCount);

  // Genera lista filtrata, ordinata e limitata
  useEffect(() => {
    const getFilteredProducts = () => {
      let filtered = [...prodotti];

      // Filtro per termine di ricerca
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchTermLower) ||
          p.category.toLowerCase().includes(searchTermLower) ||
          p.brand.toLowerCase().includes(searchTermLower) ||
          (p.description && p.description.toLowerCase().includes(searchTermLower))
        );
      }

      // Filtro per brand
      if (filtroBrand) {
        filtered = filtered.filter(
          (p) => p.brand?.toLowerCase() === filtroBrand.toLowerCase()
        );
      }

      // Filtro per categoria
      if (category) {
        filtered = filtered.filter(
          (p) => p.category?.toLowerCase() === category.toLowerCase()
        );
      }

      // Filtro per range di prezzo
      if (minPrice !== null) {
        filtered = filtered.filter((p) => p.price >= minPrice);
      }

      // Filtro per bilanciamento racchetta
      if (bilancio) {
        filtered = filtered.filter((p) => p.bilancio === bilancio);
      }

      // Filtro per prodotti in promo
      if (promoOnly) {
        filtered = filtered.filter((p) => p.promo === true);
      }

      // Ordinamento
      if (sortOrder === "asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "desc") {
        filtered.sort((a, b) => b.price - a.price);
      } else {
        // Shuffle se non specificato
        filtered.sort(() => 0.5 - Math.random());
      }

      return filtered.slice(0, limit);
    };

    setSlides(getFilteredProducts());
  }, [prodotti, limit, filtroBrand, category, sortOrder, minPrice, bilancio, promoOnly, searchTerm]);

  // Navigazione Carousel
  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Funzione per gestire il click su "Buy Now"
  const handleBuyNow = (product) => {
    console.log("Buy Now click", product);
    dispatch(hiddenDetails());
    dispatch(visibleSingleProduct());
    dispatch(setSelectedProduct(product));
    dispatch(moveToTwo());
    navigate("/Prodotti",{ state: { showSingle: true } });
  };

  // Mostra messaggio se non ci sono prodotti
  if (slides.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">Nessun prodotto trovato</h2>
      </div>
    );
  }

  // Layout FLEX WRAP
  if (!useCarousel) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-6">
          {slides.map((product) => (
            <div
              key={product.id}
              className="card w-72 bg-base-100 shadow-md hover:shadow-xl transition-shadow glass"
            >
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
                <p>{product.description}</p>
                <div className="card-actions">
                  <button className="btn btn-primary" onClick={() => handleBuyNow(product)}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Carousel
  let visibleSlides = slides.slice(startIndex, startIndex + visibleCards);
  if (visibleSlides.length < visibleCards) {
    visibleSlides = [
      ...visibleSlides,
      ...slides.slice(0, visibleCards - visibleSlides.length),
    ];
  }

  return (
    <div className="carousel w-full relative mt-5">
      <div className="flex justify-center items-center gap-2 flex-wrap mx-auto">
        {visibleSlides.map((slide) => (
          <div
            key={slide.id}
            className="card bg-base-100 w-72 shadow-2xl glass"
          >
            <figure className="px-10 pt-10 h-40 flex items-center justify-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="rounded-xl max-h-full"
              />
            </figure>
            <div className="card-body items-center text-center">
              {slide.promo && (
                <div className="badge badge-secondary absolute top-2 left-2 z-50">
                  Promo
                </div>
              )}
              <h2 className="card-title">{slide.name}</h2>
              {slide.promo ? (
                <span className="inline-flex">
                  <p className="line-through text-gray-500 mr-2">
                    ${slide.price + 20}
                  </p>
                  <p className="text-green-500">${slide.price}</p>
                </span>
              ) : (
                <p className="text-sm font-normal">${slide.price}</p>
              )}
              <p>{slide.description}</p>
              <div className="card-actions">
                <button className="btn btn-primary " onClick={() => handleBuyNow(slide)}>Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
        <button className="btn btn-circle" onClick={handlePrev}>
          ❮
        </button>
      </div>
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
        <button className="btn btn-circle" onClick={handleNext}>
          ❯
        </button>
      </div>
    </div>
  );
}

export default Categories;
