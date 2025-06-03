import React, { useState, useEffect } from "react";
import Categories from "../Categorie/Categories";
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
            className="btn btn-primary drawer-button lg:hidden mt-5"
          >
            Filtri
          </label>

          {/* Dropdown Ordina */}
          <div className="dropdown dropdown-bottom mt-5 mr-40 w-full justify-end flex">
            <div tabIndex={0} role="button" className="btn m-1">
              Ordina↲
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <button onClick={handleSortLowToHigh}>
                  Dal più basso al più alto
                </button>
              </li>
              <li>
                <button onClick={handleSortHighToLow}>
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
                  className="join-item btn btn-square"
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
        <div className="drawer-side mt-10">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ul className="menu bg-black glass text-white min-h-full w-80 p-4">
            {/* MARCHI */}
            <h1 className="text-center text-3xl font-bold border-b-2">
              Marchi
            </h1>
            <label className="flex items-center space-x-2 mt-3 my-2 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={filterBrand === "Head"}
                onChange={() => handleFilterBrand("Head")}
              />
              <span>Head</span>
            </label>
            <label className="flex items-center space-x-2 my-2 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={filterBrand === "Babolat"}
                onChange={() => handleFilterBrand("Babolat")}
              />
              <span>Babolat</span>
            </label>
            <label className="flex items-center space-x-2 my-2 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={filterBrand === "Wilson"}
                onChange={() => handleFilterBrand("Wilson")}
              />
              <span>Wilson</span>
            </label>
            <label className="flex items-center space-x-2 my-2 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={filterBrand === "Adidas"}
                onChange={() => handleFilterBrand("Adidas")}
              />
              <span>Adidas</span>
            </label>
            <label className="flex items-center space-x-2 my-2 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={filterBrand === "Nike"}
                onChange={() => handleFilterBrand("Nike")}
              />
              <span>Nike</span>
            </label>
            <label className="flex items-center space-x-2 my-2 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={filterBrand === "Asics"}
                onChange={() => handleFilterBrand("Asics")}
              />
              <span>Asics</span>
            </label>

            {/* TIPO PRODOTTO */}
            <h1 className="text-center text-3xl font-bold border-b-2 mt-5">
              Tipo di prodotto
            </h1>
            <label className="flex items-center space-x-2 mt-3 my-2 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={category === "racchetta"}
                onChange={() => handleCategory("racchetta", true)}
              />
              <span>Racchette</span>
            </label>
            <label className="flex items-center space-x-2 my-2 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={category === "maglietta"}
                onChange={() => handleCategory("maglietta")}
              />
              <span>Magliette</span>
            </label>
            <label className="flex items-center space-x-2 my-2 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={category === "pantalone"}
                onChange={() => handleCategory("pantalone")}
              />
              <span>Pantaloncini</span>
            </label>
            <label className="flex items-center space-x-2 my-2 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={category === "scarpa"}
                onChange={() => handleCategory("scarpa")}
              />
              <span>Scarpe</span>
            </label>
            <label className="flex items-center space-x-2 my-2 text-base">
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                checked={category === "borsone"}
                onChange={() => handleCategory("borsone")}
              />
              <span>Borsoni</span>
            </label>

            {/* Input Range per Racchette */}
            {showRacchetteRange && (
              <>
                <h1 className="text-center text-3xl font-bold border-b-2 mt-5">
                  Bilanciamento Racchetta
                </h1>
                <div className="w-full max-w-xs mb-5">
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
                    className="range range-warning mt-5"
                    step="50"
                    onChange={handleRacchetteRangeChange}
                  />
                  <div className="flex justify-between px-2.5 mt-2 text-xs">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                  </div>
                  <div className="flex justify-between px-2.5 mt-2 text-xs">
                    <span>Manico</span>
                    <span>Bilanciato</span>
                    <span>Piattocorde</span>
                  </div>
                </div>
              </>
            )}

            {/* PREZZO */}
            <h1 className="text-center text-3xl font-bold border-b-2">
              Prezzo
            </h1>
            <div className="flex flex-col items-center mt-3">
              <label className="text-sm">Prezzo Minimo: €{priceRange[0]}</label>
              <input
                type="range"
                min={0}
                max={230}
                value={priceRange[0]}
                onChange={handlePriceRangeChange}
                className="range range-warning mt-5"
              />
            </div>
            <h1 className="text-center text-3xl font-bold border-b-2 mt-2">
              Promo
            </h1>
            <div className="flex justify-center items-center mt-5">
              <input
                type="checkbox"
                checked={promoOnly}
                onChange={handlePromoOnlyChange}
                className="toggle border-white checked:border-orange-800 checked:bg-warning checked:text-orange-800"
              />
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;