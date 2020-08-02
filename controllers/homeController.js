const debug = require('debug')('app:homeController');
const axios = require('axios');

const homeController = {
  index: async (req, res) => {
    // Extract date interval and state from query
    const { state, dateStart, dateEnd } = req.query;

    try {
      if (!state) return res.status(400).json({ error: 'State not defined!' });

      if (!dateStart || !dateEnd)
        return res.status(400).json({
          error:
            'Date interval not defined! Make sure to set both DateStart and DateEnd!',
        });

      const responseStart = await axios.get(
        `https://brasil.io/api/dataset/covid19/caso/data/?state=${state}&date=${dateStart}`
      );

      const responseEnd = await axios.get(
        `https://brasil.io/api/dataset/covid19/caso/data/?state=${state}&date=${dateEnd}`
      );

      const startList = responseStart.data.results;
      const endList = responseEnd.data.results;

      return res.json(
        `${JSON.stringify(startList)}\n\n\n${JSON.stringify(endList)}`
      );
    } catch (error) {
      debug(error);
      return res.json(error);
    }
  },
};

module.exports = homeController;
