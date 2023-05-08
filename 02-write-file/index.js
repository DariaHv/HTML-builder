const fs = require("fs");
const path = require ("path");
const writeableStream = fs.createWriteStream(path.join(__dirname,"text.txt"));
const readline = require('node:readline');
const {
    stdin: input,
    stdout: output,
} = require('process');

const rl = readline.createInterface({ input});
output.write("Please, enter some text:");
rl.on('line', (input) => {
  let text = input;
  if (text.toString().trim() == "exit") {
    stopTask();
  }
  writeableStream.write(input);
});
process.on("SIGINT", stopTask);
function stopTask() {
  console.log("Goodbye!");
  process.exit();
}