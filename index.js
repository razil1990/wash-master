const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const homeRoutes = require('./routes/home')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const app = express()

const PORT = process.env.PORT || 3000
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs' 
})


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
 
app.use(session({ cookie: { maxAge: 60000 }, 
  secret: '',
  resave: false, 
  saveUninitialized: false}))
app.use(flash())
app.use(helmet())
app.use(express.json())
app.use('/', homeRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
 