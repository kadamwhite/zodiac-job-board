import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Jobs from '@/components/Jobs';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Job License Boards',
      component: Jobs,
    },
  ],
});
