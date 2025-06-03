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
  
  // Global state
  const side = useSelector((state) => state.sidebar.visibility);

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
    }
  }, [dispatch, location.pathname]);

  // Funzione per navigare alle offerte
  const goToOfferte = () => {
    dispatch(moveToTwo());
    navigate("/Prodotti", { state: { promoOnly: true } });
  };

  // Brands to display in dedicated sections
  const featuredBrands = ['Head', 'Babolat', 'Wilson', 'Adidas'];

  return (
    <>
      <Carousel />

      {/* Category Navigation Cards */}
      <div className="flex flex-wrap gap-5 mt-5 min-[471px]:mx-20 min-[632px]:mx-28 sm:mx-auto justify-center max-w-[900px]">
        {Object.entries(CATEGORIES).map(([key, category]) => (
          <div
            key={key}
            className="card bg-base-100 w-36 sm:w-40 md:w-40 lg:w-52 hover:scale-110 hover:opacity-75 transition-transform duration-300 ease-in-out shadow-sm cursor-pointer glass"
            onClick={() => goToProdottiConFiltro(category)}
          >
            <div className="card-body p-0">
              <h2 className="card-title p-2 border-2 border-b-0 rounded-t-lg">
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </h2>
            </div>
            <figure>
              <img src={categoryImages[category]} alt={key.toLowerCase()} />
            </figure>
          </div>
        ))}
      </div>

      {/* Recommended Products Section */}
      <div className="flex justify-start mt-5 border-b-2 border-yellow-500 max-w-[830px] mx-auto">
        <h1 className="font-semibold text-xl sm:text-3xl lg:text-4xl p-4">
          CONSIGLIATO PER TE
        </h1>
      </div>

      <Categories
        prodotti={products}
        limit={12}
        useCarousel={true}
        responsive={true}
      />

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
      <div className="w-full bg-gradient-to-r from-zinc-900 via-yellow-600 to-zinc-900 mt-10 py-8 px-4">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
              OFFERTA DEL GIORNO
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-6">
              Non perdere questa occasione irripetibile!
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
              {[
                { label: "ORE", value: counter.hours },
                { label: "MINUTI", value: counter.minutes },
                { label: "SECONDI", value: counter.seconds }
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center p-3 md:p-4 bg-black/30 backdrop-blur-sm rounded-lg text-white min-w-[90px] md:min-w-[120px]"
                >
                  <span className="countdown font-mono text-2xl md:text-4xl lg:text-5xl">
                    <span style={{ "--value": value }}>{value}</span>
                  </span>
                  <span className="text-xs md:text-sm font-semibold mt-1">{label}</span>
                </div>
              ))}
            </div>

            {/* Featured Product */}
            {randomPromoSlides.length > 0 && (
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 md:p-6 w-full max-w-2xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-full md:w-1/2">
                    <img
                      src={randomPromoSlides[0].image}
                      alt={randomPromoSlides[0].name}
                      className="w-full h-auto rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full md:w-1/2 text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {randomPromoSlides[0].name}
                    </h3>
                    <p className="text-white/80 mb-3">
                      {randomPromoSlides[0].brand}
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl md:text-3xl font-bold text-yellow-400">
                        €{(randomPromoSlides[0].price * 0.8).toFixed(2)}
                      </span>
                      <span className="text-lg md:text-xl text-white/60 line-through">
                        €{randomPromoSlides[0].price.toFixed(2)}
                      </span>
                      <span className="bg-yellow-500 text-black text-sm font-bold px-2 py-1 rounded">
                        -20%
                      </span>
                    </div>
                    <button
                      onClick={() => goToProdottiConFiltro(randomPromoSlides[0].category, randomPromoSlides[0].brand)}
                      className="btn btn-primary w-full md:w-auto"
                    >
                      Scopri di più
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
      <div className="bg-gradient-to-r from-zinc-900 via-yellow-600 to-zinc-900 py-16 mt-10">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            I Nostri Numeri
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Spedizioni */}
            <div className="stat bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
              <div className="stat-figure text-yellow-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-12 h-12 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-value text-4xl font-bold text-white mb-2">310K</div>
              <div className="stat-title text-lg font-medium text-yellow-500 mb-1">Spedizioni</div>
              <div className="stat-desc text-white/60">Gen 1 - Feb 1</div>
            </div>

            {/* Utenti */}
            <div className="stat bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
              <div className="stat-figure text-yellow-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-12 h-12 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="stat-value text-4xl font-bold text-white mb-2">105.2K</div>
              <div className="stat-title text-lg font-medium text-yellow-500 mb-1">Clienti Attivi</div>
              <div className="stat-desc text-white/60">
                <span className="inline-flex items-center text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +400 (22%)
                </span>
              </div>
            </div>

            {/* Nuovi Clienti */}
            <div className="stat bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
              <div className="stat-figure text-yellow-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-12 h-12 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div className="stat-value text-4xl font-bold text-white mb-2">1.2K</div>
              <div className="stat-title text-lg font-medium text-yellow-500 mb-1">Nuovi Clienti</div>
              <div className="stat-desc text-white/60">
                <span className="inline-flex items-center text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +90 (14%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex justify-start mt-5 border-b-2 border-yellow-500 max-w-[830px] mx-auto">
        <h1 className="font-semibold text-xl sm:text-3xl lg:text-4xl p-4">
          Info
        </h1>
      </div>

      {/* Benefits Section */}
      <div className="flex flex-wrap w-full max-w-[900px] mx-auto mt-5 gap-2">
        {/* Vantaggi */}
        <div className="dropdown dropdown-hover flex-1 min-w-[140px]">
          <div
            tabIndex={0}
            role="button"
            className="btn w-full justify-center rounded-none bg-zinc-800 hover:bg-yellow-700"
          >
            Vantaggi
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-yellow-600 text-white rounded-box z-10 min-w-full p-2 shadow-sm"
          >
            <li>
              <a>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Quas perspiciatis tenetur voluptatibus enim in sapiente
                quaerat nostrum facilis quisquam sit.
              </a>
            </li>
          </ul>
        </div>

        {/* Spedizione GRATIS */}
        <div className="dropdown dropdown-hover flex-1 min-w-[140px]">
          <div
            tabIndex={0}
            role="button"
            className="btn w-full justify-center rounded-none bg-zinc-800 hover:bg-yellow-700"
          >
            Spedizione GRATIS
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-yellow-600 text-white rounded-box z-10 min-w-full p-2 shadow-sm"
          >
            <li>
              <a>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Odit obcaecati eius natus officia quasi, omnis maiores
                blanditiis tempore cumque nisi unde suscipit facilis,
                similique incidunt ipsum excepturi, magnam voluptas
                necessitatibus!
              </a>
            </li>
          </ul>
        </div>

        {/* Rimborso */}
        <div className="dropdown dropdown-hover flex-1 min-w-[140px]">
          <div
            tabIndex={0}
            role="button"
            className="btn w-full justify-center rounded-none bg-zinc-800 hover:bg-yellow-700"
          >
            Rimborso
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-yellow-600 text-white rounded-box z-10 min-w-full p-2 shadow-sm"
          >
            <li>
              <a>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nobis earum facere voluptate ex eaque quas fugiat culpa
                doloremque et accusantium?
              </a>
            </li>
          </ul>
        </div>

        {/* Acquista in sicurezza */}
        <div className="dropdown dropdown-hover flex-1 min-w-[140px]">
          <div
            tabIndex={0}
            role="button"
            className="btn w-full justify-center rounded-none bg-zinc-800 hover:bg-yellow-700"
          >
            Acquista in sicurezza
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-yellow-600 text-white rounded-box z-10 min-w-full p-2 shadow-sm"
          >
            <li>
              <a>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Fugiat, incidunt!
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Form Section */}
      <h1 className="text-3xl font-extrabold text-center mt-7">
        Per qualsiasi informazione non dubitare a contattarci!
      </h1>

      <fieldset className="fieldset bg-gray-200 border-base-300 rounded-box w-xs border p-4 flex flex-col items-center my-10 mx-auto w-auto max-w-[400px] sm:w-[400px]">
        <label className="label text-black text-2xl font-bold text-center inline">
          Form
        </label>
        <input
          type="text"
          className="input bg-white mb-3 text-black"
          placeholder="Nome"
        />
        <input
          type="text"
          className="input bg-white mb-3 text-black"
          placeholder="Cognome"
        />
        <input
          type="text"
          className="input bg-white mb-3 text-black"
          placeholder="Email"
        />

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            defaultChecked
            className="checkbox border-black text-black"
          />
          <a href="#" className="text-sm text-black underline">
            Termini e Condizioni
          </a>
        </div>

        <p className="text-gray-600 text-sm">
          "Sì, voglio ricevere informazioni. Puoi cancellare l'iscrizione in
          qualsiasi momento tramite e-mail all'indirizzo tennis@gmail.com"
        </p>
        <button className="btn btn-neutral mt-4 w-full max-w-200px">
          Invia
        </button>
      </fieldset>

      <Footer />
    </>
  );
}

export default Home;
