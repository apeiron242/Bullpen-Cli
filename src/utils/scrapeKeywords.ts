import Axios from "axios";
import iconv from "iconv-lite";
import cheerio from "cheerio";

const scrapeKeywords = async () => {
  const list: string[] = [];
  const url = "http://mlbpark.donga.com/mp/b.php?b=bullpen";
  const res = await Axios({
    url,
    method: "GET",
    responseType: "arraybuffer",
  });

  const decoded = iconv.decode(res.data, "utf-8");

  const $ = cheerio.load(decoded);

  const box = $(".search_list > li").each((i, elem) => {
    const tag = $(elem).find("a").text().trim();
    list.push(tag);
  });
  return list;
};

export default scrapeKeywords;
