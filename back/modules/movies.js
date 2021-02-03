const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();

const db = require('../model/db');
ObjectID = require('mongodb').ObjectID;
const APIKEY = process.env.APIKEY;

exports.getLogin = (req, res) => {
    res.status(200).render('login') // Aquí habría que hacer todo el post de ver si el formulario está bien
}
exports.getDashboard = (req, res) => {
    res.status(200).render('dashboard')
}
exports.getSearch = (req, res) => {
    res.status(200).render('search');
}
exports.getFilm = (req, res) => {
    let pelicula = req.body.pelicula;
    let check = null;
    let resultado = [];
    fetch(`http://www.omdbapi.com/?s=${pelicula}&apikey=${APIKEY}`)
    .then(peli => peli.json())
    .then(async data => {
        if(data.Response=="False"){ // Si no hay nada en la API
            let movies = await db.readMovies();
            for (let i=0; i<movies.length; i++){
                if (pelicula.toLowerCase()===movies[i].Title.toLowerCase()){
                    check = i;
                    resultado.push(movies[i])
                }
            }
            if (check!= null){
                console.log(resultado)
                res.status(200).render('search', {Resultados: resultado, Longitud: 1})
            } else {
                res.status(200).render('search', {Nofound: "Película no encontrada"});
            }
        } else {
            res.status(200).render('search', {Resultados: data.Search, Longitud: data.Search.length})
        }
    })
    .catch(error => console.log(error))
};
exports.getDetails = async (req, res) => {
    let id = req.params.imbd;
    if (id.length<15){
        fetch(`http://www.omdbapi.com/?i=${id}&apikey=${process.env.APIKEY}`)
        .then(peli => peli.json())
        .then(data => { 
            if(data.Response=="False"){
                res.status(200).render('searchdetails', {Nofound: "Película no encontrada"});
            } else {
                res.status(200).render('searchdetails', {Details: data})
            }
        })
        .catch(error => console.log(error))
    } else {
        let movies = await db.readOneMovie(id);
        console.log(movies)
        res.status(200).render('searchdetails', {Details: movies[0]})
    }
}
exports.getMovies = async (req, res) => {
    let movies = await db.readMovies();
    let id = [];
    movies.forEach((element, index) => {
        id[index] = new ObjectID(element._id);
    });

    res.status(200).render('movies', {Resultados: movies, Longitud: movies.length, identificador:id})
}
exports.editMovie = async (req, res) => {
    let id = req.params.id;
    let movies = await db.readOneMovie(id);
    res.status(200).render('editmovie', {Resultados: movies, identificador: id})
}
exports.updateMovie = async (req, res) => {
    let id2 = req.params.id;
    let actualizador = {
        "Title": req.body.titulo,
        "Year": req.body.year,
        "Director":req.body.director,
        "Genre": req.body.genero,
        "Runtime": req.body.duracion,
        "Writer": req.body.escritor,
        "Actors": req.body.actores,
        "Plot": req.body.resumen,
        "Awards": req.body.premios
    }
    let save = await db.actualizarOneMovies(id2, actualizador);
    res.status(200).redirect('/movies?Actualizada');
}
exports.formcreateMovie = async (req, res) => {
    res.status(200).render('createmovie')
}
exports.createMovie = async (req, res) => {
    let creador = {
        "Title": req.body.titulo,
        "Year": req.body.year,
        "Director": req.body.director,
        "Genre": req.body.genero,
        "Runtime": req.body.duracion,
        "Writer": req.body.escritor,
        "Actors": req.body.actores,
        "Plot": req.body.resumen,
        "Awards": req.body.premios,
        "Poster": req.body.imagen,
    }
    let pelicula = req.body.titulo;
    fetch(`http://www.omdbapi.com/?s=${pelicula}&apikey=${APIKEY}`)
    .then(peli => peli.json())
    .then(async data => {
        if(data.Response=="False"){ // Si no hay nada en la API
            let movies = await db.readMovies();
            for (let i=0; i<movies.length; i++){
                if (pelicula.toLowerCase()===movies[i].Title.toLowerCase()){
                    res.status(200).render('createmovie', {value: `La película ${pelicula} ya existe en la Base de Datos de MongoDB`})
                }
            } 
            let save = await db.crearOneMovies(creador);
            res.status(200).render('createmovie', {value: `La película ${pelicula} ha sido añadida`})}
            else {
            res.status(200).render('createmovie', {value: `La película ${pelicula} ya existe en la API`})
            }
    })
    .catch(error => console.log(error))
};
exports.deleteMovie = async (req, res) => {
    let id2 = req.params.id;
    let eliminar = await db.eliminarMovie(id2);
    res.status(200).redirect('/movies?Borrada');
}
