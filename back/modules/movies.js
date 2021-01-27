const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();
const db = require ('../model/db');
ObjectID = require('mongodb').ObjectID;
const APIKEY = process.env.APIKEY;

exports.getLogin = (req, res) => {
    res.render('login')
}
exports.getDashboard = (req, res) => {
    res.render('dashboard')
}
exports.getSearch = (req, res) => {
    res.render('search')
}
exports.getFilm = (req,res) => {
    fetch(`http://www.omdbapi.com/?s=${req.body.pelicula}&apikey=${APIKEY}`)
    .then(peli => peli.json())
    .then(data => {
        if(data.Response=="False"){
            res.render('search', {Nofound: "Película no encontrada"});
        } else {
            res.render('search', {Resultados: data.Search, Longitud: data.Search.length})
        }
    })
    .catch(error => console.log(error))
};
exports.getDetails = (req, res) => {
    let id = req.params.imbd;
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=${process.env.APIKEY}`)
    .then(peli => peli.json())
    .then(data => { 
        if(data.Response=="False"){
            res.render('searchdetails', {Nofound: "Película no encontrada"});
        } else {
            res.render('searchdetails', {Details: data})
        }
    })
    .catch(error => console.log(error))
}
exports.getMovies = async (req, res) => {
    let movies = await db.readMovies();
    let id = [];
    movies.forEach((element,index) => {
        id[index] = new ObjectID(element._id);
    });
    res.render('movies', {Resultados: movies, Longitud: movies.length, identificador:id})
}
exports.editMovie = async (req, res) => {
    let id = req.params.id;
    let movies = await db.readOneMovie(id);
    res.render('editmovie', {Resultados: movies, identificador: id})
}
exports.updateMovie = async (req, res) => {
    let id2 = req.params.id;
    let actualizador = {
        "titulo": req.body.titulo,
        "genero": req.body.genero,
        "duracion": req.body.duracion,
        "ano": req.body.ano,
        "director": req.body.director
    }
    let save = await db.actualizarOneMovies(id2, actualizador);
    res.redirect('/movies?Actualizada');
}
exports.createMovie = async (req, res) => {
    res.render('createmovie')
}