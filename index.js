#!/usr/bin/env node

const version = require('./package.json').version;
let program = require('commander');

const samflagsParse = require('./samflags-parse');

function buildProgram() {
  program.version(version)
    .command('parse <flags...>')
    .alias('*')
    .description('parse the given SAM flags into human readable strings')
    .action(samflagsParse);

  program.on('--help', function() {
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
}

buildProgram();

program.parse(process.argv);
