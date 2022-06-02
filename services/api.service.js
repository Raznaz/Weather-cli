import https from 'https';
import { printError } from './log.service';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service';

const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error('No have key api, put key -t [API_KEY]');
  }
  //   const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`;

  const url = new URL('https://api.openweathermap.org/geo/1.0/direct');
  url.searchParams.append('q', city);
  url.searchParams.append('appid', token);
  url.searchParams.append('lang', eng);
  url.searchParams.append('units', 'metric');
  https.get(url, (response) => {
    let res = '';
    response.on('data', (chunk) => {
      res += chunk;
    });
    response.on('end', () => {
      console.log(res);
    });
  });
};
