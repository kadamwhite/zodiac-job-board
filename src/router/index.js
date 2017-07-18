import Router from 'vue-router';
import Vue from 'vue';
import Hello from '@/components/Hello';
import LicenseCategoriesHorizontal from '@/components/LicenseCategoriesHorizontal';
import SingleBoard from '@/components/SingleBoard';
import Jobs from '@/components/Jobs';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Zodiac Job System License Boards',
      component: Jobs,
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/boards',
      name: 'Job License Boards',
      component: Jobs,
    },
    {
      path: '/board/:id',
      name: 'Job License Board',
      component: SingleBoard,
    },
    {
      path: '/categories',
      name: 'Job License Categories',
      component: LicenseCategoriesHorizontal,
    },
  ],
});
