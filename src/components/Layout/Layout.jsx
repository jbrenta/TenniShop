import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Cart from '../Cart/Cart';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useSelector } from 'react-redux';

const Layout = () => {
    const cartVisible = useSelector((state) => state.cart.visible);

    return (
        <div className="min-h-screen bg-zinc-900">
            {/* Mobile Menu */}
            <MobileMenu />
            
            {/* Main content with cart drawer */}
            <div className="drawer drawer-end">
                <input id="my-drawer-cart" type="checkbox" className="drawer-toggle" checked={cartVisible} readOnly />
                <div className="drawer-content">
                    <Navbar />
                    <main>
                        <Outlet />
                    </main>
                </div>
                <Cart />
            </div>
        </div>
    );
};

export default Layout; 