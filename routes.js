const { application } = require("express");
const passport = require("passport");
const { appDistributionOrigin } = require("firebase-tools/lib/api.js");
const indexRouter = require("./routes/index.js"),
  clientRouter = require("./routes/clientarea.js"),
  nFoundRouter = require("./routes/404.js"),
  fLoginRouter = require("./routes/403login.js"),
  registerRouter = require("./routes/registro.js"),
  chatRouter = require("./routes/chat.js"),
  logoutRouter = require("./routes/logout.js"),
  mexistsRouter = require("./routes/emailexists.js"),
  rsucessRouter = require("./routes/rsucess.js");

  function authenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login?fail=true');
  }

module.exports = (app) => {
  //USER ROUTES ->
  app.use("/",indexRouter);
  app.use("/home",authenticationMiddleware, clientRouter);
  app.use("/404", nFoundRouter);
  app.use("/register", registerRouter);
  app.use("/chat",authenticationMiddleware, chatRouter);
  app.use("/logout", logoutRouter);
  app.use("/exists", mexistsRouter);
  app.use("/rsucess", rsucessRouter)

  //ERROR ROUTES ->

  app.use("/errorlogin", fLoginRouter); //Caso o login não de certo (senha invalida,usuario inexistente ou caso você tente acessar uma pagina de usuario sem estar logado)

  app.get("*", function (req, res) {
    if (res.status(404)) {
      res.statusCode = 302;
      res.setHeader("Location", "/404");
      res.end();
    }
  });

};
