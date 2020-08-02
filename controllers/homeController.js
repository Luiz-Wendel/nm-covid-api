const debug = require('debug')('app:homeController');
const axios = require('axios');

// Helpers
const utils = require('../helpers/utils');

const homeController = {
  index: async (req, res) => {
    // Extract date interval and state from query
    const { state, dateStart, dateEnd } = req.query;

    try {
      // Retrieve date start data
      const responseStart = await axios.get(
        `https://brasil.io/api/dataset/covid19/caso/data/?state=${state}&date=${dateStart}`
      );

      // Retrieve date end data
      const responseEnd = await axios.get(
        `https://brasil.io/api/dataset/covid19/caso/data/?state=${state}&date=${dateEnd}`
      );

      const startList = responseStart.data.results;
      const endList = responseEnd.data.results;

      const refinedStartList = utils.getRefinedList(startList);
      const refinedEndList = utils.getRefinedList(endList);

      const list = utils.getIncreasePercentageList(
        refinedStartList,
        refinedEndList
      );

      //TODO: POST top 10 cities

      return res.json(`OK`);
    } catch (error) {
      debug(error);
      return res.json(error);
    }
  },
};

module.exports = homeController;
