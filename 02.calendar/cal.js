import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const now = new Date();

const year = argv.y ?? now.getFullYear();
const month = argv.m ?? now.getMonth() + 1;

const firstOfMonth = new Date(year, month - 1, 1, 23, 59, 59, 999);
const dayOfWeek = firstOfMonth.getDay();
const endOfMonth = new Date(year, month, 0);
const totalDay = endOfMonth.getDate();

console.log(`      ${month}月 ${year}`);
console.log(`日 月 火 水 木 金 土`);

let day = 1;
for (let i = 0; i < totalDay + dayOfWeek; i++) {
  if (i < dayOfWeek) {
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
