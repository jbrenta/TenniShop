import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Categories from "../../components/Categorie/Categories";
import PromoCard from '../../components/PromoCard/PromoCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import BrandSection from '../../components/BrandSection/BrandSection';
import Carousel from '../../components/Carousel/Carousel';
import Cart from '../../components/Cart/Cart';

// Redux actions
import { moveToTwo, moveToOne } from "../../components/Navbar/NavbarSlice";

// Data and Constants
import { products } from "../../data/products";
import { bannerImages, categoryImages, brandLogos } from "../../data/images";
import { CATEGORIES, BRANDS, DEFAULTS } from "../../config/constants";

// Custom Hooks
import useCountdown from "../../hooks/useCountdown";

/**
 * Home Component - Main landing page of the application
 * Manages the display of:
 * - Main banner carousel
 * - Category navigation
 * - Featured products
 * - Brand sections
 * - Promotional offers
 */
function Home() {
  // Navigation and state management
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  // UI State
  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentOfferSlide, setCurrentOfferSlide] = useState(1);
  const [visibleCards, setVisibleCards] = useState(3);
  const [randomPromoSlides, setRandomPromoSlides] = useState([]);
  
  // Custom hooks
  const counter = useCountdown();
  
  /**
   * Banner Carousel Effect
   * Automatically cycles through banner images every 3 seconds
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide % 4) + 1);
    }, DEFAULTS.CAROUSEL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  /**
   * Promotional Products Effect
   * Fetches and randomizes promotional products on component mount
   */
  useEffect(() => {
    const getRandomPromoSlides = () => {
      return products
        .filter(product => product.promo)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    };

    setRandomPromoSlides(getRandomPromoSlides());
  }, []);

  /**
   * Navigation handler for filtering products
   * @param {string} cat - Category filter
   * @param {string} brand - Brand filter
   */
  const goToProdottiConFiltro = (cat, brand) => {
    dispatch(moveToTwo());
    navigate("/Prodotti", { state: { category: cat, brand: brand } });
  };

  /**
   * Navigation Effect
   * Ensures correct tab is selected when on home page
   */
  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(moveToOne());
    } else if (location.pathname === "/Prodotti") {
      dispatch(moveToTwo());
    }
  }, [location.pathname, dispatch]);

  // Funzione per navigare alle offerte
  const goToOfferte = () => {
    dispatch(moveToTwo());
    navigate("/Prodotti", { state: { promoOnly: true } });
  };

  // Brands to display in dedicated sections
  const featuredBrands = ['Head', 'Babolat', 'Wilson', 'Adidas'];

  // Funzione per prevenire lo scroll verticale
  const preventVerticalScroll = (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Carousel />

      {/* Category Navigation Cards */}
      <div 
        className="grid grid-cols-2 md:flex md:flex-nowrap gap-5 mt-5 px-4 sm:px-8 md:px-12 lg:px-16 mx-auto justify-center max-w-[1400px] overflow-x-auto pb-4 hide-scrollbar"
        onWheel={preventVerticalScroll}
      >
        {Object.entries(CATEGORIES).map(([key, category]) => (
          <div
            key={key}
            className="group relative overflow-hidden rounded-xl w-full md:w-44 lg:w-64 xl:w-72 shrink-0 bg-gradient-to-b from-zinc-800 to-zinc-900 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-zinc-700"
            onClick={() => goToProdottiConFiltro(category)}
          >
            <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
            
            <div className="absolute top-0 left-0 right-0 p-3 lg:p-4 z-20">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wide break-words">
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </h2>
              <div className="h-0.5 lg:h-1 w-12 lg:w-16 bg-yellow-500 mt-2 lg:mt-3 rounded-full"></div>
            </div>
            
            <figure className="w-full h-32 sm:h-36 md:h-40 lg:h-52 xl:h-56">
              <img 
                src={categoryImages[category]} 
                alt={key.toLowerCase()}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </figure>
            
            <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
              <button className="w-full py-2 lg:py-2.5 px-3 lg:px-4 bg-yellow-500 text-black text-sm lg:text-base font-semibold rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                Scopri di più
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Style for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Recommended Products Section */}
      <div className="flex justify-start mt-5 border-b-2 border-red-500 max-w-[830px] mx-auto">
        <h1 className="font-semibold text-xl sm:text-3xl lg:text-4xl p-4">
          CONSIGLIATO PER TE
        </h1>
      </div>

      <div onWheel={preventVerticalScroll}>
        <Categories
          prodotti={products}
          limit={12}
          useCarousel={true}
          responsive={true}
        />
      </div>

      {/* Brand Logos Section */}
      <div className="flex justify-start mt-5 border-b-2 max-w-[830px] mx-auto">
        <h1 className="font-semibold text-xl sm:text-3xl lg:text-4xl p-4">
          TOP MARCHI
        </h1>
      </div>
      <div className="flex justify-center items-center gap-2 mx-auto mt-5 flex-wrap">
        {Object.entries(BRANDS).map(([key, brand]) => (
          <img
            key={key}
            src={brandLogos[key.toLowerCase()]}
            alt={brand}
            className="w-20 h-16 lg:w-32 lg:h-28 logo-gradient hover:scale-110 hover:opacity-75 transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={() => goToProdottiConFiltro(null, brand)}
          />
        ))}
      </div>

      {/* Daily Offer Section */}
      <div className="w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 mt-6 md:mt-10 py-4 md:py-16 relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTkuNSA2MEgwVjBoNjB2NjBoLS41ek0wIDBoNjB2NjBIMFYweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50"></div>
        
        {/* Top border gradient */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        
        {/* Bottom border gradient */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="flex flex-col items-center text-center relative">
            {/* Enhanced Title Section */}
            <div className="mb-4 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
                Offerta del Giorno
                <div className="h-1 w-24 bg-yellow-400 mx-auto mt-2 md:mt-3 rounded-full"></div>
              </h2>
              <p className="text-xs md:text-base text-zinc-300 max-w-2xl mx-auto">
                Approfitta di questa offerta esclusiva, disponibile solo per le prossime:
              </p>
            </div>

            {/* Enhanced Countdown Timer */}
            <div className="grid grid-cols-3 gap-2 md:gap-5 mb-4 md:mb-12">
              {[
                { label: "ORE", value: counter.hours },
                { label: "MINUTI", value: counter.minutes },
                { label: "SECONDI", value: counter.seconds }
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center p-2 md:p-4 bg-zinc-800/80 backdrop-blur-sm rounded-xl border border-yellow-500/10 min-w-[60px] md:min-w-[100px]"
                >
                  <span className="font-mono text-xl md:text-3xl lg:text-4xl text-yellow-400 font-bold tabular-nums">
                    {String(value).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] md:text-xs font-medium mt-0.5 md:mt-1 text-zinc-400 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>

            {/* Enhanced Featured Product */}
            {randomPromoSlides.length > 0 && (
              <div className="bg-zinc-800/50 backdrop-blur-md rounded-2xl p-3 md:p-8 w-full max-w-3xl border border-zinc-700/50 shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8">
                  {/* Product Image */}
                  <div className="w-[50%] sm:w-[60%] md:w-1/2 relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={randomPromoSlides[0].image}
                        alt={randomPromoSlides[0].name}
                        className="w-full h-auto rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Discount Badge */}
                      <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-yellow-500 text-black text-[10px] md:text-sm font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
                        -20%
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="w-full md:w-1/2 text-left space-y-2 md:space-y-4">
                    <div className="space-y-0.5 md:space-y-1">
                      <p className="text-yellow-400 text-xs md:text-base font-medium">
                        {randomPromoSlides[0].brand}
                      </p>
                      <h3 className="text-lg md:text-2xl font-bold text-white">
                        {randomPromoSlides[0].name}
                      </h3>
                    </div>

                    {/* Price Section */}
                    <div className="space-y-1 md:space-y-2">
                      <div className="flex items-baseline gap-2 md:gap-3">
                        <span className="text-xl md:text-3xl font-bold text-white">
                          €{(randomPromoSlides[0].price * 0.8).toFixed(2)}
                        </span>
                        <span className="text-sm md:text-lg text-zinc-500 line-through">
                          €{randomPromoSlides[0].price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-zinc-400">
                        Risparmi: €{(randomPromoSlides[0].price * 0.2).toFixed(2)}
                      </p>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-1 md:space-y-2 py-1 md:py-2">
                      <li className="flex items-center text-xs md:text-sm text-zinc-300">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Spedizione gratuita
                      </li>
                      <li className="flex items-center text-xs md:text-sm text-zinc-300">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Disponibilità immediata
                      </li>
                      <li className="flex items-center text-xs md:text-sm text-zinc-300">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Garanzia 2 anni
                      </li>
                    </ul>

                    {/* Action Button */}
                    <button
                      onClick={() => goToProdottiConFiltro(randomPromoSlides[0].category, randomPromoSlides[0].brand)}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold px-4 md:px-6 py-2 md:py-3 rounded-xl transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <span>Approfitta Ora</span>
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Brand Sections */}
      {featuredBrands.map(brand => (
        <BrandSection key={brand} brand={brand} products={products} />
      ))}

      {/* Statistics Section */}
      <div className="bg-zinc-800 py-8 md:py-16 mt-6 md:mt-10">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              I Nostri Numeri
              <div className="h-1 w-24 bg-yellow-400 mx-auto mt-3 rounded-full"></div>
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm">Scopri i risultati che abbiamo raggiunto insieme</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between relative">
            {/* Spedizioni */}
            <div className="w-full md:w-auto mb-6 md:mb-0 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-900 border-2 md:border-4 border-zinc-800 shadow-lg flex items-center justify-center mb-3 md:mb-4 relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white mb-0.5 md:mb-1">310K</div>
                <div className="text-yellow-400 font-medium text-sm md:text-base">Spedizioni</div>
                <div className="text-zinc-400 text-xs md:text-sm mt-0.5 md:mt-1">Gen 1 - Feb 1</div>
              </div>
            </div>

            {/* Utenti */}
            <div className="w-full md:w-auto mb-6 md:mb-0 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-900 border-2 md:border-4 border-zinc-800 shadow-lg flex items-center justify-center mb-3 md:mb-4 relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white mb-0.5 md:mb-1">105.2K</div>
                <div className="text-yellow-400 font-medium text-sm md:text-base">Clienti Attivi</div>
                <div className="flex items-center justify-center text-zinc-400 text-xs md:text-sm mt-0.5 md:mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +400 (22%)
                </div>
              </div>
            </div>

            {/* Nuovi Clienti */}
            <div className="w-full md:w-auto relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-900 border-2 md:border-4 border-zinc-800 shadow-lg flex items-center justify-center mb-3 md:mb-4 relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white mb-0.5 md:mb-1">1.2K</div>
                <div className="text-yellow-400 font-medium text-sm md:text-base">Nuovi Clienti</div>
                <div className="flex items-center justify-center text-zinc-400 text-xs md:text-sm mt-0.5 md:mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +90 (14%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-zinc-900 py-8 md:py-16 mt-6 md:mt-10">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Perché Sceglierci
              <div className="h-1 w-24 bg-yellow-400 mx-auto mt-3 rounded-full"></div>
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm">I vantaggi di acquistare da noi</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Vantaggi */}
            <div className="bg-zinc-800 p-4 md:p-5 rounded-lg hover:bg-zinc-800/80 transition-all duration-300 border border-zinc-700">
              <div className="text-yellow-400 mb-3 md:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white text-sm md:text-base font-medium mb-2">Vantaggi Esclusivi</h3>
              <p className="text-zinc-400 text-xs md:text-sm">
                Offerte speciali e sconti dedicati ai nostri clienti.
              </p>
            </div>

            {/* Spedizione */}
            <div className="bg-zinc-800 p-4 md:p-5 rounded-lg hover:bg-zinc-800/80 transition-all duration-300 border border-zinc-700">
              <div className="text-yellow-400 mb-3 md:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-white text-sm md:text-base font-medium mb-2">Spedizione GRATIS</h3>
              <p className="text-zinc-400 text-xs md:text-sm">
                Consegna gratuita per ordini sopra €50.
              </p>
            </div>

            {/* Rimborso */}
            <div className="bg-zinc-800 p-4 md:p-5 rounded-lg hover:bg-zinc-800/80 transition-all duration-300 border border-zinc-700">
              <div className="text-yellow-400 mb-3 md:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3" />
                </svg>
              </div>
              <h3 className="text-white text-sm md:text-base font-medium mb-2">Rimborso Garantito</h3>
              <p className="text-zinc-400 text-xs md:text-sm">
                30 giorni di garanzia su tutti i prodotti.
              </p>
            </div>

            {/* Sicurezza */}
            <div className="bg-zinc-800 p-4 md:p-5 rounded-lg hover:bg-zinc-800/80 transition-all duration-300 border border-zinc-700">
              <div className="text-yellow-400 mb-3 md:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-white text-sm md:text-base font-medium mb-2">Acquisto Sicuro</h3>
              <p className="text-zinc-400 text-xs md:text-sm">
                Pagamenti sicuri e dati protetti.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-zinc-800 py-8 md:py-16 mt-6 md:mt-10">
        <div className="max-w-[600px] mx-auto px-4">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Contattaci
              <div className="h-1 w-24 bg-yellow-400 mx-auto mt-3 rounded-full"></div>
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm">Siamo qui per aiutarti</p>
          </div>
          
          <div className="bg-zinc-900 rounded-lg p-6 md:p-8 border border-zinc-700">
            <form className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-white">Nome</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Il tuo nome" 
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-zinc-800 border border-zinc-600 focus:border-yellow-400 rounded-lg text-white placeholder-zinc-500 text-xs md:text-sm transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5 md:space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-white">Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="La tua email" 
                      className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-zinc-800 border border-zinc-600 focus:border-yellow-400 rounded-lg text-white placeholder-zinc-500 text-xs md:text-sm transition-colors"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-1.5 md:space-y-2">
                <label className="block text-xs md:text-sm font-medium text-white">Oggetto</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Oggetto del messaggio" 
                    className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-zinc-800 border border-zinc-600 focus:border-yellow-400 rounded-lg text-white placeholder-zinc-500 text-xs md:text-sm transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5 md:space-y-2">
                <label className="block text-xs md:text-sm font-medium text-white">Messaggio</label>
                <div className="relative">
                  <textarea 
                    rows="4" 
                    placeholder="Il tuo messaggio" 
                    className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-zinc-800 border border-zinc-600 focus:border-yellow-400 rounded-lg text-white placeholder-zinc-500 text-xs md:text-sm transition-colors resize-none"
                  ></textarea>
                </div>
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full px-4 md:px-6 py-2.5 md:py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg text-xs md:text-sm transition-colors"
                >
                  Invia Messaggio
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
