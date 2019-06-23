import React from 'react';
import Home from '../components/Home';
const bookQueries = require("../db/queries.books");

module.exports = {
   index(req, res, next) {
      bookQueries.getAllBooks((err, books) => {
         if(err) {
            res.redirect(500, "/");
         } else {
            res.render("admin/books", {books});
         }
      })
   },
   store(req, res, next) {
      bookQueries.getAllBooks((err, books) => {
         if(err) {
            console.log(err, "store controller err");
            res.redirect(500, "/");
         } else {
            res.render("store", {books}, {component: Home});
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