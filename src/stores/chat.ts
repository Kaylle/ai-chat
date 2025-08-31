import { ref } from "vue";
import { defineStore } from "pinia";
import type { ChatSession, Message } from "@/lib/models.ts";

export const useChats = defineStore('chat', () => {
  const chats = ref<ChatSession[]>([{
    id: "default",
    title: "General Chat",
    messages: [],
    isPinned: false
  }]);

  const currentChatId = ref("default");

  function getFolders() {
    const allFolders = chats.value.map(x=>x.id);
    const folders = [
      'default'
    ] as string[];
    allFolders.forEach(folder => {
      if (folder !== 'default') {
        const date = new Date(Number(folder));
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        folders.push(date.getTime().toString());
      }
    })
    return new Set(folders);
  }

  function addChat(title: string) {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title,
      messages: [],
      isPinned: false
    };
    chats.value.push(newChat);
    currentChatId.value = newChat.id;
  }

  function deleteChat(id: string) {
    if (currentChatId.value === id)
      currentChatId.value = "default";
    const i = chats.value.findIndex(x=>x.id === id);
    chats.value.splice(i, 1);
  }

  function pinChat(id: string) {
    const chat = chats.value.find(x=>x.id === id);
    if (chat)
      chat.isPinned = !chat.isPinned;
  }

  async function queryHuggingFace(prompt: Message) {
    const chat = chats.value.find(x=>x.id===currentChatId.value);
    if (chat) chat.messages.push(prompt);
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [{
            role: prompt.role,
            content: prompt.content,
          }],
          model: import.meta.env.VITE_HF_MODEL
        })
      }
    );
    if (!response.ok) throw new Error("HuggingFace API error");
    if (chat) {
      const res = await response.json() as any;
      chat.messages.push({
        content: res.choices[0].message.content,
        created: new Date().getTime(),
        role: res.choices[0].message.role
      });
    }
  }

  return { chats, currentChatId, getFolders, addChat, queryHuggingFace, deleteChat, pinChat };
})