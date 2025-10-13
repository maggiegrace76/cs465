const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const indexRouter = require('./app_server/routes/index');
require('./app_server/models/db');
const api = require('./app_api/app');

const app = express();
const port = process.env.PORT || 3000;

app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
  defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

app.use((req, res, next) => {
  res.locals.year = new Date().getFullYear();
  next();
});

app.use(express.static(path.join(__dirname, 'app-public')));
app.use(express.static(path.join(__dirname, 'app_public')));

app.use('/', indexRouter);
app.use('/api', api);
app.use('/API', api);

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

module.exports = app;






