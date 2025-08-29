<template>
  <SidebarProvider>
    <BaseSidebar />
    <SidebarInset>
      <BaseHeader />
      <div class="min-w-0 w-full flex-1 overflow-x-auto p-4 lg:p-6">
        <RouterView />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import BaseSidebar from "./BaseSidebar.vue";
import BaseHeader from "./BaseHeader.vue";
</script>
