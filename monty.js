'use strict'

var samples = []; 
var SAMPLE_SIZE = 1000; 

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arrayColumnsSum(array) {
  return array.reduce((a, b)=>
    a.map((x, i)=> x + (b[i] || 0))
  );
}

function setup(){ // put the prize in one of the first 3 columns representing Doors A,B,C respectively
  while(samples.push([0, 0, 0, 0]) < SAMPLE_SIZE);
  return samples.map(x => x[getRandomInt(0,2)] = 1);
}

function report(){
  var rep = arrayColumnsSum(samples);
  rep.forEach((x,i) => {
  	console.log(i, x, Math.round((x*100)/SAMPLE_SIZE)+"%");
  });
}

function process(){
  return samples.map(s => {
    if (s[1] == 0) {    // Monty reveals that Door B is empty
      s[3] = s[2];      // so the player switches from Door A to Door C  -- s[3] contains contents of Door C
    } else if (s[2] == 0) {  // Monty reveals that Door C is empty
      s[3] = s[1];      // so the player switches from Door A to Door B  -- s[3] contains contents of Door B
    } else {
      console.log("ERROR")  // We don't need any other cases because one of Door B or Door C will always be empty
    }
  });
}
          
function main(){
  console.log("Player selects Door A.  These are the number of wins behind each door and the probability of winning");
  console.log("0 is Door A, 1 is Door B, 2 is Door C");
  setup();
  report();
  console.log("Player changes the door selection based on Monty's input. This contains the number of wins and again the probability");
  console.log("Column 4 contains the contents of Door B or Door C - based on which one Monty showed was not empty");
  process();
  report();
}

main();
