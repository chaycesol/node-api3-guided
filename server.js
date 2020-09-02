const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const hubsRouter = require("./hubs/hubs-router.js");
const toss = require("./random/toss.js");

const server = express();
// global middleware
server.use(express.json()); // built-in middleware
server.use(helmet()); // third pary mw, needs to be installed from npm
server.use(logger());
server.use(toss);
server.use("/api/hubs", gate('mellon'), hubsRouter);
server.get("/", (req, res) => {
    const nameInsert = req.name ? ` ${req.name}` : "";
    res.status(200).json({ hello: "world", coin: req.coin});
});

// add endpoint for /toss that returns randomly true or false
// heads == true, tails == false
// add code for to determine the result to a middleware. 
//this endpoing works

server.get('/toss', (req,res) =>{
  res.status(200).json({toss: req.coin})
})

// function toss(){
//     const coin = Math.floor(Math.random() * 2);
//     console.log(coin);
//     if (coin == 0) {
//       return "Heads";
//     } else {
//       return "Tails";
//     }
//     next();
// }

// console.log(toss());

// function gate(req, res, next) {
//   if (req.password === 'mellon') {
//     res.status(200).json({message: "authenticated"})
//     next ()
//   } else {
//     res.status(500).json({error: "incorect password"})
//   }
// }

function gate(password) {
  return function (req, res, next) {
    req.headers.password === password ? next() : res.status(401).json({ error: 'incorrect password' })
  }
}
//use higher order function (function within function) if you are going to invoke at server.use level
function logger() {
  return function (req, res, next) {
    console.log(`a ${req.method} request was made to ${req.url}`);
    next();
  }
}

module.exports = server;