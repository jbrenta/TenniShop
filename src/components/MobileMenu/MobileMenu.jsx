import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { closeMobileMenu } from './MobileMenuSlice';
import { moveToTwo } from '../Navbar/NavbarSlice';

const MobileMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isOpen = useSelector((state) => state.mobileMenu.isOpen);

    const categories = [
        { id: 'racchette', title: 'Racchette', brands: ['Head', 'Babolat', 'Wilson'] },
        { id: 'abbigliamento', title: 'Abbigliamento', types: ['Magliette', 'Pantaloncini'] },
        { id: 'scarpe', title: 'Scarpe', brands: ['Asics', 'Nike', 'Adidas'] },
        { id: 'borsoni', title: 'Borsoni', brands: ['Head', 'Wilson', 'Babolat'] }
    ];

    const handleCategoryClick = (category, brand) => {
        dispatch(moveToTwo());
        dispatch(closeMobileMenu());
        navigate("/Prodotti", { 
            state: { 
                category: category,
                brand: brand
            } 
        });
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                onClick={() => dispatch(closeMobileMenu())}
            />
            
            {/* Mobile Menu */}
            <div className="fixed inset-y-0 left-0 w-[280px] bg-zinc-900 shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                    <Link 
                        to="/" 
                        className="text-xl font-bold text-transparent bg-clip-text bg-white"
                        onClick={() => dispatch(closeMobileMenu())}
                    >
                        TenniShop
                    </Link>
                    <button 
                        onClick={() => dispatch(closeMobileMenu())}
                        className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                    >
                        <svg 
                            className="w-6 h-6 text-zinc-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M6 18L18 6M6 6l12 12" 
                            />
                        </svg>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b border-zinc-800">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Cerca prodotti..."
                            className="w-full bg-zinc-800 border-none rounded-lg pl-10 pr-4 py-2 text-zinc-200 placeholder-zinc-400 focus:ring-2 focus:ring-yellow-500/20"
                        />
                        <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Categories */}
                <div className="p-4 space-y-4">
                    <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
                        Categorie
                    </div>
                    {categories.map((category) => (
                        <div key={category.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => handleCategoryClick(category.id)}
                                    className="text-zinc-200 hover:text-yellow-500 transition-colors"
                                >
                                    {category.title}
                                </button>
                            </div>
                            <div className="pl-4 space-y-2">
                                {category.brands && category.brands.map((brand) => (
                                    <button
                                        key={brand}
                                        onClick={() => handleCategoryClick(category.id, brand)}
                                        className="block text-sm text-zinc-400 hover:text-yellow-500 transition-colors"
                                    >
                                        {brand}
                                    </button>
                                ))}
                                {category.types && category.types.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => handleCategoryClick(type.toLowerCase())}
                                        className="block text-sm text-zinc-400 hover:text-yellow-500 transition-colors"
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Links */}
                <div className="p-4 border-t border-zinc-800">
                    <div className="space-y-2">
                        <Link
                            to="/Prodotti"
                            onClick={() => dispatch(closeMobileMenu())}
                            className="flex items-center gap-2 text-zinc-200 hover:text-yellow-500 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            Tutti i prodotti
                        </Link>
                        <Link
                            to="/Prodotti"
                            state={{ promoOnly: true }}
                            onClick={() => dispatch(closeMobileMenu())}
                            className="flex items-center gap-2 text-zinc-200 hover:text-yellow-500 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                            Offerte
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu; 