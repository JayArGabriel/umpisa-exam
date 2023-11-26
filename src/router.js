import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Parking from "@/pages/Parking";
import Movie from "@/pages/Movie";
import PageNotFound from "@/pages/404";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Login,
    meta: { title: "Login", guest: true },
  },
  {
    path: "/register",
    component: Register,
    meta: { title: "Register",  guest: true },
  },
  {
    path: "/car-parking",
    component: Parking,
    meta: { title: "Car Parking", requiresAuth: true },
  },
  {
    path: "/movie-searching",
    component: Movie,
    meta: { title: "Movie Searching", requiresAuth: true },
  },
  { path: "*", component: PageNotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const title = to.meta.title;
  // If the route has a title, set it as the page title of the document/page
  if (title) {
    document.title = title;
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/car-parking");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
