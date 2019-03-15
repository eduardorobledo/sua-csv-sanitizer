#! /usr/bin/env node
"use strict";

const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');
const SUARecordBuffer = require("../src/SUARecordBuffer");

const RECORDLINE_RX = /\d\d-\d\d-\d\d-\d\d\d\d-\d,\D+/;
const MOVEMENTLINE_RX = /(Alta|Baja|M\/S),\d\d\/\d\d\/\d\d\d\d/i;
const CSV_FILE_EXT = ".csv";

const recordBuffer = new SUARecordBuffer();
const target = process.argv[2] || ".";

fs.stat(target, function(err, stats) {
  if (err) {
    console.log(err);
    return process.exit(1);
  }

  if (stats.isFile()) processFile(target);
  if (stats.isDirectory()) processDir(target);
});


function sanitize (line) {
  return line.replace(/\"/g,"").replace(/,,,,,/g,",").slice(1,-10);
}

function processFile(file) {

  const rl = readline.createInterface(fs.createReadStream(file), new Stream());
  rl.on('line', function (line) {
    const sanitized = sanitize(line);

    if (RECORDLINE_RX.test(sanitized)) 
      return recordBuffer.addRecord(sanitized);
    
    if (MOVEMENTLINE_RX.test(sanitized)) recordBuffer.addMove(sanitized);
    
  });
}

function processDir(path) {
  fs.readdir(path, function(err, items) {
    items.forEach(file => {
      if (file.endsWith(CSV_FILE_EXT)) {
        processFile(file);
      }
    });
  });
}

process.on('exit', function () {
  if (recordBuffer.records.length) {
    recordBuffer.printAll();
  }
});
