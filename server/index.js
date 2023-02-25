const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "box_tracker"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/getProducts', (req, res) => {
    const sqlGet = "SELECT * FROM productos;"
    db.query(sqlGet, (err, result) => {
        res.send(result)
    })
})

app.get('/api/getCategorys', (req, res) => {
    const sqlGet = "SELECT * FROM categorias;";
    db.query(sqlGet, (err, result)=>{
        res.send(result);
    })
})

app.get('/api/get/:id_categoria/:fecha_inicio/:fecha_fin', (req, res) => {
    const fecha_inicio = req.params.fecha_inicio;
    const fecha_fin = req.params.fecha_fin;
    const id_categoria = req.params.id_categoria;
    const sqlGetStats = "SELECT p.nombre, MAX(p.precio)mayor_precio, MAX(p.stock)mayor_stock FROM productos as p where p.id_categoria = ? and p.fecha_ingreso >= ? and p.fecha_ingreso <= ? GROUP BY p.nombre ORDER BY mayor_precio desc;"

    db.query(sqlGetStats, [id_categoria, fecha_inicio, fecha_fin], (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.post('/api/addProduct', (req, res) => {

    const id_categoria = req.body.id_categoria;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const fecha_ingreso = req.body.fecha_ingreso
    const stock = req.body.stock;

    const sqlAdd = "INSERT INTO productos (id_categoria, nombre, precio, fecha_ingreso, stock) VALUES (?, ?, ?, ?, ?);"
    db.query(sqlAdd, [id_categoria, nombre, precio, fecha_ingreso, stock], (err, result) => {
        if (err) {
            console.log(err);
        }
    })
})

app.listen(8000, () => {
    console.log("connected on port 8000");
})