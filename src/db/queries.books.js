const Book = require("./models").Book;

module.exports = {
   getAllBooks(callback) {
      return Book.all()
      .then((books) => {
         callback(null, books);
      })
      .catch((err) => {
         console.log(err, "err in query thing i added here");
         callback(err);
      })
   },
   updateBook(req, updatedBook, callback) {
      return Book.findById(req.params.id)
      .then((book) => { 
         book.update(updatedBook, {
            fields: Object.keys(updatedBook)
         })
         .then(() => {
            callback(null, book);
         })
         .catch((err) => {
            console.log(err, "updateBook err here");
            callback(err);
         });
      });
   },
   deleteBook(req, id, callback) {
      return Book.findById(req.params.id)
      .then((book) => {
         book.destroy()
         .then((res) => {
            callback(null, book);
         });
      })
      .catch((err) => {
         console.log(err);
         callback(err);
      });
   },
   addItem(newItem, callback) {
      return Book.create(newItem)
      .then((book) => {
         callback(null, book);
      })
      .catch((err) => {
         console.log(err, "err in addItem query func")
         callback(err);
      })
   }

}