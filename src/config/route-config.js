module.exports = {
   init(app) {
      const staticRoutes = require("../routes/static");
      const bookRoutes = require("../routes/books");
      const userRoutes = require("../routes/users");

      if(process.env.NODE_ENV === "test") {
         const mockAuth = require("../../spec/support/mock-auth");
         mockAuth.fakeIt(app);
      }

      app.use(staticRoutes);
      app.use(bookRoutes);
      app.use(userRoutes);
   }
}