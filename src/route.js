import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      name: 'coaches',
      path: '/coaches',
      component: null
    },
    {
      name: 'coache-member',
      path: '/coaches/:id',
      component: null,
      children: [
        // route -> /coaches/c1/contact
        {
          name: 'coach-contact',
          path: '/contact'
        }
      ]
    },
    {
      name: 'register',
      path: '/register',
      component: null
    },
    {
      name: 'contact',
      path: '/contact',
      component: null
    },
    {
      path: '/:notFound(.*)',
      component: null
    }
  ]
});

export default router;
