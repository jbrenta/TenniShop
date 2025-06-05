import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveToOne, moveToTwo, moveToThree, showSearch, setSearchTerm } from "./NavbarSlice";
import { openCart } from "../Cart/CartSlice";
import { hidden } from "../../pages/Home/HomeSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import { toggleMobileMenu } from "../MobileMenu/MobileMenuSlice";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const tab = useSelector((state) => state.navbar.tab);
  const showSearchState = useSelector((state) => state.navbar.showSearch);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const cartItems = useSelector((state) => state.cart.items);

  // Imposta il tab corretto in base al percorso corrente
  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(moveToOne());
    } else if (location.pathname === "/Prodotti") {
      dispatch(moveToTwo());
    }
  }, [location.pathname, dispatch]);

  // Funzione per navigare a Prodotti con filtro categoria
  const goToProdottiConFiltro = (cat, brand) => {
    dispatch(moveToTwo());
    navigate("/Prodotti", { state: { category: cat, brand: brand } });
  };

  // Funzione per gestire la ricerca
  const handleSearch = (e) => {
    e.preventDefault();
    if (!localSearchTerm.trim()) return;

    // Cerca tra i prodotti
    const searchTermLower = localSearchTerm.toLowerCase();
    const matchingProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTermLower) ||
      product.category.toLowerCase().includes(searchTermLower) ||
      product.brand.toLowerCase().includes(searchTermLower)
    );

    // Se abbiamo trovato dei prodotti, determiniamo il filtro più appropriato
    if (matchingProducts.length > 0) {
      // Controlla se la ricerca corrisponde a una categoria
      const categories = ["racchetta", "maglietta", "scarpa", "borsone"];
      const matchingCategory = categories.find(cat => 
        searchTermLower.includes(cat.toLowerCase())
      );

      // Controlla se la ricerca corrisponde a un brand
      const brands = ["Head", "Babolat", "Wilson", "Adidas"];
      const matchingBrand = brands.find(brand => 
        searchTermLower.includes(brand.toLowerCase())
      );

      // Naviga alla pagina prodotti con i filtri appropriati
      dispatch(moveToTwo());
      dispatch(setSearchTerm(localSearchTerm));
      navigate("/Prodotti", { 
        state: { 
          category: matchingCategory || null,
          brand: matchingBrand || null,
          searchTerm: localSearchTerm
        } 
      });
    } else {
      // Se non troviamo prodotti, navighiamo comunque ma senza filtri
      dispatch(moveToTwo());
      dispatch(setSearchTerm(localSearchTerm));
      navigate("/Prodotti", { 
        state: { 
          searchTerm: localSearchTerm
        } 
      });
    }
  };

  return (
    <>
      <div className="navbar bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 backdrop-blur-md border-b border-zinc-800/50 shadow-lg">
        {/* Mobile Menu Button - only visible on mobile */}
        <button
          className="md:hidden btn btn-ghost btn-circle hover:bg-zinc-800/50 transition-colors duration-200"
          onClick={() => dispatch(toggleMobileMenu())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent hover:from-yellow-300 hover:to-yellow-600 transition-all duration-300">
            TenniShop
          </Link>
        </div>
        {tab === 1 && (
          <div className="hidden md:flex justify-center w-full my-2">
            <form onSubmit={handleSearch} className="w-full max-w-[900px] flex">
              <input
                type="text"
                placeholder="Cerca prodotti, categorie o marchi..."
                className="input bg-zinc-800/50 border-zinc-700 w-full focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200 placeholder:text-zinc-400"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn bg-yellow-500 hover:bg-yellow-600 text-black border-none ml-2 transition-all duration-200">
                Cerca
              </button>
            </form>
          </div>
        )}
        <div className="flex-none">
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-circle hover:bg-zinc-800/50 transition-colors duration-200"
              onClick={() => dispatch(openCart())}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItems.length > 0 && (
                  <span className="badge badge-sm indicator-item bg-yellow-500 text-black border-none">{cartItems.length}</span>
                )}
              </div>
            </button>

            <div className="dropdown dropdown-end">
              <Link to="/profile" className="md:hidden">
                <div
                  className="btn btn-ghost btn-circle avatar ring-2 ring-zinc-700 hover:ring-yellow-500/50 transition-all duration-200"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
              </Link>
              <div
                tabIndex={0}
                role="button"
                className="hidden md:flex btn btn-ghost btn-circle avatar ring-2 ring-zinc-700 hover:ring-yellow-500/50 transition-all duration-200"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="hidden md:menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-zinc-800/95 backdrop-blur-md rounded-box w-52 border border-zinc-700"
              >
                <li>
                  <Link to="/profile" className="hover:bg-zinc-700/50">
                    Profile
                    <span className="badge bg-yellow-500 text-black border-none">New</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        role="tablist"
        className="tabs tabs-box flex justify-center tabs-sm xs:tabs-md md:tabs-lg xl:tabs-lg mx-auto font-bold rounded-none bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-b border-zinc-800/50 shadow-md"
      >
        <Link to={"/"}>
          <a
            role="tab"
            onClick={() => dispatch(moveToOne())}
            className={`tab ${tab === 1 ? 'text-white scale-105 border-b-2 border-yellow-500' : 'text-white hover:text-white'} transition-all duration-200`}
          >
            Home
          </a>
        </Link>
        <Link to={"/Prodotti"}>
          <a
            role="tab"
            onClick={() => dispatch(moveToTwo())}
            className={`tab ${tab === 2 ? 'text-white scale-105 border-b-2 border-yellow-500' : 'text-white hover:text-white'} transition-all duration-200`}
          >
            Prodotti
          </a>
        </Link>
        <Link to={"/profile"}>
          <a
            role="tab"
            onClick={() => dispatch(moveToThree())}
            className={`tab ${tab === 3 ? 'text-white scale-105 border-b-2 border-yellow-500' : 'text-white hover:text-white'} transition-all duration-200`}
          >
            Info
          </a>
        </Link>
      </div>
    </>
  );
}

export default Navbar;
