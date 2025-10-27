const Trip = require('../../app_server/models/travlr');

// LIST: GET /api/trips
exports.list = async (req, res, next) => {
  try {
    const trips = await Trip.find({}).sort({ start: 1 }).lean();
    res.status(200).json(trips);
  } catch (err) { next(err); }
};

// READ (by Mongo _id): GET /api/trips/:tripId
exports.getOne = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.tripId).lean();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (err) { next(err); }
};

// READ (by business code): GET /api/trips/:tripCode  OR  /api/trips/by-code/:code
exports.getByCode = async (req, res, next) => {
  try {
    const code = req.params.code || req.params.tripCode;
    const trip = await Trip.findOne({ code }).lean();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (err) { next(err); }
};

// CREATE: POST /api/trips
exports.create = async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (body.length !== undefined) {
      const n = Number(body.length); if (!Number.isNaN(n)) body.length = n;
    }
    if (body.perPerson !== undefined) {
      const p = Number(body.perPerson); if (!Number.isNaN(p)) body.perPerson = p;
    }
    if (body.start) body.start = new Date(body.start);

    const trip = await Trip.create({
      code: body.code,
      name: body.name,
      length: body.length,
      start: body.start,
      resort: body.resort,
      perPerson: body.perPerson,
      image: body.image,
      description: body.description
    });

    res.status(201).json(trip);
  } catch (err) {
    if (err && err.code === 11000) return res.status(409).json({ message: 'Trip code already exists' });
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    next(err);
  }
};

// UPDATE (by code): PUT /api/trips/:tripCode
exports.updateByCode = async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (body.length !== undefined) {
      const n = Number(body.length); if (!Number.isNaN(n)) body.length = n;
    }
    if (body.perPerson !== undefined) {
      const p = Number(body.perPerson); if (!Number.isNaN(p)) body.perPerson = p;
    }
    if (body.start) body.start = new Date(body.start);

    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      body,
      { new: true, runValidators: true }
    ).lean();

    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    next(err);
  }
};

// DELETE (by code): DELETE /api/trips/:tripCode
exports.removeByCode = async (req, res, next) => {
  try {
    const result = await Trip.findOneAndDelete({ code: req.params.tripCode });
    if (!result) return res.status(404).json({ message: 'Trip not found' });
    res.status(204).end();
  } catch (err) { next(err); }
};
