const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost', 
    user:'root', 
    password: '', 
    connectionLimit: 5,
    database: 'movies'});

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