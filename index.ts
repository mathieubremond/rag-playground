import dotenv from "dotenv";
import { MainRAG } from "./src/Service/Main";

dotenv.config();

const prompt = "What is the jagged frontier in french?";

MainRAG.run(prompt)
  .then((answer) => {
    console.log(answer);
  })
  .catch((error) => {
    console.error(error);
  });
