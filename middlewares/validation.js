const validation = (req, res, next) => {
  const { state, dateStart, dateEnd } = req.query;

  if (!state) return res.status(400).json({ error: 'State not defined!' });

  if (!state.match(/^[A-Z]{2}$/g))
    return res.status(400).json({ error: 'Invalid state!' });

  if (!dateStart || !dateEnd)
    return res.status(400).json({
      error:
        'Date interval not defined! Make sure to set both DateStart and DateEnd!',
    });

  if (new Date(dateEnd) < new Date(dateStart))
    return res.status(400).json({
      error: 'DateEnd must be greater than dateStart!',
    });

  next();
};

module.exports = validation;
