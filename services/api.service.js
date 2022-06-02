import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

export const getWeather = async (city) => {
  console.log('🚀 ~ city', city);

  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  console.log('🧟 ~ token', token);

  if (!token) {
    throw new Error('Have problem with token');
  }

  const url = new URL(`https://api.openweathermap.org/data/2.5/weather`);

  url.searchParams.append('q', city);
  url.searchParams.append('appid', token);

  https.get(url, (result) => {
    let res = '';

    result.on('data', (chunk) => {
      res += chunk;
    });
    result.on('end', () => {
      console.log('END');
      console.log(res);
    });
    result.on('error', (error) => {
      console.log(error.message);
    });
  });
};
