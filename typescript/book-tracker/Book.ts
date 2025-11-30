export type Status = "Read" | "Re-read" | "DNF" | "Currently reading" | "Returned Unread" | "Want to read";
export type Format = "Print" | "PDF" | "Ebook" | "AudioBook";

export class Book {
  title: string;
  author: string;
  pages: number;
  pagesRead: number;
  status: Status;
  format: Format;
  price: number;
  suggestedBy: string;
  finished: boolean;

  constructor(
    title: string,
    author: string,
    pages: number,
    pagesRead: number,
    status: Status,
    format: Format,
    price: number,
    suggestedBy: string
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
    this.status = status;
    this.format = format;
    this.price = price;
    this.suggestedBy = suggestedBy;
    this.finished = pagesRead >= pages;
  }


}
