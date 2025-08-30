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
          @select="$emit('chat', chat)"
          v-for="chat in chats"
          :key="chat.value"
          :value="chat"
        >
          {{ chat.label }}
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>

<script setup lang="ts">
import { PhMagnifyingGlass } from "@phosphor-icons/vue";
import { ComboboxList, Combobox, ComboboxInput, ComboboxGroup, ComboboxItem, ComboboxAnchor, ComboboxEmpty } from "@/components/ui/combobox";

const chats = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' }
]
</script>