import { createRouter, createWebHistory } from "vue-router";
import CoachesList from "./components/Coaches/CoachesList";
import CoachesDetails from "./components/Coaches/CoachDetails.vue";
import ContactCoaches from "./components/Coaches/ContactCoach.vue";
import RegisterCoach from "./components/Coaches/RegisterCoach.vue";
import RequestsList from "./components/Requests/RequestsList.vue";
import PageNotFound from "./components/PageNotFound.vue";
import AuthUser from "./components/Auth/AuthUser.vue";
import store from "./Store/store";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    {
      path: "/coaches",
      component: CoachesList,
    },
    {
      path: "/coaches/:id",
      component: CoachesDetails,
      props: true,
      children: [
        {
          path: "contact",
          component: ContactCoaches,
        },
      ],
    },
    {
      path: "/requests",
      component: RequestsList,
      params: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/register",
      component: RegisterCoach,
      meta: { requiresAuth: true },
    },
    {
      path: "/auth",
      component: AuthUser,
      meta: { requiresUnAuth: true },
    },
    {
      path: "/:notFound(.*)",
      component: PageNotFound,
    },
  ],
  // scrollBehavior(to, _, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   if (to.path.includes("contact")) {
  //     return { top: 378 };
  //   }
  // },
});
router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});
export default router;
