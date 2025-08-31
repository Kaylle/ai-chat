<template>
  <Combobox by="label">
    <ComboboxAnchor class="w-full">
      <div class="relative w-full max-w-sm items-center border-input rounded-md border-1">
        <ComboboxInput placeholder="Search for chat..." />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <PhMagnifyingGlass class="size-4 text-muted-foreground" />
        </span>
      </div>
    </ComboboxAnchor>
    <ComboboxList>
      <ComboboxEmpty>
        No chat found.
      </ComboboxEmpty>
      <ComboboxGroup>
        <ComboboxItem
          @select="useChats().currentChatId = chat.id"
          v-for="chat in useChats().chats"
          :key="chat.id"
          :value="chat"
        >
          {{ chat.title }}
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>

<script setup lang="ts">
import { PhMagnifyingGlass } from "@phosphor-icons/vue";
import { ComboboxList, Combobox, ComboboxInput, ComboboxGroup, ComboboxItem, ComboboxAnchor, ComboboxEmpty } from "@/components/ui/combobox";
import {useChats} from "@/stores/chat.ts";
</script>