import childProcess from 'child_process';

import test from 'ava';

test.cb(t => {
	childProcess.execFile('./cli.js', ['When does daylight saving time begin in New York in 2016'], {
		cwd: __dirname
	}, (err, stdout) => {
		t.ifError(err);
		t.true(stdout === '\u001b[?25l\n\u001b[?25l\u001b[1000D\u001b[K\u001b[1A\u001b[1000D\u001b[K\n New York, United States is currently in daylight saving time. It started on Sunday the 13th of March, 2016 at 2am when clocks were put forward by 1 hour and will end on Sunday the 6th of November, 2016 at 2am when clocks will be put back by 1 hour.\n\n\u001b[?25h');
		t.end();
	});
});

test.cb('noQuery', t => {
	childProcess.execFile('./cli.js', {
		cwd: __dirname
	}, (err, stdout) => {
		t.ifError(err);
		t.true(stdout === `\n › Please provide a query\n\n For help       :   curt -h, --help\n For examples   :   curt -e, --examples\n\t\n`);
		t.end();
	});
});

test.cb('help', t => {
	childProcess.execFile('./cli.js', ['-h'], {
		cwd: __dirname
	}, (err, stdout) => {
		t.ifError(err);
		t.true(stdout === `\n Usage   : curt [query]\n\n query   : place, state, country, question\n\n Command :\n -e, --example       Display examples\n -h, --help          Display help\n -v, --version       Display version\n\t\n`);
		t.end();
	});
});

test.cb('examples', t => {
	childProcess.execFile('./cli.js', ['-e'], {
		cwd: __dirname
	}, (err, stdout) => {
		t.ifError(err);
		t.true(stdout === `\n Examples : curt <query>\n\n where the format of query could be...\n\n ›  India\n › \"What is the time in New York\"\n › \"Time in Belgrade\"\n › \"What is the time in India when it is 7pm in New York USA\"\n › \"Whats the time in Chicago when its 8pm Eastern Time\"\n › \"If its 4pm in London what is the time in Boston\"\n › \"What is the time in Perl when it is 6pm on the 2nd of May in India\"\n › \"What time is it in Paris when it is 5-April-2015 in Sydney at 2am\"\n › \"When its midday on the 9th of September Pacific Time, whats the time in Miami\"\n › \"When does daylight saving time begin in Auckland\"\n › \"DST time in London\"\n › \"When does daylight saving time begin in New York in 2016\"\n\n paste any of the above mentioned query to check the result.\n\n NOTE : Use \" \" when your query has multiple words.\n \n`);
		t.end();
	});
});
