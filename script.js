import fs from "fs/promises";
import OpenAI from "openai";
import OPENAI_API_KEY from "./environment.js";

//constants
const ARTICLE_RAW_PATH = "./artykul_surowy.txt";
const ARTICLE_RAW_ENCODING = "utf8";

const ARTICLE_PROCESSED_PATH = "./artykul.html";

const OPEN_AI_MODEL = "gpt-4o";
const SYSTEM_PROMPT = `
You are a helpful assistant specializing in converting articles into structured HTML.
Your task is to transform text articles into well-structured HTML documents, while also suggesting suitable places to include images.

Guidelines:
1. Structure the article using relevant HTML tags (e.g., <h1>, <h2>, <p>, <ul>, <ol>, <li>, <table>, <blockquote>, etc.) to organize the content in a clear and readable format. Divide long sections into smaller parts with <h2> or <h3> as needed.
2. Identify logical spots in the article where images can enhance the content. There should be at least one image per section.
   For each identified spot, insert an image placeholder with the following format:
   <img src="image_placeholder.jpg" alt="Prompt for image generation.">
   The alt text should be written in the same language as the article and describe the visual content that should appear in the image.
   Make sure the alt text describes the image in enough detail that it can be used to generate the image later.
3. For every image added, include a caption beneath it using the <figcaption> tag. The caption should also be in the same language as the article and describe the image in a way that adds context or explanation.
4. Do not include any CSS or JavaScript. The returned code should only contain content to be placed between <body> and </body> tags. Do not include <html>, <head>, or <body> tags.
5. Maintain the natural flow of the article while ensuring proper structure, hierarchy, and readability.
6. Ensure the HTML tags are properly used to enhance readability and functionality.
7. Any addition to the article should be written in the same language as the article.
8. Do not wrap the entire content in overarching tags such as <section>, <article>, or <aside>.
9. Do not format the output as a Markdown code block. Avoid using triple backticks.
`;

//functions
async function read_file(file_path, file_encoding) {
  try {
    console.log(`\nReading file '${file_path}' in progress...`);

    let file_content = await fs.readFile(file_path, file_encoding);
    return file_content;
  } catch (error) {
    console.error(
      `Error reading file: '${file_path}'.\nError: ${error.message}`
    );
    return null;
  }
}

async function process_article_with_openai(
  system_prompt,
  openai_model,
  article_content
) {
  try {
    console.log(`\nProcessing article with Open AI API in progress...`);

    let openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    const USER_PROMPT = `
    Please convert the following article into structured HTML:

    ${article_content}
    
    Ensure the generated HTML is well-formed, readable, and follows the provided guidelines.
    `;

    let response = await openai.chat.completions.create({
      model: openai_model,
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: system_prompt,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: USER_PROMPT,
            },
          ],
        },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error(`Error processing article.\nError: ${error.message}`);
    return null;
  }
}

async function write_file(file_path, file_content) {
  try {
    console.log(`\nWriting file '${file_path}' in progress...`);

    await fs.writeFile(file_path, file_content);
    return true;
  } catch (error) {
    console.error(
      `Error writing file: '${file_path}'.\nError: ${error.message}`
    );
    return null;
  }
}

//main function
async function main() {
  //reading file logic
  var article_raw = await read_file(ARTICLE_RAW_PATH, ARTICLE_RAW_ENCODING);
  if (!article_raw) return;
  console.log(`File '${ARTICLE_RAW_PATH}' was read successfully.`);

  //using Open AI API
  var article_processed = await process_article_with_openai(
    SYSTEM_PROMPT,
    OPEN_AI_MODEL,
    article_raw
  );
  if (!article_processed) return;
  console.log(`Article was processed successfully.`);

  //writing file logic
  var article_processed_write_success = await write_file(
    ARTICLE_PROCESSED_PATH,
    article_processed
  );
  if (!article_processed_write_success) return;
  console.log(`File '${ARTICLE_PROCESSED_PATH}' was written successfully.`);
}

//executing main function
main();
