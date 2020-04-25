const Book = require('../lib/Book');

test("Can instatiate Book instance", () => {
    const b = new Book();
    expect(typeof(b)).toBe("object");
});

test("Can set title via constructor arguments", () => {
    const title = 'The Great Gatsby'
    const b = new Book(title);
    expect(b.title).toBe(title);
});

test("Can set author via constructor argument", () => {
    const author = 'F. Scott Fitzgerald'
    const b = new Book("Foo", author);
    expect(b.author).toBe(author);
});

test("Can set publisher via constructor argument", () => {
    const publisher = 'Oberon Books'
    const b = new Book("Foo", "Bar", publisher);
    expect(b.publisher).toBe(publisher);
});