var events = require('events');
var eventEmitter = new events.EventEmitter();

//Create an event handler:
//var myEventHandler = function () {
  //console.log('I hear a scream!');
//}

//Assign the eventhandler to an event:
eventEmitter.on('scream',function(){
    console.log('I hear a scream');
});

//Fire the 'scream' event:
eventEmitter.emit('scream');