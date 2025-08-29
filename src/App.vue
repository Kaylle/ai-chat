<template>
  <RouterView />
  <Toaster />
</template>

<script setup lang="ts">
import "vue-sonner/style.css";
import { themes } from "./lib/constants.ts";
import { Toaster } from "./components/ui/sonner";
import { onMounted } from "vue";
import { useCustomize } from "./lib/useCustomize.ts";
import { useColorMode } from "@vueuse/core";

const { theme, radius } = useCustomize();
const colorMode = useColorMode();

onMounted(() => {
  document.body.style.setProperty('--radius', `${radius.value}rem`);
  document.body.classList.remove(...themes.map(color => `theme-${color.name}`));
  document.body.classList.add(`theme-${theme.value}`);
  console.log(colorMode);
})
</script>