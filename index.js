// code away!
const server = require('./server')
const port = process.env.PORT || 3000
server.listen(port, () => console.log("Listening on port 3000"))

