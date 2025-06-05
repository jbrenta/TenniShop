import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage
import { combineReducers } from 'redux';
import { NavbarReducer } from '../components/Navbar/NavbarSlice';
import { HomeReducer } from '../pages/Home/HomeSlice';
import { ProdottiReducer } from '../pages/Prodotti/ProdottiSlice';
import { ProductDetailsReducer } from '../components/ProductsDetails/ProductDetailsSlice';
import { SingleProductReducer } from '../components/SingleProduct/SingleProductSlice';
import cartReducer from '../components/Cart/CartSlice';
import mobileMenuReducer from '../components/MobileMenu/MobileMenuSlice';

// Configurazione di redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] // Elementi dello stato da persistere
};

// Combina i reducer
const rootReducer = combineReducers({
  navbar: NavbarReducer,
  home: HomeReducer,
  productDetails: ProductDetailsReducer,
  prodotti: ProdottiReducer,
  singleProduct: SingleProductReducer,
  cart: cartReducer,
  mobileMenu: mobileMenuReducer,
});

// Applica redux-persist al rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configura lo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Configura il persistor
export const persistor = persistStore(store);