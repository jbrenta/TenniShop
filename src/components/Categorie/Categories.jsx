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
  onBuyNow = null // Add onBuyNow prop
}) {
  const [slides, setSlides] = useState([]); 
  const [startIndex, setStartIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const visibleCards = useResponsiveCards(responsive, visibleCount);

  // Funzione per ottenere le prime 10 parole
  const getFirst10Words = (text) => {
    return text.split(' ').slice(0, 10).join(' ') + '...';
  };

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
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      console.log("Buy Now click", product);
      dispatch(hiddenDetails());
      dispatch(visibleSingleProduct());
      dispatch(setSelectedProduct(product));
      dispatch(moveToTwo());
      navigate("/Prodotti", { state: { showSingle: true } });
    }
  };

  // Prevent scroll
  const preventScroll = (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      e.stopPropagation();
    }
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {slides.map((product) => (
            <div
              key={product.id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow glass"
            >
              <figure className="px-4 pt-4 h-24 sm:h-32 md:h-40 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-xl max-h-full object-contain"
                />
              </figure>
              <div className="card-body items-center text-center p-3 sm:p-4">
                {product.promo && (
                  <div className="badge badge-secondary absolute top-2 left-2 z-50 text-xs">
                    Promo
                  </div>
                )}
                <h2 className="card-title text-sm sm:text-base md:text-lg mb-1">{product.name}</h2>
                {product.promo ? (
                  <span className="inline-flex items-center gap-1 sm:gap-2 mb-1">
                    <p className="line-through text-gray-500 text-xs sm:text-sm">
                      €{(product.price + 20).toFixed(2)}
                    </p>
                    <p className="text-green-500 text-xs sm:text-sm">€{product.price.toFixed(2)}</p>
                  </span>
                ) : (
                  <p className="text-xs sm:text-sm mb-1">€{product.price.toFixed(2)}</p>
                )}
                <p className="text-xs text-white mb-2 line-clamp-2">{getFirst10Words(product.description)}</p>
                <div className="card-actions w-full">
                  <button 
                    className="btn btn-sm w-full bg-[rgb(255,72,39)] hover:bg-[rgb(230,65,35)] text-white border-none text-xs sm:text-sm" 
                    onClick={() => handleBuyNow(product)}
                  >
                    Acquista ora
                  </button>
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
  if (visibleSlides.length < visibleCards && slides.length > 0) {
    visibleSlides = [
      ...visibleSlides,
      ...slides.slice(0, visibleCards - visibleSlides.length),
    ];
  }

  return (
    <div className="w-full relative mt-5" onWheel={preventScroll}>
      <div className="flex justify-center items-center gap-4 flex-nowrap overflow-x-hidden mx-auto px-4">
        {visibleSlides.map((slide) => (
          <div
            key={slide.id}
            className="card bg-base-100 w-72 shadow-2xl glass transition-all duration-300 hover:scale-105 shrink-0"
            onWheel={preventScroll}
          >
            <figure className="px-10 pt-10 h-40 flex items-center justify-center">
              <img
                src={slide.image}
                alt={slide.name}
                className="rounded-xl max-h-full object-contain"
              />
            </figure>
            <div className="card-body items-center text-center p-4">
              {slide.promo && (
                <div className="badge badge-secondary absolute top-2 left-2 z-50">
                  Promo
                </div>
              )}
              <h2 className="card-title text-white text-lg mb-2">{slide.name}</h2>
              {slide.promo ? (
                <span className="inline-flex items-center gap-2 mb-2">
                  <p className="line-through text-gray-400">
                    €{(slide.price + 20).toFixed(2)}
                  </p>
                  <p className="text-green-500">€{slide.price.toFixed(2)}</p>
                </span>
              ) : (
                <p className="text-white mb-2">€{slide.price.toFixed(2)}</p>
              )}
              <p className="text-sm text-gray-300 mb-4">{getFirst10Words(slide.description)}</p>
              <div className="card-actions w-full">
                <button 
                  className="btn bg-[rgb(255,72,39)] hover:bg-[rgb(230,65,35)] text-white border-none w-full"
                  onClick={() => handleBuyNow(slide)}
                >
                  Acquista ora
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="btn btn-circle absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-[rgb(255,72,39)] hover:bg-[rgb(230,65,35)] border-none"
        onClick={handlePrev}
      >
        ❮
      </button>
      <button
        className="btn btn-circle absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-[rgb(255,72,39)] hover:bg-[rgb(230,65,35)] border-none"
        onClick={handleNext}
      >
        ❯
      </button>

      <style jsx>{`
        .overflow-x-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
          overflow: hidden;
        }
        .overflow-x-hidden::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Categories;
