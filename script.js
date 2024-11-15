import fs from "fs/promises";

//constants
const article_raw_path = "./artykul_surowy.txt";
const article_raw_encoding = "utf8";

//functions
async function read_file(file_path, file_encoding) {
  try {
    const file_content = await fs.readFile(file_path, file_encoding);
    return file_content;
  } catch (error) {
    console.error(
      `Error reading file: '${file_path}'.\nError: ${error.message}`
    );
    return null;
  }
}

//main function
async function main() {
  //reading file logic
  const article_raw = await read_file(article_raw_path, article_raw_encoding);
  if (!article_raw) return;
  console.log(`File '${article_raw_path}' was read successfully.`);
}

//executing main function
main();
