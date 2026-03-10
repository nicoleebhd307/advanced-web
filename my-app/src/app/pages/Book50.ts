export interface IBook50 {
    BookId: string,
    BookTitle: string,
    Author: string,
    Description: string,
    Price: number,
    Image: string
}

export class Book50 implements IBook50 {
    constructor(
        public BookId: string,
        public BookTitle: string,
        public Author: string,
        public Description: string,
        public Price: number,
        public Image: string
    ) { }
}