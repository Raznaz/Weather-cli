import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreenBright(' SUCCESS ', ' ', message));
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

export { printError, printSuccess, printHelp };
