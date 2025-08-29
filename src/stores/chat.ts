import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  function getChats() {
    const res = localStorage.getItem("user");
    if (res) user.value = JSON.parse(res);
    return user;
  }

  return { user, getChats };
})