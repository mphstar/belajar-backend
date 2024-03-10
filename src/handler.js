const { getAllBook, getDetailBook, addBook, updateBook, deleteBook } = require("./bookselfApi")

const route = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBook,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getDetailBook,
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBook,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook,
    }
]

module.exports = route