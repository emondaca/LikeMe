const { Pool } = require('pg')
const pool = new Pool({   
    host: 'localhost',
    user: 'postgres',
    password: '@EMmc1890',
    database: 'likeme',
    port: 5433,
    allowExitOnIdle: true
    })
    
const getPosts = async () => {
    const consulta = "SELECT * FROM posts";
    const { rows } = await pool.query(consulta);
    return rows;
};

const agregarPosts = async (req, res) => {
    const insertar = 'INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, 0 )'
    const values = [req.body.titulo, req.body.url, req.body.descripcion];
    await pool.query(insertar, values);
    return "Agregado";
};

const borrarPost = async (req, res) => {
    const id = [req.params.id];
    const consulta = "DELETE FROM posts WHERE id = $1";
    await pool.query(consulta, id);
    return "Borrado";
};

const addLike = async (req, res) => {
    const id = [req.params.id];
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
    await pool.query(consulta, id);
    return "Listo";

};


module.exports = { getPosts, agregarPosts, borrarPost, addLike }