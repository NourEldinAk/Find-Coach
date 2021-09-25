export default {
  setUser(state, payload) {
    state.userId = payload.localId;
    state.idToken = payload.idToken;
    state.autoLogout = false;
  },
  setAutoLogout(state) {
    state.autoLogout = true;
  },
};
