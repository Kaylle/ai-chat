export async function queryHuggingFace(prompt: string) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: import.meta.env.VITE_HF_MODEL,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("HuggingFace API error");
  }

  return await response.json();
}