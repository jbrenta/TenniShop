import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveToOne, moveToTwo, moveToThree, showSearch, setSearchTerm } from "./NavbarSlice";
import { showSideBar } from "../Slidebar/SideBarSlice";
import { showCart } from "../Cart/CartSlice";
import { hidden } from "../../pages/Home/HomeSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { products } from "../../data/products";

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
      <div className="navbar bg-zinc-900 flex mx-auto shadow-sm">
        <button
          className="mr-2 md:hidden"
          onClick={() => {
            dispatch(showSideBar());
            dispatch(hidden());
          }}
        >
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </button>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        {tab === 1 && (
          <div className="hidden md:flex justify-center w-full my-2">
            <form onSubmit={handleSearch} className="w-full max-w-[900px] flex">
              <input
                type="text"
                placeholder="Cerca prodotti, categorie o marchi..."
                className="input input-bordered glass w-full"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary ml-2">
                Cerca
              </button>
            </form>
          </div>
        )}
        <div className="flex-none">
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => dispatch(showCart())}
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
                  <span className="badge badge-sm indicator-item">{cartItems.length}</span>
                )}
              </div>
            </button>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        role="tablist"
        className="tabs tabs-box flex justify-center tabs-sm xs:tabs-md md:tabs-lg xl:tabs-lg mx-auto font-bold rounded-none glass"
      >
        <Link to={"/"}>
          <a
            role="tab"
            onClick={() => dispatch(moveToOne())}
            className={`tab ${tab === 1 ? "tab-active" : ""}`}
          >
            Home
          </a>
        </Link>
        <Link to={"/Prodotti"}>
          <a
            role="tab"
            onClick={() => dispatch(moveToTwo())}
            className={`tab ${tab === 2 ? "tab-active" : ""}`}
          >
            Prodotti
          </a>
        </Link>
        <a
          role="tab"
          onClick={() => dispatch(moveToThree())}
          className={`tab ${tab === 3 ? "tab-active" : ""}`}
        >
          Info
        </a>
      </div>
      {location.pathname === "/" && tab === 1 && (
        <div className="w-full mx-auto hidden md:flex bg-zinc-900 shadow-lg">
          <div className="dropdown dropdown-hover flex-1">
            <div 
              tabIndex={0}
              role="button"
              className="btn flex justify-center rounded-none w-full bg-zinc-900 hover:bg-zinc-800 border-none text-white font-medium tracking-wide px-8 py-4 transition-all duration-300 relative group"
            >
              <span className="relative z-10">Racchette</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-md z-10 w-full p-2 shadow-xl bg-zinc-900 border border-zinc-800"
            >
              <li className="hover:bg-zinc-800 rounded-md transition-colors duration-200">
                <a onClick={() => goToProdottiConFiltro("racchetta", "Head")} className="text-white hover:text-yellow-500 py-3">Head</a>
              </li>
              <li className="hover:bg-zinc-800 rounded-md transition-colors duration-200">
                <a onClick={() => goToProdottiConFiltro("racchetta", "Babolat")} className="text-white hover:text-yellow-500 py-3">
                  Babolat
                </a>
              </li>
              <li className="hover:bg-zinc-800 rounded-md transition-colors duration-200">
                <a onClick={() => goToProdottiConFiltro("racchetta", "Wilson")} className="text-white hover:text-yellow-500 py-3">Wilson</a>
              </li>
            </ul>
          </div>

          <div className="dropdown dropdown-hover flex-1">
            <div
              tabIndex={0}
              role="button"
              className="btn flex justify-center rounded-none w-full bg-zinc-900 hover:bg-zinc-800 border-none text-white font-medium tracking-wide px-8 py-4 transition-all duration-300 relative group"
            >
              <span className="relative z-10">Abbigliamento</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-md z-10 w-full p-2 shadow-xl bg-zinc-900 border border-zinc-800"
            >
              <li className="hover:bg-zinc-800 rounded-md transition-colors duration-200">
                <a onClick={() => goToProdottiConFiltro("maglietta")} className="text-white hover:text-yellow-500 py-3">
                  Magliette
                </a>
              </li>
              <li className="hover:bg-zinc-800 rounded-md transition-colors duration-200">
                <a onClick={() => goToProdottiConFiltro("pantalone")} className="text-white hover:text-yellow-500 py-3">
                  Pantaloncini
                </a>
              </li>
            </ul>
          </div>

          <div className="dropdown dropdown-hover flex-1">
            <div
              tabIndex={0}
              role="button"
              className="btn flex justify-center rounded-none w-full bg-zinc-900 hover:bg-zinc-800 border-none text-white font-medium tracking-wide px-8 py-4 transition-all duration-300 relative group"
            >
              <span className="relative z-10">Scarpe</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-md z-10 w-full p-2 shadow-xl bg-zinc-900 border border-zinc-800"
            >
              <li className="hover:bg-zinc-800 rounded-md transition-colors duration-200">
                <a onClick={() => goToProdottiConFiltro("scarpa","Asics")} className="text-white hover:text-yellow-500 py-3">Asics</a>
              </li>
              <li className="hover:bg-zinc-800 rounded-md transition-colors duration-200">
                <a onClick={() => goToProdottiConFiltro("scarpa","Nike")} className="text-white hover:text-yellow-500 py-3">Nike</a>
              </li>
              <li className="hover:bg-zinc-800 rounded-md transition-colors duration-200">
                <a onClick={() => goToProdottiConFiltro("scarpa","Adidas")} className="text-white hover:text-yellow-500 py-3">Adidas</a>
              </li>
            </ul>
          </div>

          <div className="dropdown dropdown-hover flex-1">
            <div
              tabIndex={0}
              role="button"
              className="btn flex justify-center rounded-none w-full bg-zinc-900 hover:bg-zinc-800 border-none text-white font-medium tracking-wide px-8 py-4 transition-all duration-300 relative group"
            >
              <span className="relative z-10">Borsoni</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-md z-10 w-full p-2 shadow-xl bg-zinc-900 border border-zinc-800"
            >
              <li className="hover:bg-zinc-800 rounded-md transition-colors duration-200">
                <a onClick={() => goToProdottiConFiltro("borsone", "Head")} className="text-white hover:text-yellow-500 py-3">Head</a>
              </li>
              <li className="hover:bg-zinc-800 rounded-md transition-colors duration-200">
                <a onClick={() => goToProdottiConFiltro("borsone", "Wilson")} className="text-white hover:text-yellow-500 py-3">Wilson</a>
              </li>
              <li className="hover:bg-zinc-800 rounded-md transition-colors duration-200">
                <a onClick={() => goToProdottiConFiltro("borsone", "Babolat")} className="text-white hover:text-yellow-500 py-3">Babolat</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
export default Navbar;
