import { createRouter, createWebHistory } from 'vue-router';

import CoacheList from './pages/coaches/CoacheList.vue';
import CoacheDetails from './pages/coaches/CoacheDetails.vue';
import CoachRegistration from './pages/coaches/CoacheRegistration.vue';
import CoacheContact from './pages/requests/CoacheContact.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';

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
      component: CoachRegistration
    },
    {
      name: 'request',
      path: '/request',
      component: RequestReceived
    },
    {
      name: 'auth',
      path: '/auth',
      component: UserAuth
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
});

export default router;
