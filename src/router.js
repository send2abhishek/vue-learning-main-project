import { createRouter, createWebHistory } from 'vue-router';

import CoacheList from './pages/coaches/CoacheList.vue';
import CoacheDetails from './pages/coaches/CoacheDetails.vue';
import CoachRegistration from './pages/coaches/CoacheRegistration.vue';
import CoacheContact from './pages/requests/CoacheContact.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/';

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
      component: CoacheList
    },
    {
      name: 'coache-member',
      path: '/coaches/:id',
      component: CoacheDetails,
      props: true,
      children: [
        // route -> /coaches/c1/contact
        {
          name: 'coach-contact',
          path: 'contact',
          component: CoacheContact
        }
      ]
    },
    {
      name: 'register',
      path: '/register',
      meta: {
        requiresAuth: true
      },
      component: CoachRegistration
    },
    {
      name: 'request',
      path: '/request',
      meta: {
        requiresAuth: true
      },
      component: RequestReceived
    },
    {
      name: 'auth',
      path: '/auth',
      component: UserAuth,
      meta: {
        requiresUnAuth: true
      }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    // auto login
    next('/coaches');
  } else {
    next();
  }
});

export default router;
