var http = require("http");
const createError = require("http-errors"),
  express = require("express"),
  path = require("path"),
  fs = require("fs"),
  cookieParser = require("cookie-parser"),
  cors = require("cors"),
  crypto = require("crypto"),
  logger = require("morgan"),
  passport = require("passport"),
  session = require("express-session");
  
  require('./database.js');

require("./auth.js")(passport);

const app = express();
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "123",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());





var server = http.createServer(app);
var io = require("socket.io")(server);
server.listen(80);
var ultimas_mensagens = [];

function armazenaMensagem(mensagem){
     if(ultimas_mensagens.length > 6){
         ultimas_mensagens.shift();
     }

     ultimas_mensagens.push(mensagem);
}





io.on("connection", function (socket) {





  socket.on("user chat", function (username) {
    io.emit("chat server", username + " se conectou a sala.");
    for(indice in ultimas_mensagens){
      socket.emit("chat message", ultimas_mensagens[indice]);
 }
    socket.on("disconnect", function () {
      io.emit("chat server", username + " se desconectou da sala.");
    });
  });

  socket.on("chat message", function (msg) {


    //log de mensagens




    const content = `\n IP:${socket.handshake.address} \n ${msg}`;

    fs.appendFile("chatlog.txt", content, (err) => {
      if (err) {
        console.error(err);
      }
      // done!
    });

    
    const photo = '/src/img/photo.jpg'
    
      io.emit("chat message", msg);
    

    armazenaMensagem(msg);

  });
});

require("./routes")(app);

module.exports = app;
