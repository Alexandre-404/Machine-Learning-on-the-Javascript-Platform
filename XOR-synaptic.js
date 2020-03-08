var synaptic = require('synaptic'); // Call Synaptic
var Neuron = synaptic.Neuron, // Set NN Units
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

function Perceptron(input, hidden, output) { // Setup Perceptron
  // Setup Layers
  var inputLayer = new Layer(input);
  var hiddenLayer = new Layer(hidden);
  var outputLayer = new Layer(output);

  //Link the layers
  inputLayer.project(hiddenLayer);
  hiddenLayer.project(outputLayer);

  //Define the layers
  this.set({
    input : inputLayer,
    hidden : [hiddenLayer],
    output : outputLayer
  });
}

//Setup the Network
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

//Init New Perceptron and Trainer
var myPerceptron = new Perceptron(2,3,1);
var myTrainer = new Trainer(myPerceptron);

let rep = myTrainer.XOR(); //Train to XOR
console.log(rep); //Training Report

//Test The Trained Neural Network
let a = myPerceptron.activate([0,0]);
let b = myPerceptron.activate([0,1]);
let c = myPerceptron.activate([1,0]);
let d = myPerceptron.activate([1,1]);

//Print test Outputs
console.log(a);
console.log(b);
console.log(c);
console.log(d);
