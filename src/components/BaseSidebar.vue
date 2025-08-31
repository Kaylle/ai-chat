<template>
  <Sidebar>
    <SidebarHeader>
      <Search />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup v-if="useChats().chats.filter(x=>x.isPinned).length > 0">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarGroupLabel>
              <PhHeart class="mr-2"/>
              Saved
            </SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem
                v-for="chat in useChats().chats.filter(x=>x.isPinned)"
                :key="chat.id"
              >
                <SidebarMenuButton>
                  {{ chat.title }}
                  <PhPushPinSlash
                    @click="useChats().pinChat(chat.id)"
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
                v-for="(group, i) in useChats().getFolders()"
                :key="i"
                defaultOpen
                class="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <div>
                        {{ group!=='default' ? formatDate(new Date(Number(group)), "YYYY/MM/DD") : 'Default' }}
                      </div>
                      <PhCaretUp class="ml-auto" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem
                        class="rounded-lg"
                        @click="useChats().currentChatId = chat.id"
                        v-for="chat in useChats().chats.filter(x=>test(x.id)===group)"
                        :key="chat.id"
                        :class="useChats().currentChatId === chat.id?'bg-accent':''"
                      >
                        <ContextMenu>
                          <ContextMenuTrigger>
                            <SidebarMenuButton>
                              {{ chat.title }}
                            </SidebarMenuButton>
                          </ContextMenuTrigger>
                          <ContextMenuContent class="w-39">
                            <ContextMenuItem inset @click="useChats().deleteChat(chat.id)">
                              Delete
                              <PhTrash class="ml-auto"/>
                            </ContextMenuItem>
                            <ContextMenuItem inset @click="useChats().pinChat(chat.id)">
                              Pin chat
                              <PhPushPin class="ml-auto"/>
                            </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
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
          <Button
            class="w-full"
            @click="useChats().addChat('New Chat')"
          >
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
import { SidebarGroupLabel, Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarRail, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarMenuSub, SidebarMenuSubItem, SidebarSeparator } from "./ui/sidebar";
import Search from "@/components/Search.vue";
import { Button } from "@/components/ui/button";
import {
  PhCaretUp,
  PhChatDots,
  PhHeart,
  PhPlus, PhPushPin,
  PhPushPinSlash,
  PhSparkle,
  PhTrash
} from "@phosphor-icons/vue";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useChats } from "@/stores/chat.ts";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import { formatDate } from "@vueuse/core";

const test = (date: string) => {
  if (date === 'default') return "default";
  const d = new Date(Number(date));
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d.getTime().toString();
};
</script>