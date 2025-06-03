import { createVisibilityReducer } from '../../store/visibilitySlice';

const { actions, reducer } = createVisibilityReducer('Home', true);

export const { show: visible, hide: hidden, toggle: toggleHome } = actions;
export const HomeReducer = reducer;