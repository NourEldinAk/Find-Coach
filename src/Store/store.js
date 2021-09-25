import { createStore } from "vuex";
import coachesModule from "./Coaches/index";
import requestsModule from "./Requests/index";
import AuthModule from "./Auth/index";

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: AuthModule,
  },
  state() {},
});
export default store;
