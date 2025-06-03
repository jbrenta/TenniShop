import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetails from '../../components/ProductsDetails/ProductDetails.jsx';
import SingleProduct from '../../components/SingleProduct/SingleProduct.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { visibleDetails } from '../../components/ProductsDetails/ProductDetailsSlice';
import { hiddenSingleProduct } from '../../components/SingleProduct/SingleProductSlice';
import { setSearchTerm } from '../../components/Navbar/NavbarSlice';

function Prodotti() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        // Solo se NON arrivi da Buy Now, resetta lo stato
        if (!location.state?.showSingle) {
            dispatch(visibleDetails());
            dispatch(hiddenSingleProduct());
        }

        // Gestisci il termine di ricerca se presente
        if (location.state?.searchTerm) {
            dispatch(setSearchTerm(location.state.searchTerm));
        }
    }, [dispatch, location.state]);

    const showDetails = useSelector((state) => state.productDetails.visible);
    const showSingleProduct = useSelector((state) => state.singleProduct.visible);
    const searchTerm = useSelector((state) => state.navbar.searchTerm);

    return (
        <>
            {showSingleProduct ? (
                <SingleProduct />
            ) : showDetails ? (
                <ProductDetails 
                    searchTerm={searchTerm}
                    category={location.state?.category}
                    brand={location.state?.brand}
                />
            ) : null}
        </>
    );
}

export default Prodotti;
