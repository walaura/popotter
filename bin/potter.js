#! /usr/bin/env node

const convert = require('../app.js')
const program = require('commander');
const colors = require('colors');
const fs = require('fs');
const path = require('path');

program.option('-s, --strings [value]', 'JSON file with strings (key-value)').parse(process.argv);

if(!program.strings) {
    program.outputHelp(colors.red);
}
else {
    try {
        let strings;
        let stringsFileAt = path.join(
            path.dirname(fs.realpathSync(__filename)),
            '../',
            program.strings
        );
        if(!fs.existsSync(stringsFileAt)){
            stringsFileAt = stringsFileAt+'.json';
            if(!fs.existsSync(stringsFileAt)){
                throw new Error(`File missing at (${stringsFileAt})`)
            }
        }
        try {
            strings = require(stringsFileAt);
        } catch (error) {
            throw new Error('Parsing error');
        }
        console.log(convert(strings));
    } catch (error) {
        if(!error.message) error.message = `Something failed`;
        console.error(colors.red(error.message));
    }
}
