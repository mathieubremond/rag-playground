import { PromptTemplate } from "@langchain/core/prompts";

export const simplePdfPrompTemplate = PromptTemplate.fromTemplate(`
Given a question, extract relevant information from a PDF document to provide a detailed, accurate, and concise answer.
Consider technical details, industry-specific terminology (last mile delivery), and context from the document to ensure the response is directly applicable to the query.
Answer by quoting the text from the source document.

Query: {query}
Answer:`);
