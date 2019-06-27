const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/admin/books";
const base2 = "http://localhost:3000/admin";
const base3 = "http://localhost:3000";
const sequelize = require("../../src/db/models/index").sequelize;
const Book = require("../../src/db/models").Book;

describe("routes : books", () => {
   beforeEach((done) => {
      this.book;
      sequelize.sync({force: true}).then((res) => {

       Book.create({
         title: "Course 101",
         author: "Gracepoint Berkeley",
         description: "Intro course into the foundations of Christianity",
         genre: "Curriculum",
         price: "5.00",
         inventory: 15
       })
        .then((book) => {
          this.book = book;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

      });

    });

  describe("GET /admin/books", () => {

    it("should return a status code 200 and all books", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Course 101");
        done();
      });
    });

  });

  describe("GET /admin/addBooks", () => {
    it("should render the new page for adding items", (done) => {
      request.get(`${base2}/addBook`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Item for Book Table");
        done();
      });
    });
  });

  describe("POST /admin/books/create", () => {
    it("should create a new item and redirect", (done) => {
      const options = {
        url: `${base}/create`,
        form: {
         title: "Course 201",
         author: "Gracepoint Berkeley",
         description: "Course teaching what it means to connect with God",
         genre: "Curriculum",
         price: "3.00",
         inventory: 10
        }
      };
      request.post(options, (err, res, body) => {
        Book.findOne({where: {title: "Course 201"}})
        .then((book) => {
          expect(book).not.toBeNull();
          expect(book.title).toBe("Course 201");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("POST /admin/books/:id/destroy", () => {
    it("should delete the item selected", (done) => {
      expect(this.book.id).toBe(1);
      request.post(`${base}/${this.book.id}/destroy`, (err, res, body) => {
        Book.findById(1)
        .then((book) => {
          expect(err).toBeNull();
          expect(book).toBeNull();
          done();
        });
      });
    });
  });


  describe("POST /admin/books/:id/update", () => {
    it("should update item and redirect", (done) => {
      const options = {
        url: `${base}/${this.book.id}/update`,
        form: {
         title: "Course 301",
         author: "Gracepoint Berkeley",
         description: "Course teaching what it means to live out your faith",
         genre: "Curriculum",
         price: "3.00",
         inventory: 8
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        Book.findOne({
          where: {id: this.book.id}
        })
        .then((book) => {
          expect(book.title).toBe("Course 301");
          done();
        });
      });
    });
  });

  describe("GET /store", () => {
    it("should show a view of the store page", (done) => {
      request.get(`${base3}/store`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Course 101");
        done();
      });
    });
  });
});