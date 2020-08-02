// Filter city information: create an array of cities with city name, confirmed cases and population
// Params: an array of cities
// Return: a new array of cities with crutial information only
const getRefinedList = (cityList) => {
  let result = [];

  cityList.forEach((element) => {
    const {
      city,
      confirmed: cases,
      estimated_population_2019: population,
    } = element;

    const refinedCity = {
      city,
      cases,
      population,
    };

    result.push(refinedCity);
  });

  return result;
};

module.exports = { getRefinedList };
