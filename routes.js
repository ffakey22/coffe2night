const { application } = require("express");
const indexRouter = require("./routes/index.js"),
  clientRouter = require("./routes/clientarea.js"),
  nFoundRouter = require("./routes/404.js"),
  fLoginRouter = require("./routes/403login.js"),
  registerRouter = require("./routes/registro.js"),
  chatRouter = require("./routes/chat.js"),
  logoutRouter = require("./routes/logout.js"),
  getUsersRouter = require("./apiRoutes/getDb.js"),
  getSessionRouter = require("./routes/getsession.js");

module.exports = (app) => {
  //USER ROUTES ->
  app.use("/", indexRouter);
  app.use("/home", clientRouter);
  app.use("/404", nFoundRouter);
  app.use("/registro", registerRouter);
  app.use("/chat", chatRouter);
  app.use("/logout", logoutRouter)

//API ROUTES ->

app.use("/getdb", getUsersRouter)
app.use("/getsession", getSessionRouter)



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
