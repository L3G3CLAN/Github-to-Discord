const { inspect } = require('node:util');

const color = {
    red: '\x1b[31m',
    orange: '\x1b[38;5;202m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    pink: '\x1b[35m',
    purple: '\x1b[38;5;129m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
}

function getTimestamp() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function parse(message) {
    const properties = inspect(message, { depth: 3 });

    const regex = /^\s*["'`](.*)["'`]\s*\+?$/gm;

    const response = [];
    for (const line of properties.split('\n')) {
        response.push( line.replace(regex, '$1') );
    }

    return response.join('\n');
}

function log(message, type, colorCode) {
    console.log(`${color.yellow}[${getTimestamp()}]${color.reset} ${color.bold}${colorCode}[${type}]${color.reset}  ${color.bold}${parse(message)}${color.reset}`);
}

function info(message) {
    log(message, 'INFO', color.yellow);
}

function warn(message) {
    log(message, 'WARN', color.orange);
}

function error(message) {
    log(message, 'ERROR', color.red);
}

function success(message) {
    log(message, 'SUCCESS', color.green);
}

function debug(message) {
    log(message, 'DEBUG', color.blue);
}

function deleted(message) {
    log(message, 'DELETED', color.pink);
}

function updated(message) {
    log(message, 'UPDATED', color.purple);
}

function created(message) {
    log(message, 'CREATED', color.cyan);
}

function custom(message, selection) {
    const colorCode = color[selection] ?? color.reset;
    log(message, 'CUSTOM', colorCode);
}

module.exports = { getTimestamp, info, warn, error, success, debug, deleted, updated, created, custom };