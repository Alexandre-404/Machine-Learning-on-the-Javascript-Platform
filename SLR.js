const ml = require('ml-regression');
const csv = require("csvtojson");
const SLR = ml.SLR; // Simple Linear Regression

const csvFilePath = 'Advertising.csv'; // Data File
let csvData = [], // Parsed Data
  X = [], // Inputs
  Y = []; // Outputs

let regressionModel;

const readline = require('readline');

const r1 = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});

csv()
  .fromFile(csvFilePath)
  .on('json', (jsonObj) => {
      csvData.push(jsonObj);
  })
  .on('done',() => {
    dressData(); // Populating X and Y from JSON objects
    performRegression(); // SLR function
  });

function dressData() { // Populating X and Y from JSON objects
  csvData.forEach((row) => {
    X.push(f(row.Radio));
    Y.push(f(row.Sales));
  });
}

function f(s) {
  return parseFloat(s);
}

function performRegression() {
  regressionModel = new SLR(X,Y);
  console.log(regressionModel.toString(3));
  predictOutput();
}

function predictOutput() {
  r1.question('Enter input X for prediction : ', (answer) => {
    console.log('At X = ' + answer + ', y = ' + regressionModel.predict(parseFloat(answer)));
    predictOutput();
  });
}
