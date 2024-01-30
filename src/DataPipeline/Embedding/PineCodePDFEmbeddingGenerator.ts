import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from "fs";

export class PineCodePDFEmbeddingGenerator {
  constructor() {}

  public async generate(pdfPath?: string): Promise<void> {
    const pinecone = new Pinecone();

    const documents = await this.loadPdfFile(pdfPath);
    const splitDocuments = await this.splitDocuments(documents);

    console.log("Generating embeddings in Pinecone");
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

    await PineconeStore.fromDocuments(splitDocuments, new OpenAIEmbeddings(), {
      pineconeIndex,
      maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    });

    return Promise.resolve();
  }

  public async loadPdfFile(pdfPath?: string): Promise<Document[]> {
    const testPdf = "src/DataPipeline/Embedding/data/test.pdf";
    const filePath = pdfPath || testPdf;

    const exists = this.fileExists(filePath);
    if (!exists) throw new Error(`File ${filePath} does not exist.`);

    console.log(`Loading PDF file from ${filePath}`);

    const loader = new PDFLoader(filePath);

    const docs = await loader.load();

    return docs;
  }

  public async splitDocuments(documents: Document[]): Promise<Document[]> {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500, // This is important, strategy to decide based on future LLM used
      chunkOverlap: 10, // This is important, big overlap can lead to more context, but also garbage. When low overlap, we might miss some context.
    });

    console.log("Splitting documents into smaller chunks");
    const splitDocuments = await splitter.splitDocuments(documents);

    return splitDocuments;
  }

  private fileExists(filePath: string): boolean {
    try {
      fs.accessSync(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }
}
