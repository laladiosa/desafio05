const express = require('express');
const productosRouter = require('./routes');
const Contenedor = require('./service/Contenedor');
const app = express();
const c = new Contenedor()

app.set("views", "./views")
app.set("view engine", "ejs")
app.engine('ejs', require('ejs').__express);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', productosRouter);

app.get("/", (req, res) => {
    res.render("form")
})

app.get('/productos/vista', (req, res) => {
    const data = c.getAll()
    res.render("table", data.length !== 0 ? { productos: data } : { error: 'no hay productos cargados' })
})


// app.use('/static', express.static('public'))

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto 8080 http://localhost:${PORT}`)
}).on('error', (err) => console.log(err))