const fs = require('fs');

// Load trips once at server start
const trips = JSON.parse(fs.readFileSync('./app_server/data/trips.json', 'utf8'));

/* GET home page (show a few “featured” trips) */
const homelist = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways - Home',
    trips: trips.slice(0, 3) // show 3 featured on Home
  });
};

/* GET travel list page (show ALL trips) */
const travelList = (req, res) => {
  res.render('travel', {
    title: 'Travlr Getaways - Packages',
    trips
  });
};

/* GET rooms list page (static for now) */
const roomList = (req, res) => {
  res.render('rooms', { title: 'Travlr Getaways - Rooms' });
};

module.exports = { homelist, travelList, roomList };
