<template>
  <div class="w-full flex flex-col">
    <main class="flex flex-1 flex-col">
      <ScrollArea class="w-full px-4" style="height: calc(100vh - 240px)">
        <div
          v-if="messages.length === 0"
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
        <div
          class="flex flex-col gap-4 pb-4"
          v-for="message in messages"
          :key="message.content"
        >
          <Card
            class="w-auto max-w-[60vw]"
            :class="message.role==='user'?'mr-auto':'bg-accent ml-auto'"
          >
            <CardContent v-html="marked.parse(message.content)"/>
            <CardFooter>
              <Button
                variant="outline"
                @click="copyToClipboard(message.content)"
              >
                <PhCopy/>
              </Button>
              {{message.created}}
              {{new Date(message.created).toISOString()}}
            </CardFooter>
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
import { ref } from "vue";
import {PhCopy, PhHandWaving, PhPaperclip, PhPaperPlaneTilt, PhWaveform} from "@phosphor-icons/vue";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {queryHuggingFace} from "@/lib/huggingface.ts";
import { toast } from "vue-sonner";
import type {Message} from "@/lib/models.ts";
import { marked } from "marked";

const value = ref('');
const messages = ref([] as Message[]);

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(function() {
    toast("Copied!", {});
  }, function(err) {
    toast("Error!", {description: err});
  });
}

const askQuestion = async () => {
  messages.value.push({
    content: value.value,
    created: new Date().getTime(),
    role: 'user'
  });
  const res = await queryHuggingFace(value.value);
  console.log(res);
  messages.value.push({
    content: res.choices[0].message.content,
    created: res.created,
    role: res.choices[0].message.role
  });
};
</script>
