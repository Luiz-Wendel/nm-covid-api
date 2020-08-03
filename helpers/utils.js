const debug = require('debug')('app:utils');

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

// Get increase percentage of cases
// Params:
//  start: city info on dateStart
//  end: city info on dateEnd
// Return: float (increase percentage of cases)
const getIncreasePercentage = (start, end) => {
  const population = parseFloat(start.population);
  const newCases = parseFloat(end.cases) - parseFloat(start.cases);

  return (newCases / population) * 100;
};

// Get a list of cities and it's increase percentage of cases
// Params:
//  start: city info on dateStart
//  end: city info on dateEnd
// Return: an array with all state cities and it's increase percentage of cases
const getIncreasePercentageList = (start, end) => {
  const result = [];
  let count = 0;

  end.forEach((endElement, index) => {
    let percentage = null;
    let hasEnded = false;

    if (start.length < index - count) hasEnded = true;

    const startElement = start[index - count];

    // if city already had any case call function to calculate increase percentage,
    // else calculate percentage based on new cases
    if (!hasEnded && endElement.city === startElement.city)
      percentage = getIncreasePercentage(startElement, endElement);
    else {
      percentage = (endElement.cases / endElement.population) * 100;
      count++;
    }

    const newData = {
      nomeCidade: endElement.city,
      percentualDeCasos: percentage,
    };

    result.push(newData);
  });

  return result;
};

// Get top X highest increase percentage
const getTop = (start, end, count) => {
  let result = [];
  let percentageList = [];

  const refinedStartList = getRefinedList(start);
  const refinedEndList = getRefinedList(end);

  const cities = getIncreasePercentageList(refinedStartList, refinedEndList);

  cities.forEach((city) => {
    percentageList.push(city.percentualDeCasos);
  });

  const topList = percentageList.sort((a, b) => b - a).slice(0, count);

  topList.forEach((topValue, index) => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].percentualDeCasos === topValue) {
        const city = {
          id: index,
          ...cities[i],
        };

        result.push(city);
        break;
      }
    }
  });

  return result;
};

module.exports = { getRefinedList, getTop };
