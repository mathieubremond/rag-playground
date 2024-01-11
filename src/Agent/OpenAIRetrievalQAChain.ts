import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";
import { VectorStore } from "langchain/vectorstores/base";
import { PromptTemplate } from "@langchain/core/prompts";

export class OpenAIRetrievalQAChain {
  constructor() {}

  public async answer(
    vectorStore: VectorStore,
    promptTemplate: PromptTemplate,
    userPrompt: string
  ): Promise<string> {
    console.log("Answering question using OpenAI Retrieval QA Chain");

    const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

    console.log("Formatting prompt");
    const augmentedPrompt = await promptTemplate.format({
      query: userPrompt,
    });

    console.log("Invoking chain");
    const response = await chain.invoke({
      query: augmentedPrompt,
    });

    console.log("Returning response");
    return response.text;
  }
}
