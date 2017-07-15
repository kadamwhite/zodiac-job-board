/* eslint-disable import/prefer-default-export */
export const select = ({ commit }, license) => license && commit('select', {
  id: license.id,
  category: license.category,
});
