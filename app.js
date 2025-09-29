const express = require('express');
const path = require('path');                // Core Node.js module for paths
const exphbs = require('express-handlebars');

const indexRouter = require('./app_server/routes/index'); // Main router

const app = express();
const port = 3000;

// 1. Set up Handlebars view engine
app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
  defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// 2. Serve static files (CSS, images, JS) from app-public
// Use absolute path to avoid issues with relative dirs
app.use('/', express.static(path.join(__dirname, 'app-public')));

// 3. Register the router for application routes
app.use('/', indexRouter);

// 4. Start the server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

module.exports = app;
