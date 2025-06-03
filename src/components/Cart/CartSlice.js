import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    isOpen: false,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            
            if (existingItem) {
                existingItem.quantity = Math.min(9, existingItem.quantity + newItem.quantity);
            } else {
                state.items.push(newItem);
            }
            state.isOpen = true;
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = Math.max(1, Math.min(9, quantity));
            }
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        closeCart: (state) => {
            state.isOpen = false;
        },
        openCart: (state) => {
            state.isOpen = true;
        },
    }
});

export const { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    toggleCart, 
    closeCart, 
    openCart 
} = cartSlice.actions;

export default cartSlice.reducer; 