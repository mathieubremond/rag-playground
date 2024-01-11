import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import fs from "fs";

/**
 * Runs the PDF embedding generation process.
 * Relies on Langchain's `PDFLoader`, `RecursiveCharacterTextSplitter`, `OpenAIEmbeddings`, and `MemoryVectorStore` classes.
 *
 * This method performs the following steps:
 * 1. Loads the PDF file using the `loadPdfFile` method.
 * 2. Splits the loaded documents into smaller chunks using the `splitDocuments` method.
 * 3. Generates embeddings for the split documents using the `generateEmbeddingsInMemory` method.
 * 4. Returns the generated memory vector store containing the embeddings.
 *
 * @returns {Promise<MemoryVectorStore>} A promise that resolves to the generated memory vector store.
 */
export class InMemoryPDFEmbeddingGenerator {
  constructor() {}

  /**
   * Runs the PDF embedding generation process.
   *
   * @param pdfPath - The path to the PDF file to be processed. If not provided, the default PDF file will be used.
   * @returns A promise that resolves to a MemoryVectorStore object containing the generated embeddings.
   */
  public async execute(pdfPath?: string): Promise<MemoryVectorStore> {
    const documents = await this.loadPdfFile(pdfPath);
    const splitDocuments = await this.splitDocuments(documents);
    const vectorStore = await this.generateEmbeddingsInMemory(splitDocuments);
    return vectorStore;
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
      chunkSize: 500,
      chunkOverlap: 10,
    });

    console.log("Splitting documents into smaller chunks");
    const splitDocuments = await splitter.splitDocuments(documents);

    return splitDocuments;
  }

  public async generateEmbeddingsInMemory(
    splitDocuments: Document[]
  ): Promise<MemoryVectorStore> {
    const embeddings = new OpenAIEmbeddings();

    console.log("Generating embeddings for the split documents");

    const vectorStore = await MemoryVectorStore.fromDocuments(
      splitDocuments,
      embeddings
    );

    return vectorStore;
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
