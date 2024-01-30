import { VectorStore } from "langchain/vectorstores/base";
import { Document } from "langchain/document";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PinecodeStore } from "../Stores/PinecodeStore";

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
  public async genericStoreRetrieveDocuments(
    vectorStore: VectorStore,
    prompt: string
  ): Promise<Document[]> {
    console.log("Generating retrieval for the prompt from the vector store");
    const relevantDocs = await vectorStore.similaritySearch(prompt);
    return relevantDocs;
  }

  public async pineconeStoreRetrieveDocuments(
    prompt: string
  ): Promise<Document[]> {
    const vectorStore = await new PinecodeStore().getPinecodeStore();

    return this.genericStoreRetrieveDocuments(vectorStore, prompt);
  }
}
