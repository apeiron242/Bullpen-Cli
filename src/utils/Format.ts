class Format {
  private title: string;
  private link: string;
  constructor(title: string, link: string) {
    this.title = title;
    this.link = link;
  }

  form = (): string => {
    return `\nTitle: ${this.title}\nLink: ${this.link}\n`;
  };
}

export default Format;
