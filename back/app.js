const express = require ('express');
const app = express();
const movies = require ('./modules/movies') // Para poder usar movies.js
const port = 3000;
app.use (express.static('public')); // Hacemos public que se pueda ver

let bodyParser = require('body-parser'); // Para poder acceder a lo de .body
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'pug'); // Para poder usar pug
app.set('views','./views_pug'); // Para poder usar pug

app.get('/', movies.getLogin);
app.post('/dashboard', movies.getDashboard);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })