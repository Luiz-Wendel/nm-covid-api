// Filter city information: create an array of cities (key: city name, objects: confirmed cases and population)
// Params: an array of cities
// return: a new array of cities with crutial information only
const getRefinedList = (cityList) => {
  let result = [];

  cityList.forEach((element) => {
    const {
      city,
      confirmed: cases,
      estimated_population_2019: population,
    } = element;

    const refinedCity = {};

    refinedCity[city] = {
      cases,
      population,
    };

    result.push(refinedCity);
  });

  return result;
};

module.exports = { getRefinedList };
