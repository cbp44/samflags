#!/usr/bin/env node

let program = require('commander');
const version = require('../package.json').version;
const parse = require('../lib/parse');

// parse command
const samflagsParse = (flagArray) => {
  // get a proper array of ints
  flagArray = flagArray.map(f => parseInt(f)).filter(f => !isNaN(f));

  flagArray.forEach((flag) => {
    console.log(`Checking ${flag}...`);

    let matchingFlags = parse.getFlagNumbers(flag);

    matchingFlags.forEach((matchedFlagValue) => {
      const matchedFlagDescription = parse.flagNumberToString(matchedFlagValue);
      console.log(` - ${matchedFlagDescription} (${matchedFlagValue})`);
    });

    console.log();
  });

  console.log('Finished!')
}

// build the program command line options
program.version(version)
  .command('parse <flags...>')
  .alias('p')
  .description('parse the given SAM flags into human readable strings')
  .action(samflagsParse)
  .on('--help', function() {
    console.log('\n');
    console.log('  Example:');
    console.log();
    console.log('    $ samflags parse 1548');
    console.log('      Checking 1548...');
    console.log('       - Read unmapped (4)');
    console.log('       - Mate unmapped (8)');
    console.log('       - Read fails platform/vendor quality checks (512)');
    console.log('       - Read is PCR or optical duplicate (1024)');
    console.log();
  });

// parse args
program.parse(process.argv);

// no command was typed, only 'samflags' so output help
if (!process.argv.slice(2).length) {
  console.log();
  console.log('  error: must choose a command to run!');
  console.log('   for parsing examples:');
  console.log('    $ samflags parse --help')
  console.log();
  program.outputHelp();

  console.log();
}
