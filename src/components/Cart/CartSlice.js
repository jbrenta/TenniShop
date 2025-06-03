import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: "Cart",
    initialState: {
        items: [],
        visible: false,
        total: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = Math.max(0, quantity);
                if (item.quantity === 0) {
                    state.items = state.items.filter(item => item.id !== id);
                }
            }
            state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        showCart: (state) => {
            state.visible = true;
        },
        hideCart: (state) => {
            state.visible = false;
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, showCart, hideCart, clearCart } = CartSlice.actions;
export const CartReducer = CartSlice.reducer; 