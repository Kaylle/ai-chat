<template>
  <header class="sticky top-0 z-10 flex items-center gap-4 border-b bg-background px-4 md:px-6">
    <div class="w-full flex items-center gap-4">
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        class="separator-height"
      />
      <div @click="$router.push('/')">
        AI Chat
      </div>
    </div>
    <Button
      variant="outline"
      @click="$router.push('/settings')"
    >
      <PhGearSix />
      Settings
    </Button>
  </header>
</template>

<script setup lang="ts">
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";
import {PhGearSix} from "@phosphor-icons/vue";
</script>

<style scoped>
header {
  height: 56px;
}

.separator-height {
  height: 36px;
}
</style>