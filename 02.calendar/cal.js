#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const now = new Date();

const year = argv.y ?? now.getFullYear();
const month = argv.m ?? now.getMonth() + 1;

const firstOfMonth = new Date(year, month - 1, 1);
const endOfMonth = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log(`日 月 火 水 木 金 土`);

for (let i = 0; i < firstOfMonth.getDay(); i++) {
  process.stdout.write("   ");
}

for (let i = 1; i < endOfMonth.getDate() + 1; i++) {
  process.stdout.write(String(i).padStart(2));
  if ((i + firstOfMonth.getDay()) % 7 === 0) {
    process.stdout.write("\n");
  } else if (i < endOfMonth.getDate()) {
    process.stdout.write(" ");
  }
}

console.log();
