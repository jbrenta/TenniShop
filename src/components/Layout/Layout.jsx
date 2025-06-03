import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Cart from '../Cart/Cart';
import SideBar from '../Slidebar/SideBar';
import { useSelector } from 'react-redux';

const Layout = () => {
    const cartVisible = useSelector((state) => state.cart.visible);
    const sidebarVisible = useSelector((state) => state.sidebar.visibility);

    return (
        <>
            <SideBar />
            <div className="drawer drawer-end">
                <input id="my-drawer-cart" type="checkbox" className="drawer-toggle" checked={cartVisible} readOnly />
                <div className={`drawer-content ${sidebarVisible ? 'hidden' : ''}`}>
                    <Navbar />
                    <main>
                        <Outlet />
                    </main>
                </div>
                <Cart />
            </div>
        </>
    );
};

export default Layout; 