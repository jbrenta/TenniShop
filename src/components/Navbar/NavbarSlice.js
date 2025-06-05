import { createSlice } from "@reduxjs/toolkit";

const NavbarSlice = createSlice({
    name: "Navbar",
    initialState: {
        tab: 1, // Default to Home tab
        showSearch: false,
        searchTerm: "",
    },
    reducers: {
        moveToOne: (state) => {
            state.tab = 1;
        },
        moveToTwo: (state) => {
            state.tab = 2;
        },
        moveToThree: (state) => {
            state.tab = 3;
        },
        showSearch: (state) => {
            state.showSearch = true;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        clearSearch: (state) => {
            state.searchTerm = "";
        }
    },
});

export const { moveToOne, moveToTwo, moveToThree, showSearch, setSearchTerm, clearSearch } = NavbarSlice.actions;
export const NavbarReducer = NavbarSlice.reducer;