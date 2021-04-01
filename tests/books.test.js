const { Book } = require("../src/models");
const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");

describe("/books", () => {
  before(async () => {
    try {
      await Book.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Book.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });

  describe("POST /books", async () => {
    it("creates a new book in the database", async () => {
      const response = await request(app).post("/books").send({
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        ISBN: "9780747532743",
      });

      await expect(response.status).to.equal(201);
      expect(response.body.title).to.equal(
        "Harry Potter and the Philosopher's Stone"
      );
      expect(response.body.author).to.equal("J.K. Rowling");
      expect(response.body.genre).to.equal("Fantasy");
      expect(response.body.ISBN).to.equal("9780747532743");

      const newBookRecord = await Book.findByPk(response.body.id, {
        raw: true,
      });
      expect(newBookRecord.title).to.equal(
        "Harry Potter and the Philosopher's Stone"
      );
      expect(newBookRecord.author).to.equal("J.K. Rowling");
      expect(newBookRecord.genre).to.equal("Fantasy");
      expect(newBookRecord.ISBN).to.equal("9780747532743");
    });
  });

  it("throws an error if title is null", async () => {
    const response = await request(app).post("/books").send({
      title: null,
      author: "J.K. Rowling",
      genre: "Fantasy",
      ISBN: "9780747532743"
    });

    await expect(response.status).to.equal(400);
    expect(response.body.error).to.equal("SequelizeValidationError");
  });

  it("throws an error if author is null", async () => {
    const response = await request(app).post("/books").send({
      title: "Harry Potter and the Philosopher's Stone",
      author: null,
      genre: "Fantasy",
      ISBN: "9780747532743"
    });

    await expect(response.status).to.equal(400);
    expect(response.body.error).to.equal("SequelizeValidationError");
  });

  describe("with books in the database", () => {
    let books;
    beforeEach((done) => {
      Promise.all([
        Book.create({
          title: "Harry Potter and the Philosopher's Stone",
          author: "J.K. Rowling",
          genre: "Fantasy",
          ISBN: "9780747532743",
        }),
        Book.create({
          title: "The Little Prince",
          author: "Antoine de Saint-Exupéry",
          genre: "Novella",
          ISBN: "9781405288194",
        }),
        Book.create({
          title: "Dream of the Red Chamber",
          author: "Cao Xueqin",
          genre: "Family Saga",
          ISBN: "9781533148650",
        }),
      ]).then((documents) => {
        books = documents;
        done();
      });
    });

    describe("GET /books", () => {
      it("gets all book records", (done) => {
        request(app)
          .get("/books")
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(3);
            res.body.forEach((book) => {
              const expected = books.find((a) => a.id === book.id);
              expect(book.title).to.equal(expected.title);
              expect(book.author).to.equal(expected.author);
              expect(book.genre).to.equal(expected.genre);
              expect(book.ISBN).to.equal(expected.ISBN);
            });
            done();
          })
          .catch((error) => done(error));
      });
    });

    describe("GET /books/:id", () => {
      it("gets book record by id", (done) => {
        const book = books[0];
        request(app)
          .get(`/books/${book.id}`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal(book.title);
            expect(res.body.author).to.equal(book.author);
            expect(res.body.genre).to.equal(book.genre);
            expect(res.body.ISBN).to.equal(book.ISBN);
            done();
          })
          .catch((error) => done(error));
      });
      it("returns a 404 if the book does not exist", (done) => {
        request(app)
          .get("/books/12345")
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal("The book could not be found.");
            done();
          })
          .catch((error) => done(error));
      });
    });

    describe("PATCH /books/:id", () => {
      it("updates book title by id", (done) => {
        const book = books[0];
        request(app)
          .patch(`/books/${book.id}`)
          .send({ title: "Harry Potter and the Sorcerer's Stone" })
          .then((res) => {
            expect(res.status).to.equal(200);
            Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
              expect(updatedBook.title).to.equal(
                "Harry Potter and the Sorcerer's Stone"
              );
              done();
            });
          })
          .catch((error) => done(error));
      });

      it("updates book author by id", (done) => {
        const book = books[0];
        request(app)
          .patch(`/books/${book.id}`)
          .send({ author: "Joanne K. Rowling" })
          .then((res) => {
            expect(res.status).to.equal(200);
            Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
              expect(updatedBook.author).to.equal("Joanne K. Rowling");
              done();
            });
          });
      });

      it("updates book genre by id", (done) => {
        const book = books[0];
        request(app)
          .patch(`/books/${book.id}`)
          .send({ genre: "Children's Fantasy" })
          .then((res) => {
            expect(res.status).to.equal(200);
            Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
              expect(updatedBook.genre).to.equal("Children's Fantasy");
              done();
            });
          });
      });

      it("updates book ISBN by id", (done) => {
        const book = books[0];
        request(app)
          .patch(`/books/${book.id}`)
          .send({ ISBN: "9999999999999" })
          .then((res) => {
            expect(res.status).to.equal(200);
            Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
              expect(updatedBook.ISBN).to.equal("9999999999999");
              done();
            });
          });
      });

      it("returns a 404 if the book does not exist", (done) => {
        request(app)
          .patch("/books/345")
          .send({ title: "Harry Potter" })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal("The book could not be found.");
            done();
          })
          .catch((error) => done(error));
      });
    });

    describe("DELETE /books/:id", () => {
      it("deletes book record by id", (done) => {
        const book = books[0];
        request(app)
          .delete(`/books/${book.id}`)
          .then((res) => {
            expect(res.status).to.equal(204);
            Book.findByPk(book.id, { raw: true }).then((updatedBook) => {
              expect(updatedBook).to.equal(null);
              done();
            });
          })
          .catch((error) => done(error));
      });

      it("returns a 404 if the book does not exist", (done) => {
        request(app)
          .delete("/books/345")
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal("The book could not be found.");
            done();
          })
          .catch((error) => done(error));
      });
    });
  });
});
