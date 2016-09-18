#!/usr/bin/env node

'use stirct';

const dns = require('dns');
const currenTime = require('current-time');
const ora = require('ora');
const logUpdate = require('log-update');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const spinner = ora();

const arg = process.argv[2];

if (arg === '--help' || arg === '-h') {
	console.log(`
 ${chalk.cyan('Usage   :')} curt ${chalk.yellow('[query]')}

 ${chalk.yellow('query   :')} place, state, country, question

 ${chalk.cyan('Command :')}
 ${chalk.bold('-e')}, ${chalk.dim('--example')}       Display examples
 ${chalk.bold('-h')}, ${chalk.dim('--help')}          Display help
 ${chalk.bold('-v')}, ${chalk.dim('--version')}       Display version
	`);
} else if (arg === '--example' || arg === '-e') {
	console.log(`
 ${chalk.yellow('Examples :')} ${chalk.cyan('curt <query>')}

 where the format of query could be...

 ${chalk.blue('›  India')}
 ${chalk.blue('› "What is the time in New York"')}
 ${chalk.blue('› "Time in Belgrade"')}
 ${chalk.blue('› "What is the time in India when it is 7pm in New York USA"')}
 ${chalk.blue('› "Whats the time in Chicago when its 8pm Eastern Time"')}
 ${chalk.blue('› "If its 4pm in London what is the time in Boston"')}
 ${chalk.blue('› "What is the time in Perl when it is 6pm on the 2nd of May in India"')}
 ${chalk.blue('› "What time is it in Paris when it is 5-April-2015 in Sydney at 2am"')}
 ${chalk.blue('› "When its midday on the 9th of September Pacific Time, whats the time in Miami"')}
 ${chalk.blue('› "When does daylight saving time begin in Auckland"')}
 ${chalk.blue('› "DST time in London"')}
 ${chalk.blue('› "When does daylight saving time begin in New York in 2016"')}

 paste any of the above mentioned query to check the result.

 ${chalk.green('NOTE :')} ${chalk.magenta('Use " " when your query has multiple words.')}
 `);
} else if (!arg || arg.length === 0) { // prevents => no-negated-condition
	console.log(`
 ${chalk.yellow('› Please provide a query')}

 ${chalk.green('For help       :   curt -h, --help')}
 ${chalk.green('For examples   :   curt -e, --examples')}
	`);
} else {
	dns.lookup('facebook.com', err => {
		if (err && err.code === 'ENOTFOUND') {
			logUpdate(`\n${chalk.red('› Please check your internet connection')}\n`);
			process.exit(1);
		} else {
			// =>
		}
	});
	logUpdate();
	spinner.text = 'Fetching';
	spinner.start();
	currenTime(arg).then(user => {
		const inf = [];
		const informationRow = key => {
			if (user[key]) {
				inf.push(`\n ${user[key]}\n`);
			}
		};
		informationRow('data');
		logUpdate(inf.join('\n'));
		spinner.stop();
	});
}
