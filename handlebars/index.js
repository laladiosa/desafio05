const express = require('express');
const productosRouter = require('./routes');
const { engine } = require('express-handlebars');
const Contenedor = require('./service/Contenedor');
const app = express();
const c = new Contenedor()
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', productosRouter);

app.engine("hbs", engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/"
}))
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('form.hbs', {
        title: 'Agregar nuevo producto',
        formUrl: 'http://localhost:8080/api/productos'
    })
})
app.get('/productos/vista', (req, res) => {
    const data = c.getAll()
    res.render("table", data.length !== 0 ? { productos: data } : { error: 'no hay productos cargados' })
})


// app.use('/static', express.static('public'))

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto 8080 http://localhost:${PORT}`)
}).on('error', (err) => console.log(err))