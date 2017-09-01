# samflags
Samflags is a command line utility to decode SAM flags (e.g. 1804) into plain English text.

Basically, it turns 1804 into this:
- Read unmapped
- Mate unmapped
- Not primary alignment
- Read fails platform/vendor quality checks
- Read is PCR or optical duplicate

 It also exposes a library that can decode SAM flags for you if you want to use it in your own application.

It was inspired by websites like the following that do the same thing:
- https://broadinstitute.github.io/picard/explain-flags.html
- http://blog.biochen.com/FlagExplain.html

I use them quite frequently, and wanted to have a command line utility to use instead.

## Installation
This is a standard NodeJS package. It requires you to have NodeJS and npm installed.

If you have npm installed, you can install samflags as a command-line utility by using the following command.
```bash
$ npm install -g samflags
```

If you want to use it in your own project as a library, do this instead...
```bash
$ npm install samflags
```

```node
const samflags = require('samflags');
```

## Command-line Usage

After installation, you can use samflags like this.

```bash
$ samflags parse --help

  Usage: parse|p [options] <flags...>

  parse the given SAM flags into human readable strings


  Options:

    -h, --help  output usage information


  Example:

    $ samflags parse 1548
      Checking 1548...
       - Read unmapped (4)
       - Mate unmapped (8)
       - Read fails platform/vendor quality checks (512)
       - Read is PCR or optical duplicate (1024)
```

## Library Usage

A simple example library usage.

```node
const samflags = require('samflags');
const samflagsParse = samflags.parse;

let flags = samflagsParse.getFlagNumbers(516); // flags == [0x4, 0x200]

let flagStrings = samflagsParse.getFlagStrings(516); // flagStrings == ['Read unmapped', 'Read fails platform/vendor quality checks']
```
