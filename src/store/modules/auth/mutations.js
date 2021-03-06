export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
  },
  userLogout(state) {
    state.token = null;
    state.userId = null;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  }
};
