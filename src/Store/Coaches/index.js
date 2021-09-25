import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
export default {
  namespaced: true,
  state() {
    return {
      lastFetch: false,

      coaches: [
        // {
        //   id: "c1",
        //   firstName: "Nour Eldin",
        //   lastName: "Abukhatwa",
        //   description:
        //     "Well Known in the frontEnd Industry, willing to help students in any level , expert in js framework such as Vue and Angular",
        //   areas: ["frontend", "career"],
        //   hourlyRate: 32,
        // },
        // {
        //   id: "c2",
        //   firstName: "Mohamed",
        //   lastName: "Abukhatwa",
        //   description:
        //     "Professional instructor with 8 years experience, expert in Angular",
        //   areas: ["frontend", "backend", "career"],
        //   hourlyRate: 40,
        // },
        // {
        //   id: "c3",
        //   firstName: "Anas",
        //   lastName: "Taleb",
        //   description:
        //     "senior web developer with creative ideas and passion to teach students, expert in React",
        //   areas: ["frontend", "career"],
        //   hourlyRate: 32,
        // },
      ],
    };
  },
  mutations,
  getters,
  actions,
};
