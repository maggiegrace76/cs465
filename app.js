const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); 
const indexRouter = require('./app_server/routes/index'); 

const app = express();
const port = 3000;

// 2. Set up Handlebars view engine
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'), 
    extname: '.hbs' 
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// 3. Serve static files (CSS, images, JS) from app-public
app.use(express.static(path.join(__dirname, 'app-public')));

// 4. Register the new router for application routes (THIS REPLACES the old res.sendFile!)
app.use('/', indexRouter);

// Start the server
app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});