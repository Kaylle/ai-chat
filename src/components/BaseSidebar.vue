<template>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <!--        todo delete chat-->
        <SidebarMenuItem>
          <Button class="w-full">
            <PhPlus />
            New chat
            <PhSparkle />
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Search class="pb-5"/>
            </SidebarMenuItem>
            <SidebarGroupLabel>
              <PhHeart class="mr-2"/>
              Saved
            </SidebarGroupLabel>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      Dresses
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      Resumes
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarGroupLabel>
              <PhChatDots class="mr-2"/>
              Chats
            </SidebarGroupLabel>
            <SidebarGroup>
              <SidebarGroupContent>
                <div
                  v-for="group in new Set(navMenu.map(x => x.group))"
                  :key="group"
                >
                  <SidebarGroupLabel>
                    {{ group }}
                  </SidebarGroupLabel>
                  <SidebarMenuItem
                    v-for="(nav, indexGroup) in navMenu.filter(x => x.group === group)"
                    :key="indexGroup"
                    class="rounded-md"
                    :class="nav.url === $route.path ? 'bg-accent' : ''"
                  >
                    <SidebarMenuButton as-child>
                      <router-link :to="nav.url">
                        <span>{{ nav.title }}</span>
                      </router-link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>

<script setup lang="ts">
import { SidebarGroupLabel, Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarRail, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { navMenu } from "@/lib/constants.ts";
import Search from "@/components/Search.vue";
import { Button } from "@/components/ui/button";
import {PhChatDots, PhHeart, PhPlus, PhSparkle} from "@phosphor-icons/vue";
</script>