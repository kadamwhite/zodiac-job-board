import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import LicenseCategories from '@/components/LicenseCategories';
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
      path: '/categories',
      name: 'Job License Categories',
      component: LicenseCategories,
    },
  ],
});
