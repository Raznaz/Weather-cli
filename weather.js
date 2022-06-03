#!/user/bin/env node

import { getArgs } from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('No token');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token is saved!');
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError('Dont have city, please add city -s [CITY_NAME]');
    return;
  }

  try {
    saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('City was saved');
  } catch (error) {
    printError(error.message);
  }
};

const getForecast = async () => {
  try {
    const weather = await getWeather();
    // console.log('object🙂', weather);
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (error) {
    if (error?.response?.status === 404) {
      printError('Incorrect city');
    } else if (error?.response?.status === 401) {
      printError('Incorrect token');
    } else {
      printError(error.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  return getForecast();
};

initCLI();
