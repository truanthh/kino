import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Movies from "../views/Movies.vue";
import UserProfile from "../views/UserProfile.vue";
import Film from "../views/Film.vue";

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
      path: "/movies",
      name: "movies",
      component: Movies,
    },
    {
      path: "/film/:id",
      name: "film",
      component: Film,
      props: true,
    },
    {
      path: "/settings/userprofile",
      name: "userprofile",
      component: UserProfile,
    },
  ],
});

export default router;
