
import {
  GoogleGenAI,
} from '@google/genai';

async function runchat(prompt: string) {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyBsFch3Ci85x6bC-lnCqaHDx_zYGdlBrzM",
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
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

export default runchat;
