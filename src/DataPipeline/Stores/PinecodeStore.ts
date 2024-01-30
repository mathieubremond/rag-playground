import { VectorStore } from "langchain/vectorstores/base";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Document } from "langchain/document";

export class PinecodeStore {
  constructor() {}

  async getPinecodeStore(): Promise<VectorStore> {
    const pinecone = new Pinecone();

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex }
    );
    return vectorStore;
  }

  async storeDocuments(documents: Document[]) {
    const pinecone = new Pinecone();

    console.log("Generating embeddings in Pinecone");
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

    return PineconeStore.fromDocuments(documents, new OpenAIEmbeddings(), {
      pineconeIndex,
      maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    });
  }
}
