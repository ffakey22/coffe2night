var http = require("http");
const createError = require("http-errors"),
  express = require("express"),
  path = require("path"),
  fs = require("fs"),
  cookieParser = require("cookie-parser"),
  cors = require("cors"),
  crypto = require("crypto");
const app = express();
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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


  socket.on("ondb", function (number) {
  let database = JSON.parse(fs.readFileSync("./public/src/js/dbacess.json", "utf8"));

  database = {
    dba: number
  }



    fs.writeFile("./public/src/js/dbacess.json", JSON.stringify(database), (x) => {
      if (x) console.error(x)
    });


  })


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
