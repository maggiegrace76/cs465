const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 1. Correctly place static HTML content into the appropriate Express framework folders.
// Set the Express server to serve static files from the 'app-public' folder.
app.use(express.static(path.join(__dirname, 'app-public')));

// Define the default route. Express will automatically look for index.html 
// inside the static folder when this route is hit.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app-public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});