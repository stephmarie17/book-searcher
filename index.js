// Dependencies
require('dotenv').config()
const axios = require('axios');
const { prompt } = require('inquirer');
const Book = require('./lib/Book');

// API Call
const key = process.env.API_KEY
const templateURL = 'https://www.googleapis.com/books/v1/'

const promptUser = () => {
    return prompt([
        {
            type: 'list',
            name: 'chooseFunction',
            message: 'What would you like to do?',
            choices: ['Search books by title', 'Search books by author', 'View my Reading List', 'Exit']
        }
    ])
}

// Find a book by title
const findBook = (title) => {
    // axios.get(`${templateURL}volumes?q=${title}&maxResults=5&orderBy=relevance&key=${key}`)
    axios.get(`${templateURL}volumes?q=${title}&maxResults=5&orderBy=relevance`)
    .then((response) => {
        let data = response.data.items
        listBooks(data);
    })
    .catch((err) => {
        console.log(err)
    })
};

// Find books by author
const findAuthor = (author) => {
    // axios.get(`${templateURL}volumes?q=${author}+inauthor:${author}&maxResults=5&orderBy=relevance&key=${key}`)
    axios.get(`${templateURL}volumes?q=${author}+inauthor:${author}&maxResults=5&orderBy=relevance`)
    .then((response) => {
        let data = response.data.items
        listBooks(data);
    })
    .catch((err) => {
        console.log(err)
    })
}

// List book results
const listBooks = (books) => {
    let bookResults = []
    books.map(item => {
        let book = new Book(item.volumeInfo.title, item.volumeInfo.authors, item.volumeInfo.publisher)
        bookResults.push(book);
    })
    console.info('Search Results:', bookResults)
    saveBooks(bookResults)
};

// Inquirer prompts
const titleSearch = [
    {
        type: 'input',
        name: 'title',
        message: 'Search by Book Title'
    }
];

const authorSearch = [
    {
        type: 'input',
        name: 'author',
        message: 'Search by Author'
    }
];

const toSave = [
    {
        type: 'confirm',
        name: 'confirmSave',
        message: 'Would you like to save a book to your bookshelf?'
    }
];

// Book Searching Logic
const searchBooks = () => {
    prompt(titleSearch).then(answers => {
        findBook(answers.title)
    })
};

const searchAuthors = () => {
    prompt(authorSearch).then(answers => {
        findAuthor(answers.author)
    })
};

// Book Saving Logic
let readingList = [];

const saveBooks = (choices) => {
    let bookChoices = [];
    for (let i = 0; i < choices.length; i++) {
        let bookObject = {
            name: choices[i].title + " by " + choices[i].author,
            value: {
                title: choices[i].title,
                author: choices[i].author,
                publisher: choices[i].publisher
            }
        }
        bookChoices.push(bookObject)
    }
    prompt(toSave).then(answers => {
        if(answers.confirmSave === true) {
            prompt([ {
                type: 'list',
                name: 'chooseBook',
                message: 'Choose a book to save to your Reading List',
                choices: bookChoices
            }]).then(answers => {
                console.info('Saved', answers.chooseBook, 'to Reading List!')
                readingList.push(answers.chooseBook)
                if(readingList.length > 0 ) {
                    init();
                }
            })
        } else {
            console.info('Okay! No worries!')
            init();
        }
    })
};

// Book Viewing Logic
const viewBooks = () => {
    if(readingList.length > 0 ) {
        console.info(readingList);
        console.info('You should add more books!!!')
        searchBooks();
    } else {
        console.info('You need to add books to your reading list!')
        searchBooks();
    }  
}

// Initializes when user runs 'node index.js'
const init = () => {
    console.info('=============================')
    console.info('Welcome to the Book Searcher!')
    console.info('=============================')
    promptUser().then(answers => {
        if(answers.chooseFunction === 'Search books by title') {
            searchBooks();
        } else if (answers.chooseFunction === 'Search books by author') {
            searchAuthors();
        } else if(answers.chooseFunction === 'View my Reading List') {
            viewBooks();
        } else {
            console.info('Bye!')
        }
    })
};

init();


