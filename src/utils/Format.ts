class Format {
  private title: string;
  private link: string;
  private date: string;
  constructor(title: string, link: string, date: string) {
    this.title = title;
    this.link = link;
    this.date = date;
  }

  form = (): string => {
    return `\nTitle: ${this.title}\nLink: ${this.link}\nDate: ${this.date}\n`;
  };
}

export default Format;
