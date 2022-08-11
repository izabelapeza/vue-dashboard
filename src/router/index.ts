import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutView from "../views/AboutView.vue";
import StateView from "../views/StateView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "temp",
    component: AboutView,
  },
  {
    path: "/state/:id",
    name: "state",
    component: StateView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "active",
  routes,
});

export default router;
