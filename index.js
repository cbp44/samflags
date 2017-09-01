#!/usr/bin/env node

const version = require('./package.json').version;
let program = require('commander');

const samflagsParse = require('./samflags-parse');

function buildProgram() {
  program.version(version)
    .command('parse <flags...>')
    .description('parse the given SAM flags into human readable strings')
    .action(samflagsParse);
}

buildProgram();

program.parse(process.argv);
