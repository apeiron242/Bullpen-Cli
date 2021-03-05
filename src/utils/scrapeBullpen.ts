import cheerio from "cheerio";
import Axios from "axios";
import * as iconv from "iconv-lite";
import Format from "./Format";

const scrapeBullpen = async (val: string, pages: string, inOrder: boolean) => {
  for (let i = 1; i < Number(pages); i += 10) {
    const url: string = encodeURI(
      `http://mlbpark.donga.com/mp/b.php?p=${i}&m=search&b=bullpen&query=${val}`
    );
    if (inOrder) {
      await getPages(url);
    } else {
      getPages(url);
    }
  }
};

const getData = (body: string) => {
  const $ = cheerio.load(body);
  const box = $("tbody tr").each((i, elem) => {
    const title = $(elem).find(".tit a").text().trim();
    const link = $(elem).find(".tit a").attr("href");
    const date = $(elem).find(".date").text().trim();
    if (title && link && title !== undefined && link !== undefined) {
      const data = new Format(title, String(link), date);
      console.log(data.form());
    }
  });
};

const getPages = async (url: string) => {
  const res = await Axios({
    url,
    method: "GET",
    responseType: "arraybuffer",
  });

  const decoded = await iconv.decode(res.data, "utf-8");
  await getData(decoded);
};

export default scrapeBullpen;
