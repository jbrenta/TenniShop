import { createSlice } from '@reduxjs/toolkit';

const mobileMenuSlice = createSlice({
    name: 'mobileMenu',
    initialState: {
        isOpen: false
    },
    reducers: {
        openMobileMenu: (state) => {
            state.isOpen = true;
        },
        closeMobileMenu: (state) => {
            state.isOpen = false;
        },
        toggleMobileMenu: (state) => {
            state.isOpen = !state.isOpen;
        }
    }
});

export const { openMobileMenu, closeMobileMenu, toggleMobileMenu } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer; 