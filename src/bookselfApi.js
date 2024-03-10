const { nanoid } = require('nanoid');
const data = require('./data');

const getAllBook = (request, h) => {
  const { name, reading, finished } = request.query;

  let dataBooks = data;

  if (name)
    dataBooks = data.filter((it) =>
      it.name.toLowerCase().includes(name.toLowerCase())
    );

  if (reading == 0) {
    dataBooks = data.filter((it) => it.reading === false);
  } else if (reading == 1) {
    dataBooks = data.filter((it) => it.reading === true);
  }

  if (finished == 0) {
    dataBooks = data.filter((it) => it.finished === false);
  } else if (finished == 1) {
    dataBooks = data.filter((it) => it.finished === true);
  }

  const showData = dataBooks.map((it) => ({
    id: it.id,
    name: it.name,
    publisher: it.publisher,
  }));

  return h
    .response(
      JSON.stringify({
        status: "success",
        data: {
          books: showData,
        },
      })
    )
    .code(200)
    .header("content-type", "application/json");
};

const getDetailBook = (request, h) => {
  const { bookId } = request.params;

  const book = data.find((it) => it.id === bookId);

  if (!book) {
    return h
      .response(
        JSON.stringify({
          status: "fail",
          message: "Buku tidak ditemukan",
        })
      )
      .code(404)
      .header("content-type", "application/json");
  }

  return h
    .response(
      JSON.stringify({
        status: "success",
        data: {
          book,
        },
      })
    )
    .code(200)
    .header("content-type", "application/json");
};

const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  let error = "";

  if (!name) {
    error = "Gagal menambahkan buku. Mohon isi nama buku";
  }
  if (!year) {
    error = "Gagal menambahkan buku. Mohon isi tahun buku";
  }
  if (!author) {
    error = "Gagal menambahkan buku. Mohon isi author buku";
  }
  if (!summary) {
    error = "Gagal menambahkan buku. Mohon isi summary buku";
  }
  if (!publisher) {
    error = "Gagal menambahkan buku. Mohon isi publisher buku";
  }
  if (!pageCount) {
    error = "Gagal menambahkan buku. Mohon isi pageCount buku";
  }
  if (!readPage) {
    error = "Gagal menambahkan buku. Mohon isi readPage buku";
  }
  if (reading == null) {
    error = "Gagal menambahkan buku. Mohon isi reading buku";
  }

  if (readPage > pageCount) {
    error =
      "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount";
  }

  if (error !== "") {
    return h
      .response(
        JSON.stringify({
          status: "fail",
          message: error,
        })
      )
      .code(400)
      .header("content-type", "application/json");
  }

  const insertedAt = new Date().toISOString();

  const newBook = {
    id: nanoid(16),
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    insertedAt,
    updatedAt: insertedAt,
  };

  data.push(newBook);

  return h
    .response(
      JSON.stringify({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: newBook.id,
        },
      })
    )
    .code(201)
    .header("content-type", "application/json");
};

const updateBook = (request, h) => {
  const { bookId } = request.params;

  const book = data.find((it) => it.id === bookId);

  if (!book) {
    return h
      .response(
        JSON.stringify({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
      )
      .code(404)
      .header("content-type", "application/json");
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  let error = "";

  if (!name) {
    error = "Gagal memperbarui buku. Mohon isi nama buku";
  }
  if (!year) {
    error = "Gagal memperbarui buku. Mohon isi tahun buku";
  }
  if (!author) {
    error = "Gagal memperbarui buku. Mohon isi author buku";
  }
  if (!summary) {
    error = "Gagal memperbarui buku. Mohon isi summary buku";
  }
  if (!publisher) {
    error = "Gagal memperbarui buku. Mohon isi publisher buku";
  }
  if (!pageCount) {
    error = "Gagal memperbarui buku. Mohon isi pageCount buku";
  }
  if (!readPage) {
    error = "Gagal memperbarui buku. Mohon isi readPage buku";
  }
  if (reading == null) {
    error = "Gagal memperbarui buku. Mohon isi reading buku";
  }

  if (readPage > pageCount) {
    error =
      "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount";
  }

  if (error !== "") {
    return h
      .response(
        JSON.stringify({
          status: "fail",
          message: error,
        })
      )
      .code(400)
      .header("content-type", "application/json");
  }

  book.name = name;
  book.year = year;
  book.author = author;
  book.summary = summary;
  book.publisher = publisher;
  book.pageCount = pageCount;
  book.readPage = readPage;
  book.finished = pageCount === readPage;
  book.reading = reading;
  book.updatedAt = new Date().toISOString();

  return h
    .response(
      JSON.stringify({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
    )
    .code(200)
    .header("content-type", "application/json");
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;

  const book = data.find((it) => it.id === bookId);

  if (!book) {
    return h
      .response(
        JSON.stringify({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        })
      )
      .code(404)
      .header("content-type", "application/json");
  }

  data.forEach((el, index) => {
    if (el.id === bookId) {
      data.splice(index, 1);
    }
  });

  return h
    .response(
      JSON.stringify({
        status: "success",
        message: "Buku berhasil dihapus",
      })
    )
    .code(200)
    .header("content-type", "application/json");
};

module.exports = {
  getAllBook,
  getDetailBook,
  addBook,
  updateBook,
  deleteBook,
};
