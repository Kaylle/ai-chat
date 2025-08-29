export async function queryHuggingFace(prompt: string) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/gpt2",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  if (!response.ok) {
    throw new Error("HuggingFace API error");
  }

  const result = await response.json();
  return result[0]?.generated_text ?? "Error";
}