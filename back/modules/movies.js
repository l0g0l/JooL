const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();

exports.getLogin = (req, res) => {
    res.render('login') // Aquí habría que hacer todo el post de ver si el formulario está bien
}
exports.getDashboard = (req, res) => {
    res.render('dashboard')
}
exports.getSearch = (req, res) => {
    res.render('search')
}
exports.getFilm = (req,res) => {
    fetch(`http://www.omdbapi.com/?s=${req.body.pelicula}&apikey=${process.env.APIKEY}`)
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
