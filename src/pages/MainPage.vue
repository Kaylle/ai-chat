<template>
  <div class="w-full flex flex-col">
    <main class="flex flex-1 flex-col">
      <ScrollArea class="w-full px-4" style="height: calc(100vh - 240px)">
        <div
          v-if="chatMessages.length === 0"
          class="flex flex-col gap-2 text-center justify-center"
          style="height: calc(100vh - 240px)"
        >
          <h2 class="text-2xl font-bold tracking-tight">
            Hi, there <PhHandWaving class="inline-block"/>
          </h2>
          <p class="text-muted-foreground">
            Tell us what you need, and we'll handle the rest.
          </p>
        </div>
        <div class="flex flex-col gap-4 pb-4">
          <Card
            v-for="message in chatMessages"
            :key="message.content"
            class="w-auto max-w-[60vw]"
            :class="message.role==='user'?'mr-auto':'bg-accent ml-auto'"
          >
            <CardContent v-html="marked.parse(message.content)"/>
            <CardFooter>
              <Button
                :class="message.role!=='user'?'dark:border-muted-foreground border-muted-foreground':''"
                class="mr-4"
                variant="outline"
                @click="copyToClipboard(message.content)"
              >
                <PhCopy/>
              </Button>
              <div class="ml-auto text-muted-foreground text-sm">
                {{ formatDate(new Date(message.created), "YYYY/MM/DD HH:mm") }}
              </div>
            </CardFooter>
          </Card>
          <Card
            v-if="loading"
            class="w-auto max-w-[60vw] bg-accent ml-auto"
          >
            <CardContent>
              <div class="flex items-center space-x-4">
                <Skeleton class="h-12 w-12 rounded-full" />
                <div class="space-y-2">
                  <Skeleton class="h-4 w-[250px]" />
                  <Skeleton class="h-4 w-[200px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
      <div class="bg-background w-full">
        <div class="relative w-full items-center pb-3">
          <Textarea
            placeholder="Ask me anything..."
            v-model="value"
          />
          <span class="w-full flex items-center pt-3 gap-2">
            <Button variant="outline">
              Mode
            </Button>
            <Button variant="outline">
              <PhPaperclip/>
              Attach
            </Button>
            <Button variant="outline">
              <PhWaveform/>
              Voice
            </Button>
            <Button
              @click="askQuestion"
              class="ml-auto"
            >
              <PhPaperPlaneTilt/>
              Send
            </Button>
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Textarea } from "@/components/ui/textarea";
import {computed, ref, watch} from "vue";
import { PhCopy, PhHandWaving, PhPaperclip, PhPaperPlaneTilt, PhWaveform } from "@phosphor-icons/vue";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "vue-sonner";
import { marked } from "marked";
import { Skeleton } from "@/components/ui/skeleton";
import {formatDate, useMagicKeys} from "@vueuse/core";
import { useChats } from "@/stores/chat.ts";

const value = ref<string>('');
const loading = ref<boolean>(false);
const { enter, shift } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === "Enter")
      e.preventDefault();
  }
});

const chatMessages = computed(() => {
  const currentChat = useChats().chats.find(x=>x.id===useChats().currentChatId)
  if (!currentChat) return [];
  else return currentChat.messages;
})

watch(enter, async (pressed, prev) => {
  if (pressed && !prev) {
    if (shift.value) {
      value.value += "\n";
    } else {
      await askQuestion();
    }
  }
});

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(function() {
    toast("Copied!", {});
  }, function(err) {
    toast("Error!", {description: err});
  });
};

const askQuestion = async () => {
  if (!value.value) return;
  loading.value = true;
  const prompt = {
    content: value.value,
    created: new Date().getTime(),
    role: 'user'
  };
  value.value = '';
  await useChats().queryHuggingFace(prompt);
  loading.value = false;
};
</script>
