const mariadb = require('mariadb');
// const pool = mariadb.createPool({
//     host: 'localhost', 
//     user:'root', 
//     password: '', 
//     connectionLimit: 5,
//     database: 'movies'});

    // Datos para la conexion
const pool = mariadb.createPool({
  host: 'db4free.net', 
  user: 'root', 
  password:'',
  connectionLimit: 5,
  database:'movies'
});

exports.autenticar = async(email,password) => {
    let conn;
        try {
          conn = await pool.getConnection(); // Conexión a la base de datos
          let res = await conn.query("SELECT * from movies.users");
          return res;
        } catch (err) {
            return null;
        } finally { // Tanto si se ejecuta el try como el catch, se ejecuta el finally, siempre se ejecuta
          if (conn) conn.end();
        }
  }
  exports.leerFavorito = async (idSQL,email) => {
    let conn;
    try {
      conn = await pool.getConnection(); // Conexión a la base de datos
      let query = `SELECT * FROM movies.userfilm WHERE fuente_datos = ? AND users_ID = (SELECT ID FROM movies.users WHERE email =?)`;
      const data = [idSQL, email];
      let res = await conn.query(query,data);      
      return res;
    } catch (err) {
      console.log(err);
      
        return null;
    } finally { // Tanto si se ejecuta el try como el catch, se ejecuta el finally, siempre se ejecuta
      if (conn) conn.end();
    }
  }
exports.insertFavorito = async (idSQL,email) => {
    let conn;
      try {
        console.log(email)
        console.log(idSQL)
      conn = await pool.getConnection(); // Conexión a la base de datos
      const query = "INSERT INTO movies.userfilm (users_ID, fuente_datos) VALUES ((SELECT ID FROM movies.users WHERE email =?),?)";
      const data = [email, idSQL];
      const res = await conn.query(query,data);
      return res;

      } catch (err) {
        console.log(err);
        
        return null;
      } finally {
      if (conn) return conn.end();
      }
}
exports.deleteFavorito = async (idSQL,email) => {
  let conn;
    try {
      console.log(email)
      console.log(idSQL)
    conn = await pool.getConnection(); // Conexión a la base de datos
    const query = "DELETE FROM movies.userfilm where users_ID=(SELECT ID FROM movies.users WHERE email =?) AND fuente_datos=?"
    const data = [email, idSQL];
    const res = await conn.query(query,data);
    return res;

    } catch (err) {
          console.log(err)
          return null;
    } finally {
          if (conn) return conn.end();
    }
}
exports.leerPerfil = async (idUser) => {
  let conn;
  try {
    conn = await pool.getConnection(); // Conexión a la base de datos
    let res = await conn.query("SELECT movies.users.rol FROM movies.users WHERE movies.users.ID=?",[idUser]);
   // console.log(res)
    return res;
  } catch (err) {
      return null;
  } finally { // Tanto si se ejecuta el try como el catch, se ejecuta el finally, siempre se ejecuta
    if (conn) conn.end();
  }
}
exports.leerPelis = async (idUser) => {
  let conn;
  try {
    conn = await pool.getConnection(); // Conexión a la base de datos
    let res = await conn.query("SELECT movies.userfilm.fuente_datos FROM movies.userfilm INNER JOIN movies.users ON movies.userfilm.users_ID=movies.users.ID WHERE movies.userfilm.users_ID=?",[idUser]);
   // console.log(res)
    return res;
  } catch (err) {
      return null;
  } finally { // Tanto si se ejecuta el try como el catch, se ejecuta el finally, siempre se ejecuta
    if (conn) conn.end();
  }
}