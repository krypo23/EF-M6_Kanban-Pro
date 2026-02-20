const express = require('express');
const hbs = require('hbs'); 
const app = express();
const port = 3000;

const viewsRoutes = require('./src/routes/views.routes');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: 'layouts' });

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use('/', viewsRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});