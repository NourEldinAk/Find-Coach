import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
export default {
  state() {
    return {
      userId: null,
      idToken: null,
      autoLogout: false,
    };
  },
  getters,
  mutations,
  actions,
};
