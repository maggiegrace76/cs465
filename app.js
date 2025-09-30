const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const indexRouter = require('./app_server/routes/index');

const app = express();
const port = 3000;

// View engine
app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
  defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Make {{year}} available in templates (optional but tidy)
app.use((req, res, next) => {
  res.locals.year = new Date().getFullYear();
  next();
});

// Serve static files from BOTH potential folders
app.use(express.static(path.join(__dirname, 'app-public')));  // hyphen
app.use(express.static(path.join(__dirname, 'app_public')));  // underscore
// Now /images/... will work no matter which folder name you used.

// Routes
app.use('/', indexRouter);

// Start
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

module.exports = app;
