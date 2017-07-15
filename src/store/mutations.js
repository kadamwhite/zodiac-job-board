/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
export const increment = (state) => {
  state.count += 1;
  state.history.push('increment');
};

export const decrement = (state) => {
  state.count -= 1;
  state.history.push('decrement');
};

export const select = (state, { id, category }) => {
  state.selectedLicense = id;
  state.selectedCategory = category;
};
