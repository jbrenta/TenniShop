import { createSlice } from "@reduxjs/toolkit";

const createVisibilitySlice = (name, initialVisibility = false) => {
  return createSlice({
    name,
    initialState: {
      visible: initialVisibility
    },
    reducers: {
      show: (state) => {
        state.visible = true;
      },
      hide: (state) => {
        state.visible = false;
      },
      toggle: (state) => {
        state.visible = !state.visible;
      }
    }
  });
};

export const createVisibilityReducer = (name, initialVisibility = false) => {
  const slice = createVisibilitySlice(name, initialVisibility);
  return {
    actions: slice.actions,
    reducer: slice.reducer
  };
}; 