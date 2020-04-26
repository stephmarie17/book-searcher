# book-searcher
A command line application to search for books with the Google API and add them to a bookshelf

## Description
This application was built in NodeJS. It enables users to search for books with the Google Books API and save books to a local Reading List via the command line. 

## Installation
To run locally, clone to your machine and run npm install to install dependencies. After installation, you can run the applicaiton in the command line by entering `node index.js`. 

You will also need a Google API key to run the application. To learn how to acquire a key, you can visit the [Google Books API docs](https://cloud.google.com/docs/authentication/api-keys?visit_id=637235392987124539-3850891900&rd=1). You do not need to get OAuth credentials. Set this key as API_
KEY in a .env file to keep it protected, or update the code with your own key.

## Usage
Upon starting, the user will view a list of prompts to search by book title, search by author, view their reading list, or exit. To search, select either of the top two options and receive the top five results from the API. 

From there, users can choose to save a book to their bookshelf. If they enter `Y`, they'll be prompted to respond which book from the five returned they would like to save, and the applicaiton will tell them to add more books and offer the search option again. If they enter `n`, they return to the main menu. 

Users can also view a list of books saved during the session. The Reading List displays the book title, author, and publisher.

## Dependencies
- Node
- Inquirer
- Dotenv
- Axios

## Contributor
Stephanie Aurelio
