import { ConfluencePagesLoader } from "langchain/document_loaders/web/confluence";

export class ConfluenceLoader {
  public async load() {
    const username = process.env.CONFLUENCE_USERNAME;
    const personalAccessToken = process.env.CONFLUENCE_TOKEN;

    if (!personalAccessToken)
      throw new Error("No Confluence PAT found in environment variables");

    const loader = new ConfluencePagesLoader({
      baseUrl: "https://stuart-team.atlassian.net/wiki",
      spaceKey: "SCH",
      username,
      accessToken: personalAccessToken,
    });
    const documents = await loader.load();
    console.log(documents);

    return documents;
  }
}
