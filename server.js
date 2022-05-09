const express = require('express')

const server = express()

server.all("/", (req, res) => {
  res.send("Server Status: Online (200)")
})

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is online. (200)")
  })
}

module.exports = keepAlive