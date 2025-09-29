/* GET home page */
const homelist = (req, res) => {
    // This renders the 'index.hbs' view
    res.render('index', { title: 'Travlr Getaways' });
};

module.exports = {
    homelist
};