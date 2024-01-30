import dotenv from "dotenv";
import { PineCodePDFEmbeddingGenerator } from "./src/DataPipeline/Embedding/PineCodePDFEmbeddingGenerator";
import { SimilaritySearchRetrieverFromVectorStore } from "./src/DataPipeline/Retrieval/SimilaritySearchRetrieverFromVectorStore";
import { OpenAIRetrievalQAChain } from "./src/Agent/OpenAIRetrievalQAChain";
import { PinecodeStore } from "./src/DataPipeline/Stores/PinecodeStore";
import { simplePdfPrompTemplate } from "./src/Prompts/SimplePDFPromptTemplate";
import { ConfluenceLoader } from "./src/DataPipeline/Embedding/ConfluenceLoader";

dotenv.config();

const p = new Promise<void>(async (resolve) => {
  // ######################
  // First Step: Generate embeddings in Pinecone & store them in the Pinecone index

  // const generator = new PineCodePDFEmbeddingGenerator();

  // await generator.generate();
  // console.log("Done");
  //

  // ######################
  // Second Step: Retrieve documents from the Pinecone index
  // const retriever = new SimilaritySearchRetrieverFromVectorStore();

  // const prompt = "What's the jagged frontier?";

  // const documents = await retriever.pineconeStoreRetrieveDocuments(prompt);
  // console.log(documents);
  //

  // ######################
  // Call the LLM with the retrieved documents

  // Then, we need to retrieve the relevant documents from our knowledge base & generate an answer.
  // const vectorStore = await new PinecodeStore().getPinecodeStore();
  // const prompt = "What's the jagged frontier?";
  // const chain = new OpenAIRetrievalQAChain();
  // const answer = await chain.answer(
  //   vectorStore,
  //   simplePdfPrompTemplate,
  //   prompt
  // );
  // console.log(answer);

  // ######################

  const pinecode = new PinecodeStore();
  console.log("Initializing Pinecone index");
  const confluenceLoader = new ConfluenceLoader();
  console.log("Loading documents from Confluence");
  const documents = await confluenceLoader.load();
  console.log("Storing documents in Pinecone");
  await pinecode.storeDocuments(documents);

  resolve();
});

Promise.resolve(p);
