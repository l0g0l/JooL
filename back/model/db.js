const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
ObjectID = require('mongodb').ObjectID;
async function conexion(){
    const client = await MongoClient(url,{ useUnifiedTopology: true });
    
    client
    .connect()
    .then(()=>console.log("Ha funcionado! Estamos conectados!"))
    .catch (e => console.log(e));
    return client
}
exports.readMovies  = async () => {
    const client = await conexion();
    const result = await client
    .db("moviedb")
    .collection("catalogo")
    .find()
    .toArray()
    return result;
}
exports.readOneMovie  = async (id) => {
    let id2 = new ObjectID(id);
    const client = await conexion ();
    const result = await client
    .db("moviedb")
    .collection("catalogo")
    .find({ _id: id2})
    .toArray()
    return result;
}
exports.actualizarOneMovies = async (id, actualizador) => {
    let id2 = new ObjectID(id);
    const client = await conexion ();
    const result = await client
    .db("moviedb")
    .collection("catalogo")
    .updateOne({ _id: id2 }, { $set: actualizador });
    return result
}
exports.eliminarMovie = async (id) => {
    let id2 = new ObjectID(id);
    const client = await conexion ();
    const result = await client
    .db("moviedb")
    .collection("catalogo")
    .deleteOne({ _id : id2});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}