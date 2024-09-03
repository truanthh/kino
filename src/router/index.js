import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import UserProfile from "../views/UserProfile.vue";
import Film from "../views/Film.vue";
import Films from "../views/Films.vue";
import Name from "../views/Name.vue";
import VideoPlayer from "../components/VideoPlayer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/videoplayer",
      name: "videoplayer",
      component: VideoPlayer,
    },
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

// router.beforeEach((to, from, next) => {
//   console.log(`Navigating from ${from.name} to ${to.name}`);
//   next();
// });

export default router;
