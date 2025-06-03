import { createSlice } from "@reduxjs/toolkit";

const SideBarSlice = createSlice({
    name: "Sidebar",
    initialState: {
        visibility: false
    },
    reducers: {
        showSideBar: (state) => {
            state.visibility = true;
        },
        hideSideBar: (state) => {
            state.visibility = false;
        }
    },
    });

export const { showSideBar, hideSideBar } = SideBarSlice.actions;
export const SideBarReducer = SideBarSlice.reducer;