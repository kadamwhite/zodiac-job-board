import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const state = {
  selectedLicense: null,
  selectedCategory: '',
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations',
  ], () => {
    /* eslint-disable global-require */
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations'),
    });
    /* eslint-enable global-require */
  });
}

export default store;
