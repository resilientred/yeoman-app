'use strict';

var app = require('app');
var Application = require('./application');
var yargs = require('yargs');

var shellStartTime = Date.now();

process.on('uncaughtException', function (error) {
  if (error == null) {
    error = {};
  }

  if (error.message != null) {
    console.error(error.message);
  }

  if (error.stack != null) {
    console.error(error.stack);
  }
});

// Enable ES6 in the Renderer process
app.commandLine.appendSwitch('js-flags', '--harmony');

// Note: It's important that you don't do anything with Electron
// unless it's after 'ready', or else mysterious bad things will happen
// to you.
app.on('ready', function () {

  var args = parseCommandLine();
  new Application(args);

  console.log('App load time: ' + (Date.now() - shellStartTime) + 'ms');
});

function parseCommandLine() {
  var options = yargs(process.argv.slice(1)).wrap(100);

  options.alias('t', 'test').boolean('t').describe('t', 'Run the specs and exit with error code on failures.');

  var args = options.argv;

  return {
    test: args.test
  };
}
