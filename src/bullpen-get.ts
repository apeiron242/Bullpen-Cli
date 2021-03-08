import inquirer from "inquirer";
import scrapeBullpen from "./utils/scrapeBullpen";
import scrapeKeywords from "./utils/scrapeKeywords";

const getTags = async () => {
  const list = ["Get All"];
  const tags = await scrapeKeywords();
  const lists = list.concat(tags);
  return lists;
};

const formatPages = () => {
  const nums: string[] = [];
  for (let i = 250; i <= 10000; i += 250) {
    nums.push(String(i));
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
    // {
    //   type: "confirm",
    //   name: "inOrder",
    //   message: "Scrape in time order? (Not precise)",
    // },
  ])
  .then(async (result) => {
    scrapeBullpen(result.tag, result.pages);
  });
