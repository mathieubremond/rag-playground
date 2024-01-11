import { OpenAIRetrievalQAChain } from "../Agent/OpenAIRetrievalQAChain";
import { InMemoryPDFEmbeddingGenerator } from "../DataPipeline/Embedding/InMemoryPDFEmbeddingGenerator";
import { simplePdfPrompTemplate } from "../Prompts/SimplePDFPromptTemplate";

export class MainRAG {
  public static async run(prompt: string): Promise<string> {
    const userPrompt = "What's the jagged frontier?";
    // By default chat gpt will not be able to answer this question.
    // "The Jagged Frontier" does not correspond to a widely recognized geographical location, historical event, or a commonly known concept in my existing knowledge base as of April 2023. It's possible that it could be a term used in a specific context, such as in literature, gaming, or a specialized field, but without additional context, it's challenging to provide a precise definition or explanation.

    // Let's try Augmented Retrieval Generation (RAG) to see if we can get a better answer.

    // First, we need to generate embeddings for the documents in our knowledge base.
    const generator = new InMemoryPDFEmbeddingGenerator();
    const vectorStore = await generator.execute();

    // Then, we need to retrieve the relevant documents from our knowledge base & generate an answer.
    const chain = new OpenAIRetrievalQAChain();
    const answer = await chain.answer(
      vectorStore,
      simplePdfPrompTemplate,
      userPrompt
    );

    // Expected output: Answer:  Answer:  The jagged frontier refers to the uneven and dynamic boundary between tasks that can be performed better by humans using AI and tasks that can be performed better by AI alone. It is called "jagged" because tasks that appear to be of similar difficulty may vary in their performance when using AI. The boundary of the frontier can shift over time as AI capabilities continue to expand. Navigating this frontier and understanding its implications for human professionals and organizations is a challenge.
    return answer;
  }
}
