const debug = require('debug')('app:homeController');
const axios = require('axios');

const homeController = {
  index: async (req, res) => {
    try {
      const response = await axios.get(
        'https://brasil.io/api/dataset/covid19/caso/data/?state=PR&date=2020-05-10'
      );

      return res.json(response.data);
    } catch (error) {
      debug(error);
      return res.json(error);
    }
  },
};

module.exports = homeController;
