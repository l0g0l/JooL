const express = require ('express');
const app = express();
const movies = require ('./modules/movies') // Para poder usar movies.js
let methodOverride = require("method-override");
app.use(methodOverride("_method"));
const port = 3000;

app.use (express.static('public')); // Hacemos public que se pueda ver
 // console.log(process.env.APIKEY) Para acceder a la apiKey hay que poner process.env.NOMBREVARIABLE

let bodyParser = require('body-parser'); // Para poder acceder a lo de .body
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'pug'); // Para poder usar pug
app.set('views','./views_pug'); // Para poder usar pug

app.get('/', movies.getLogin);
app.get('/search', movies.getSearch);
app.post('/dashboard', movies.getDashboard);
app.post('/search', urlencodedParser, movies.getFilm);
app.get('/searchdetails/:imbd', movies.getDetails);
app.get('/movies', movies.getMovies);
app.get('/editmovie/:id', movies.editMovie);
app.put('/editmovie/:id', urlencodedParser, movies.updateMovie);
app.get('/createmovie', urlencodedParser, movies.createMovie);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })