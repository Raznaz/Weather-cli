import axios from 'axios';
import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

export const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '🌥️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    default:
      return '💤';
  }
};

export const getWeather = async () => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));

  const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));

  if (!token) {
    throw new Error('Have problem with token');
  }

  if (!city) {
    throw new Error('Big problem with city');
  }

  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    { params: { q: city, appid: token } }
  );
  return data;
};
