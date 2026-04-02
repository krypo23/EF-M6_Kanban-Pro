const express = require('express');

const app = express();
const port = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
app.use(express.static(path.join(__dirname, 'public')));

const viewsRoutes = require('./src/routes/views.routes');
const authRoutes = require('./src/routes/auth.routes');
const tablerosRoutes = require('./src/routes/tableros.routes');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: 'layouts' });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/', viewsRoutes);
app.use('/api/tableros', tablerosRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});