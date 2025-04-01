import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import UserProfile from "../views/UserProfile.vue";
import Film from "../views/Film.vue";
import Films from "../views/Films.vue";
import Name from "../views/Name.vue";

// idk if i need this here(store)
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      alias: ["/"],
      name: "home",
      component: Home,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/films",
      name: "films",
      component: Films,
    },
    {
      path: "/film/:id",
      name: "film",
      component: Film,
    },
    {
      path: "/name/:id",
      name: "name",
      component: Name,
    },
    {
      path: "/settings/userprofile",
      name: "userprofile",
      component: UserProfile,
    },
  ],
  // scrollBehavior() {
  //   return new Promise((resolve) => {
  //     resolve({ left: 0, top: 0 });
  //   });
  // },
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  if (to.name === "films" && !authStore.isAuth) {
    return { name: "signin" };
  }

  // return true;
});

export default router;
