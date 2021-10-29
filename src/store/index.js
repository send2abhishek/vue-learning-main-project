import { createStore } from 'vuex';
import coachModule from './modules/coaches/';
import requestModule from './modules/requests/';

const store = createStore({
  modules: {
    coaches: coachModule,
    requests: requestModule
  },
  state() {
    return {
      userId: 'c3'
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});

export default store;
