'use strict';

const common = require('../common.js');
const assert = require('assert');

const bench = common.createBenchmark(main, {
  method: ['copy', 'rest', 'arguments'],
  millions: [100]
});

function copyArguments() {
  const len = arguments.length;
  const args = new Array(len);
  for (var i = 0; i < len; i++)
    args[i] = arguments[i];
  assert.strictEqual(args[0], 1);
  assert.strictEqual(args[1], 2);
  assert.strictEqual(args[2], 'a');
  assert.strictEqual(args[3], 'b');
}

function restArguments(...args) {
  assert.strictEqual(args[0], 1);
  assert.strictEqual(args[1], 2);
  assert.strictEqual(args[2], 'a');
  assert.strictEqual(args[3], 'b');
}

function useArguments() {
  assert.strictEqual(arguments[0], 1);
  assert.strictEqual(arguments[1], 2);
  assert.strictEqual(arguments[2], 'a');
  assert.strictEqual(arguments[3], 'b');
}

function runCopyArguments(millions) {
  for (var i = 0; i < millions * 1e6; i++)
    copyArguments(1, 2, 'a', 'b');
}

function runRestArguments(millions) {
  for (var i = 0; i < millions * 1e6; i++)
    restArguments(1, 2, 'a', 'b');
}

function runUseArguments(millions) {
  for (var i = 0; i < millions * 1e6; i++)
    useArguments(1, 2, 'a', 'b');
}

function main({ millions, method }) {
  var fn;
  switch (method) {
    case '':
      // Empty string falls through to next line as default, mostly for tests.
    case 'copy':
      fn = runCopyArguments;
      break;
    case 'rest':
      fn = runRestArguments;
      break;
    case 'arguments':
      fn = runUseArguments;
      break;
    default:
      throw new Error(`Unexpected method "${method}"`);
  }
  bench.start();
  fn(millions);
  bench.end(millions);
}
