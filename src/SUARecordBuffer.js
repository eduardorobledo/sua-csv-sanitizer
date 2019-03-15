"use strict";

class SUARecordBuffer {

  constructor() {
    this.records = [];
    this.movements = [];
  }

  getLastRecord() {
    return this.records[this.records.length-1];
  }

  addRecord(line) {
    const fields = line.split(",");
    const recordFields = fields.slice(0, 4);
    const move = [fields[0], ...fields.slice(5, 15)].join(",");

    if (fields[15]) { // has credit info
      recordFields.push(fields[15]); // credit number
      const keyDateSplit = fields[16].split(/\s+/);
      recordFields.push(keyDateSplit[0]); // credit key
      recordFields.push(keyDateSplit[1]); // credit date
    }
    const record = recordFields.join(",");

    this.records.push(record)
    this.movements.push(move);
  }

  addMove(line) {
    const nss = this.getLastRecord().slice(0,15);
    const movementFields = line.split(",").slice(1, 13)
    this.movements.push([nss, ...movementFields].join(",") );
  }

  printRecords() {
    this.records.forEach(r => console.log(r));
  }

  printMovements() {
    this.movements.forEach(m => console.log(m));
  }

  printAll() {
    this.printRecords();
    console.log(Array(80).join("-"));
    this.printMovements();
  }
}

module.exports = SUARecordBuffer;
