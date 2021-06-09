import express, { Request, Response } from 'express'
import { connectDatabase } from './database/connection';
import { setRoutes } from './routes';

connectDatabase('mongodb+srv://shangou:pao123@cluster0.9k9ra.mongodb.net')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs');

app.use('/static', express.static('public'));

var chokidar = require('chokidar')
var watcher = chokidar.watch('.')
watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing /dist/ module cache from server")
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
    })
  })
})

setRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
