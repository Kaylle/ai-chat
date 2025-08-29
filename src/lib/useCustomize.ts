import { themes } from "../lib/constants";
import { computed, ref } from "vue";
import type { Config } from "./models.ts";

export function useCustomize() {
  const config = ref({
    theme: 'rose',
    radius: 0.5,
  } as Config);

  const cache = localStorage.getItem("config");
  const themeClass = computed(() => `theme-${config.value.theme}`);
  const theme = computed(() => config.value.theme);
  const radius = computed(() => config.value.radius);

  if (cache) config.value = JSON.parse(cache);

  function setTheme(themeName: string) {
    config.value.theme = themeName;
    localStorage.setItem("config", JSON.stringify(config.value));
  }

  function setRadius(newRadius: number) {
    config.value.radius = newRadius;
    localStorage.setItem("config", JSON.stringify(config.value));
  }

  const themePrimary = computed(() => {
    const t = themes.find(t => t.name === theme.value);
    if (t) return `hsl(${t.color})`;
    else return `hsl(0,0,0)`;
  })

  return {
    themeClass,
    theme,
    setTheme,
    radius,
    setRadius,
    themePrimary
  };
}
