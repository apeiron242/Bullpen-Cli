import inquirer from "inquirer";
import scrapeBullpen from "./utils/scrapeBullpen";
import scrapeKeywords from "./utils/scrapeKeywords";

const getTags = async () => {
  const tags = await scrapeKeywords();
  return tags;
};

const formatPages = () => {
  const nums: string[] = [];
  for (let i = 1; i < 15; i++) {
    nums.push(i + "00");
  }
  return nums;
};

inquirer
  .prompt([
    {
      type: "list",
      name: "tag",
      choices: getTags,
    },
    {
      type: "list",
      name: "pages",
      choices: formatPages,
    },
    {
      type: "confirm",
      name: "inOrder",
      message: "Scrape in time order? (Not precise)",
    },
  ])
  .then(async (result) => {
    scrapeBullpen(result.tag, result.pages, result.inOrder);
  });
