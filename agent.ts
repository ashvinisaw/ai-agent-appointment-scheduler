import OpenAI from "openai";
import readline from "readline";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages = [] as any;

const query_llm = async (content: string) => {
  messages.push({
    role: "user",
    content
  });

  const response = await client.chat.completions.create({
    messages,
    model: "gpt-4o",
  });

  messages.push(response.choices[0].message);

  return response.choices[0].message.content;
};

const main = async () => {
  while (true) {
    const userInput: string = await new Promise((resolve) => {
      rl.question("Say something: ", resolve);
    });

    const response = await query_llm(userInput);
    console.log("Assistant: ", response);
  }
};

main();