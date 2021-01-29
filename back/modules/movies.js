const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();

const db = require ('../model/db');
ObjectID = require('mongodb').ObjectID;
const APIKEY = process.env.APIKEY;

exports.getLogin = (req, res) => {
    res.status(200).render('login') // Aquí habría que hacer todo el post de ver si el formulario está bien
exports.getDashboard = (req, res) => {
    res.status(200).render('dashboard')
}
exports.getSearch = (req, res) => {
    res.status(200).render('search');
}
exports.getFilm = (req,res) => {
    let pelicula = req.body.pelicula;
    let check = null;
    let resultado = [];
    fetch(`http://www.omdbapi.com/?s=${pelicula}&apikey=${APIKEY}`)
    .then(peli => peli.json())
    .then(async data => {
        if(data.Response=="False"){ // Si no hay nada en la API
            let movies = await db.readMovies();
            for (let i=0;i<movies.length;i++){
                if (pelicula===movies[i].Title){
                    check = i;
                    resultado.push(movies[i])
                }
            }
            if (check!= null){
                console.log(movies[check])
                res.render('search', {Resultados: resultado, Longitud: 1})
            } else {
                res.render('search', {Nofound: "Película no encontrada"});
            }
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
        "Title": req.body.titulo,
        "Genre": req.body.genero,
        "Runtime": req.body.duracion,
        "Year": req.body.ano,
        "Director": req.body.director
    }
    let save = await db.actualizarOneMovies(id2, actualizador);
    res.redirect('/movies?Actualizada');
}
exports.formcreateMovie = async (req, res) => {
    res.render('createmovie')
}
exports.createMovie = async (req, res) => {
    
    
}
exports.deleteMovie = async (req, res) => {
   
}