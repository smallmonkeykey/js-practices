import minimist from "minimist";
const argv = minimist(process.argv.slice(2));

const now = new Date();

const year = argv.y ?? String(now.getFullYear());
const month = argv.m ?? String(now.getMonth() + 1);

const first_of_month = new Date(year, month -1 , 1, 23, 59, 59, 999)
const day_of_week = first_of_month.getDay();
const end_of_month = new Date(year, month, 0);
const total_day = end_of_month.getDate();

console.log("      " + month + "月" + "  " + year);
console.log("日 月 火 水 木 金 土");

let day = 1;
for (let i = 0; i < total_day + day_of_week; i++) {
  if (i < day_of_week) {
    process.stdout.write("   ");
  } else {
    if (i % 7 === 0) {
      process.stdout.write("\n");
    }
    process.stdout.write(String(day).padStart(2, " "));
    process.stdout.write(" ");

    day += 1;
  }
}

console.log();
