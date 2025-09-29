const fs = require('fs');
// Load the trips data from the JSON file
const trips = JSON.parse(fs.readFileSync('./app_server/data/trips.json', 'utf8'));

/* GET home page */
const homelist = (req, res) => {
    res.render('index', { title: 'Travlr Getaways - Home' });
};

/* GET travel list page */
const travelList = (req, res) => {
    res.render('travel', {
        title: 'Travlr Getaways - Packages',
        // Pass the JSON data array to the 'travel.hbs' template
        trips: trips
    });
};

/* GET rooms list page */
const roomList = (req, res) => {
    res.render('rooms', { title: 'Travlr Getaways - Rooms' });
};

module.exports = {
    homelist,
    travelList,
    roomList
};