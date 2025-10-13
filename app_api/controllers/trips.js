const Trip = require('../../app_server/models/travlr');

// GET /api/trips
exports.list = async (req, res, next) => {
  try {
    const trips = await Trip.find({}).sort({ start: 1 }).lean();
    res.status(200).json(trips);
  } catch (err) { next(err); }
};

// GET /api/trips/:tripId
exports.getOne = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.tripId).lean();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (err) { next(err); }
};

// GET /api/trips/by-code/:code
exports.getByCode = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ code: req.params.code }).lean();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (err) { next(err); }
};
