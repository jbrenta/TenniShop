import { createVisibilityReducer } from '../../store/visibilitySlice';

const { actions, reducer } = createVisibilityReducer('ProductDetails', true);

export const { show: visibleDetails, hide: hiddenDetails, toggle: toggleDetails } = actions;
export const ProductDetailsReducer = reducer;