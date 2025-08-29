import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import MainLayout from "../components/MainLayout.vue";
import SettingsPage from "../pages/SettingsPage.vue";

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/', component: MainPage },
      { path: '/settings', component: SettingsPage }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;