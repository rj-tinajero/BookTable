const bookQueries = require("../db/queries.books");

module.exports = {
   index(req, res, next) {
      bookQueries.getAllBooks((err, books) => {
         if(err) {
            res.redirect(500, "static/index");
         } else {
            res.render("admin/books", {books});
         }
      })
   },
   update(req, res, next) {
      bookQueries.updateBook(req, req.body, (err, book) => {
         if(err || book == null) {
            res.redirect(404, "/");
         } else {
            res.redirect("/admin/books")
         }
      })
   },
   destroy(req, res, next) {
      bookQueries.deleteBook(req, req.params.id, (err, book) => {
         if(err) {
            console.log(err, "err in destroy controller thing");
            res.redirect(500, "/");
         } else {
            res.redirect("/admin/books");
         }
      })
   },
   new(req, res, next) { 
      res.render("admin/addBook");
   },
   create(req, res, next) {
      let newItem = {
         title: req.body.title,
         author: req.body.author,
         description: req.body.description,
         genre: req.body.genre,
         price: req.body.price,
         inventory: req.body.inventory
      };
      bookQueries.addItem(newItem, (err, item) => {
         if(err) {
            res.redirect(500, "/admin/addBook")
         } else {
            res.redirect(303, "/admin/books");
         }
      })
   }
}