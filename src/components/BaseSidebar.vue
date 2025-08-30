<template>
  <Sidebar>
    <SidebarHeader>
      <Search />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarGroupLabel>
              <PhHeart class="mr-2"/>
              Saved
            </SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem
                v-for="(nav, indexGroup) in navMenu"
                :key="indexGroup"
              >
                <SidebarMenuButton>
                  {{ nav.title }}
                  <PhPushPinSlash
                    @click="unpinChat"
                    class="ml-auto"
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarSeparator/>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarGroupLabel>
              <PhChatDots class="mr-2"/>
              Chats
            </SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible
                v-for="group in new Set(navMenu.map(x => x.group))"
                :key="group"
                defaultOpen
                class="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {{ group }}
                      <PhCaretUp/>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem
                        v-for="(nav, indexGroup) in navMenu.filter(x => x.group === group)"
                        :key="indexGroup"
                      >
                        <SidebarMenuButton>
                          {{ nav.title }}
                        </SidebarMenuButton>
                        <SidebarMenuAction @click="deleteChat(nav.url)">
                          <PhDotsThree/>
                        </SidebarMenuAction>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <Button class="w-full">
            <PhPlus />
            New chat
            <PhSparkle />
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import { SidebarGroupLabel, Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarRail, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { navMenu } from "@/lib/constants.ts";
import Search from "@/components/Search.vue";
import { Button } from "@/components/ui/button";
import {PhCaretUp, PhChatDots, PhDotsThree, PhHeart, PhPlus, PhPushPinSlash, PhSparkle} from "@phosphor-icons/vue";
import {
  SidebarFooter,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator
} from "@/components/ui/sidebar";
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from "@/components/ui/collapsible";

const deleteChat = (id: string) => {
  console.log(id);
};

const unpinChat = () => {
  console.log('id');
}
</script>