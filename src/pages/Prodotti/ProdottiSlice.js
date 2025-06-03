import { createSlice } from "@reduxjs/toolkit";

const ProdottiSlice = createSlice({
    name: "Prodotti",
    initialState: {
        visible: true
    },
    reducers: {
       hidden: (state) => {
            state.visible = false;
        },
        visible: (state) => {
            state.visible = true;
        },
    },
});
export const { hidden, visible } = ProdottiSlice.actions;
export const ProdottiReducer = ProdottiSlice.reducer;