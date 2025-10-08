
import { GoogleGenAI } from '@google/genai';

async function runchat(prompt: string) {
  const ai = new GoogleGenAI({
    apiKey: "",
  });
  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    tools,
  };
  const model = 'gemini-2.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText: string = "";
  for await (const chunk of response) { // response comes in form of chunks which can be stiched
    fullText += chunk.text;
  }
  console.log(fullText);
  return fullText;
}

export default runchat;
