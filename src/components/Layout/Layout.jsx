import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Cart from '../Cart/Cart';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';

const Layout = () => {
    const cartVisible = useSelector((state) => state.cart.visible);

    return (
        <div className="min-h-screen bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
            {/* Mobile Menu */}
            <MobileMenu />
            
            {/* Main content with cart drawer */}
            <div className="drawer drawer-end">
                <input id="my-drawer-cart" type="checkbox" className="drawer-toggle" checked={cartVisible} readOnly />
                <div className="drawer-content bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
                    <Navbar />
                    <main>
                        <Outlet />
                    </main>
                </div>
                <Cart />
            </div>
            <Footer />
        </div>
    );
};

export default Layout; 