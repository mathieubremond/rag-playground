import { VectorStore } from "langchain/vectorstores/base";
import { Document } from "langchain/document";

/**
 * Class representing a Retriever.
 * Relies on Langchain's `MemoryVectorStore` class.
 *
 * This class performs the following steps:
 * 1. Generates retrieval for a given prompt.
 * 2. Returns an array of relevant documents.
 *
 * @returns {Promise<Document[]>} A promise that resolves to an array of relevant documents.
 */
export class SimilaritySearchRetrieverFromVectorStore {
  constructor() {}

  /**
   * Generates retrieval for a given prompt.
   * @param vectorStore - The vector store used for retrieval.
   * @param prompt - The prompt for retrieval.
   * @returns A promise that resolves to an array of relevant documents.
   */
  public async execute(
    vectorStore: VectorStore,
    prompt: string
  ): Promise<Document[]> {
    console.log("Generating retrieval for the prompt from the vector store");
    const relevantDocs = await vectorStore.similaritySearch(prompt);
    return relevantDocs;
  }
}
