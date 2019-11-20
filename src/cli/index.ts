import chalk from 'chalk';
import * as commander from 'commander';
import { LibModule } from '../public-api';

export class Cli {
  private libModule: LibModule;

  commander = ['cli', 'Seminjecto CLI app.'];

  constructor() {
    this.libModule = new LibModule();
  }

  getApp() {
    const [command, description] = this.commander;
    commander
      .version(require('../../package.json').version, '-v, --version')
      .usage(`${command} [options] [command]`)
      .description(description);

    commander
      .command('help')
      .description('Display help.')
      .action(() => commander.outputHelp());

    commander
      .command('*')
      .description('Any other command is not supported.')
      .action((cmd: string) =>
        console.error(chalk.red(`Unknown command '${cmd}'`))
      );

    return commander;
  }

}