import cheerio from "cheerio";
import Axios from "axios";
import * as iconv from "iconv-lite";
import Format from "./Format";

const scrapeBullpen = async (val: string, pages: string) => {
  for (let i = 1; i < Number(pages); i += 30) {
    const url: string = encodeURI(
      `http://mlbpark.donga.com/mp/b.php?p=${i}&m=list&b=bullpen&query=&select=&user=`
    );

    await getPages(url, val);

    // if (inOrder) {
    //   await getPages(url, val);
    // } else {
    //   getPages(url, val);
    // }
  }
};

const getData = (body: string, val: string) => {
  const $ = cheerio.load(body);
  const box = $("tbody tr").each((i, elem) => {
    const title = $(elem).find(".tit a").text().trim();
    const link = $(elem).find(".tit a").attr("href");
    const date = $(elem).find(".date").text().trim();
    const tag = $(elem).find(".list_word").text().trim();
    if (title && link && title !== undefined && link !== undefined) {
      if (val === "Get All") {
        const data = new Format(title, String(link), date);
        console.log(data.form());
      }
      if (val === tag) {
        const data = new Format(title, String(link), date);
        console.log(data.form());
      }
    }
  });
};

const getPages = async (url: string, val: string) => {
  const res = await Axios({
    url,
    method: "GET",
    responseType: "arraybuffer",
  });

  const decoded = await iconv.decode(res.data, "utf-8");
  await getData(decoded, val);
};

export default scrapeBullpen;
