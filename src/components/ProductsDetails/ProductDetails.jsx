import React, { useState, useEffect } from "react";
import Categories from "../Categorie/Categories";
import Footer from "../Footer/Footer";
import { products } from "../../data/products";
import { useLocation } from "react-router-dom";

function ProductDetails() {
  const location = useLocation();
  const [category, setCategory] = useState(location.state?.category || null);
  const [filterBrand, setFilterBrand] = useState(location.state?.brand || null);
  const [sortOrder, setSortOrder] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 230]);
  const [showRacchetteRange, setShowRacchetteRange] = useState(location.state?.category === "racchetta");
  const [bilancio, setBilancio] = useState(null);
  const [promoOnly, setPromoOnly] = useState(false);


  // PAGINAZIONE
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Funzioni per aggiornare lo stato
  const handleSortLowToHigh = () => setSortOrder("asc");
  const handleSortHighToLow = () => setSortOrder("desc");

  // Filtro per marchi con checkbox toggle
  const handleFilterBrand = (brand) => {
    setFilterBrand((prev) => (prev === brand ? null : brand));
  };

  // Filtro per categorie con checkbox toggle
  const handleCategory = (cat, showRange = false) => {
    setCategory((prev) => {
      if (prev === cat) {
        setShowRacchetteRange(false);
        setBilancio(null);
        return null;
      } else {
        setShowRacchetteRange(showRange);
        if (!showRange) setBilancio(null);
        return cat;
      }
    });
  };

  // Funzione per gestire il range specifico per Racchette
  const handleRacchetteRangeChange = (event) => {
    const value = Number(event.target.value);
    if (value === 0) {
      setBilancio("manico");
    } else if (value === 50) {
      setBilancio("bilanciato");
    } else if (value === 100) {
      setBilancio("piattocorde");
    }
  };

  // Funzione per aggiornare il prezzo minimo e ordinare i prodotti
  const handlePriceRangeChange = (event) => {
    const minPrice = Number(event.target.value);
    setPriceRange([minPrice, priceRange[1]]);
    handleSortLowToHigh();
  };

  // Funzione per filtrare i prodotti in promo
  const handlePromoOnlyChange = () => {
    setPromoOnly(!promoOnly);
  };

  // Funzione per filtrare i prodotti in base ai filtri attivi
  const getFilteredProducts = () => {
    let filtered = [...products];

    if (filterBrand) {
      filtered = filtered.filter(
        (p) => p.brand?.toLowerCase() === filterBrand.toLowerCase()
      );
    }
    if (category) {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }
    if (bilancio) {
      filtered = filtered.filter((p) => p.bilancio === bilancio);
    }
    if (promoOnly) {
      filtered = filtered.filter((p) => p.promo === true);
    }
    if (priceRange[0] !== null) {
      filtered = filtered.filter((p) => p.price >= priceRange[0]);
    }
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Calcola i prodotti da mostrare per la pagina corrente
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category);
      setShowRacchetteRange(location.state.category === "racchetta");
    }
    if (location.state?.brand) {
      setFilterBrand(location.state.brand);
    }
    if (location.state?.promoOnly) {
      setPromoOnly(true);
    }
  }, [location.state]);


  // Quando cambi filtro, torna sempre alla prima pagina
  useEffect(() => {
    setCurrentPage(1);
  }, [filterBrand, category, bilancio, promoOnly, priceRange[0], sortOrder]);

  return (
    <>
      <div className="drawer lg:drawer-open items-start ">
        {/* Drawer Toggle */}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn bg-zinc-800 hover:bg-zinc-700 text-white border-none drawer-button lg:hidden mt-5 px-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filtri
          </label>

          {/* Dropdown Ordina */}
          <div className="dropdown dropdown-bottom mt-5 mr-40 w-full justify-end flex">
            <div tabIndex={0} role="button" className="btn bg-zinc-800 hover:bg-zinc-700 text-white border-none m-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              Ordina
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-zinc-800 rounded-xl z-[1] w-56 p-3 shadow-xl border border-zinc-700"
            >
              <li className="mb-1">
                <button onClick={handleSortLowToHigh} className="text-zinc-200 hover:text-yellow-400 hover:bg-zinc-700 rounded-lg transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  Dal più basso al più alto
                </button>
              </li>
              <li>
                <button onClick={handleSortHighToLow} className="text-zinc-200 hover:text-yellow-400 hover:bg-zinc-700 rounded-lg transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  Dal più alto al più basso
                </button>
              </li>
            </ul>
          </div>

          {/* Lista Prodotti */}
          <div className="w-full flex justify-center p-4">
            <Categories
              prodotti={paginatedProducts}
              limit={productsPerPage}
              useCarousel={false}
              sortOrder={sortOrder}
              filtroBrand={filterBrand}
              minPrice={priceRange[0]}
              maxPrice={priceRange[1]}
              category={category}
              bilancio={bilancio}
              promoOnly={promoOnly}
            />
          </div>
          {/* PAGINAZIONE */}
          {totalPages > 1 && (
            <div className="join my-4 flex justify-center mb-10">
              {[...Array(totalPages)].map((_, idx) => (
                <input
                  key={idx}
                  className={`join-item btn btn-square ${currentPage === idx + 1 ? 'btn-warning' : 'bg-amber-800 hover:bg-amber-700 text-white border-none'}`}
                  type="radio"
                  name="options"
                  aria-label={idx + 1}
                  checked={currentPage === idx + 1}
                  onChange={() => setCurrentPage(idx + 1)}
                  readOnly
                />
              ))}
            </div>
          )}
        </div>

        {/* Drawer Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ul className="menu min-h-full w-80 lg:w-96 p-6 lg:p-8 space-y-10 bg-gradient-to-br from-zinc-800/90 to-zinc-900/80 backdrop-blur-md border-r border-zinc-700/50">
            {/* MARCHI */}
            <div className="space-y-6">
              <div className="border-b border-zinc-700 pb-3">
                <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Marchi
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {["Head", "Babolat", "Wilson", "Adidas", "Nike", "Asics"].map((brand) => (
                  <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-warning border-2"
                      checked={filterBrand === brand}
                      onChange={() => handleFilterBrand(brand)}
                    />
                    <span className="text-base lg:text-lg text-zinc-300 group-hover:text-yellow-400 transition-colors duration-200">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* TIPO PRODOTTO */}
            <div className="space-y-6">
              <div className="border-b border-zinc-700 pb-3">
                <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Tipo di prodotto
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: "racchetta", label: "Racchette" },
                  { id: "maglietta", label: "Magliette" },
                  { id: "pantalone", label: "Pantaloncini" },
                  { id: "scarpa", label: "Scarpe" },
                  { id: "borsone", label: "Borsoni" }
                ].map(({ id, label }) => (
                  <label key={id} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-warning border-2"
                      checked={category === id}
                      onChange={() => handleCategory(id, id === "racchetta")}
                    />
                    <span className="text-base lg:text-lg text-zinc-300 group-hover:text-yellow-400 transition-colors duration-200">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Input Range per Racchette */}
            {showRacchetteRange && (
              <div className="space-y-6">
                <div className="border-b border-zinc-700 pb-3">
                  <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Bilanciamento Racchetta
                  </h2>
                </div>
                <div className="space-y-8 pt-2">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={
                      bilancio === "manico"
                        ? 0
                        : bilancio === "bilanciato"
                        ? 50
                        : 100
                    }
                    className="range range-warning"
                    step="50"
                    onChange={handleRacchetteRangeChange}
                  />
                  <div className="flex justify-between text-sm lg:text-base text-zinc-400">
                    <span className="text-center">
                      Manico
                      <div className="w-px h-3 bg-zinc-600 mx-auto mt-2"></div>
                    </span>
                    <span className="text-center">
                      Bilanciato
                      <div className="w-px h-3 bg-zinc-600 mx-auto mt-2"></div>
                    </span>
                    <span className="text-center">
                      Piattocorde
                      <div className="w-px h-3 bg-zinc-600 mx-auto mt-2"></div>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* PREZZO */}
            <div className="space-y-6">
              <div className="border-b border-zinc-700 pb-3">
                <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Prezzo
                </h2>
              </div>
              <div className="space-y-6 pt-2">
                <div className="text-base lg:text-lg text-zinc-300">Prezzo Minimo: <span className="text-yellow-400 font-medium">€{priceRange[0]}</span></div>
                <input
                  type="range"
                  min={0}
                  max={230}
                  value={priceRange[0]}
                  onChange={handlePriceRangeChange}
                  className="range range-warning"
                />
              </div>
            </div>

            {/* PROMO */}
            <div className="space-y-6">
              <div className="border-b border-zinc-700 pb-3">
                <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                  </svg>
                  Promo
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={promoOnly}
                  onChange={handlePromoOnlyChange}
                  className="toggle toggle-warning"
                />
                <span className="text-base lg:text-lg text-zinc-300">Mostra solo prodotti in promozione</span>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ProductDetails;