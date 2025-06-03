import { createSlice } from "@reduxjs/toolkit";
import { createVisibilityReducer } from '../../store/visibilitySlice';

const { actions: visibilityActions, reducer: visibilityReducer } = createVisibilityReducer('SingleProduct', false);

const SingleProductSlice = createSlice({
    name: "SingleProduct",
    initialState: {
        ...visibilityReducer(undefined, { type: 'INIT' }),
        selectedProduct: null,
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(visibilityActions.show, (state) => {
                state.visible = true;
            })
            .addCase(visibilityActions.hide, (state) => {
                state.visible = false;
            })
            .addCase(visibilityActions.toggle, (state) => {
                state.visible = !state.visible;
            });
    },
});

export const { setSelectedProduct } = SingleProductSlice.actions;
export const { show: visibleSingleProduct, hide: hiddenSingleProduct, toggle: toggleSingleProduct } = visibilityActions;
export const SingleProductReducer = SingleProductSlice.reducer; 