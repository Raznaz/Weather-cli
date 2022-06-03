import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen.black.bold(' SUCCESS ', ' ', message));
};

const printHelp = () => {
  console.log(
    dedent(`${chalk.bgYellow.black.bold(' HELP ')}
    Without params - show weather;
    -s [CITY] set city
    -h show help
    -t [API_KEY] for save token
  `)
  );
};

const printWeather = (res, icon) => {
  console.log(dedent`${chalk.bgMagenta(' WEATHER ')}
  City: ${res.name}
  ${icon} ${res.weather[0].description}
  Temperature: ${res.main.temp}
  Feel like ${res.main.feels_like}
  Humidity:${res.main.humidity}%
  Wind: ${res.wind.speed}
  `);
};

export { printError, printSuccess, printHelp, printWeather };
