class Book {
    constructor(title, author, publisher) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
    }

    getTitle() {
        return this.title;
    }

    getAuthor() {
        return this.author;
    }

    getPublisher() {
        return this.publisher;
    };
}

module.exports = Book;