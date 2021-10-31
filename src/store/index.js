import { createStore } from 'vuex';
import coachModule from './modules/coaches/';
import requestModule from './modules/requests/';
import authModule from './modules/auth/';

const store = createStore({
  modules: {
    coaches: coachModule,
    requests: requestModule,
    auth: authModule
  }
});

export default store;
