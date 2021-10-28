import { createStore } from 'vuex';
import coachModule from './modules/coaches/';
import requestModule from './modules/requests/';

const store = createStore({
  modules: {
    coaches: coachModule,
    requests: requestModule
  }
});

export default store;
