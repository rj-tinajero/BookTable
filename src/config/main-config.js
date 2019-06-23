/** @jsx React.DOM */
require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const logger = require('morgan');
const bodyParser = require("body-parser");
const passportConfig = require("./passport-config");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const React = require("react");
const ReactDOMServer = require("react-router-dom/server");
const StaticRouter = require("react-router.StaticRouter");
const App = require("../components/App");
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import { StaticRouter } from 'react-router';
// import App from '../components/App';

module.exports = {
   init(app, express) {
      app.set("views", viewsFolder);
      app.set("view engine", "ejs");
      app.get('*', (req, res) => {
         const context = {};
         res.render('layout', {
            content: ReactDOMServer.renderToString(
               <StaticRouter location={req.url} context={context}>
                  <App/>
               </StaticRouter>
            )
         });
      });
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(expressValidator());
      app.use(session({
         secret: "lalala",
         resave: false,
         saveUninitialized: false,
         cookie: { maxAge: 1.21e+9 }
      }));
      app.use(flash());
      passportConfig.init(app);
      app.use((req, res, next) => {
         res.locals.currentUser = req.user;
         next();
      });
      app.use(express.static(path.join(__dirname, "..", "assets")));
      app.use(logger('dev'));
   }
};