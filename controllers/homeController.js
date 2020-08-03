const debug = require('debug')('app:homeController');
const axios = require('axios');

// Helpers
const utils = require('../helpers/utils');

// Quantity of cities with highest increase percentage
const TOP = 10;
// My name
const MeuNome = 'Luiz Alexandre Wendel Balbino';

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

      // Get top cities with highest increase percentage cases
      const topCities = utils.getTop(startList, endList, TOP);

      let responseList = [];

      // for each city make a post
      for (let i = 0; i < topCities.length; i++) {
        const { id, nomeCidade, percentualDeCasos } = topCities[i];

        const responsePost = await axios.post(
          'https://us-central1-lms-nuvem-mestra.cloudfunctions.net/testApi',
          {
            id,
            nomeCidade,
            percentualDeCasos,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              MeuNome,
            },
          }
        );
        responseList.push(responsePost.data);
      }

      return res.json({
        data: responseList,
      });
    } catch (error) {
      debug(error);
      return res.json(error);
    }
  },
};

module.exports = homeController;
