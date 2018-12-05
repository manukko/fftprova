var ACCEL_SRV = 'e95d0753-251d-470a-a062-fa1922dfa9a8'
var ACCEL_DATA = 'e95dca4b-251d-470a-a062-fa1922dfa9a8'
var ACCEL_PERIOD = 'e95dfb24-251d-470a-a062-fa1922dfa9a8'
var MAGNETO_SRV = 'e95df2d8-251d-470a-a062-fa1922dfa9a8'
var MAGNETO_DATA = 'e95dfb11-251d-470a-a062-fa1922dfa9a8'
var MAGNETO_PERIOD = 'e95d386c-251d-470a-a062-fa1922dfa9a8'
var MAGNETO_BEARING = 'e95d9715-251d-470a-a062-fa1922dfa9a8'
var BTN_SRV = 'e95d9882-251d-470a-a062-fa1922dfa9a8'
var BTN_A_STATE = 'e95dda90-251d-470a-a062-fa1922dfa9a8'
var BTN_B_STATE = 'e95dda91-251d-470a-a062-fa1922dfa9a8'
var IO_PIN_SRV = 'e95d127b-251d-470a-a062-fa1922dfa9a8'
var IO_PIN_DATA = 'e95d8d00-251d-470a-a062-fa1922dfa9a8'
var IO_AD_CONFIG = 'e95d5899-251d-470a-a062-fa1922dfa9a8'
var IO_PIN_CONFIG = 'e95db9fe-251d-470a-a062-fa1922dfa9a8'
var IO_PIN_PWM = 'e95dd822-251d-470a-a062-fa1922dfa9a8'
var LED_SRV = 'e95dd91d-251d-470a-a062-fa1922dfa9a8'
var LED_STATE = 'e95d7b77-251d-470a-a062-fa1922dfa9a8'
var LED_TEXT = 'e95d93ee-251d-470a-a062-fa1922dfa9a8'
var LED_SCROLL = 'e95d0d2d-251d-470a-a062-fa1922dfa9a8'
var TEMP_SRV = 'e95d6100-251d-470a-a062-fa1922dfa9a8'
var TEMP_DATA = 'e95d9250-251d-470a-a062-fa1922dfa9a8'
var TEMP_PERIOD = 'e95d1b25-251d-470a-a062-fa1922dfa9a8'

class uBit {

  constructor() {
    this.accelerometer = {
      x: 0,
      y: 0,
      z: 0
    };

    this.magnetometer_raw = {
      x: 0,
      y: 0,
      z: 0
    };

    this.magnetometer_bearing = 0;
    this.temperature = 0;

    this.buttonA = 0;
    this.buttonACallBack=function(){};

    this.buttonB = 0;
    this.buttonBCallBack=function(){};

    this.connected = false;

    this.onConnectCallback=function(){};
    this.onDisconnectCallback=function(){};

    this.onBLENotifyCallback=function(){};

    this.characteristic = {
      IO_PIN_DATA: {},
      IO_AD_CONFIG: {},
      IO_PIN_CONFIG: {},
      IO_PIN_PWM: {},
      LED_STATE: {},
      LED_TEXT: {},
      LED_SCROLL: {},
    }
  }

  getTemperature() {
    return this.temperature;
  }

  getAccelerometer() {
    return this.accelerometer;
  }

  getBearing() {
    return this.magnetometer_bearing;
  }

  getMagnetometer() {
    return this.magnetometer_raw;
  }

  getButtonA() {
    return this.buttonA;
  }

  setButtonACallback(callbackFunction){
    this.buttonACallBack=callbackFunction;
  }

  getButtonB() {
    return this.buttonB;
  }

  setButtonBCallback(callbackFunction){
    this.buttonBCallBack=callbackFunction;
  }

  onConnect(callbackFunction){
    this.onConnectCallback=callbackFunction;
  }

  onDisconnect(callbackFunction){
    this.onDisconnectCallback=callbackFunction;
  }

  onBleNotify(callbackFunction){
    this.onBLENotifyCallback=callbackFunction;
  }

  /*writePin(pin) {
    //something like this should work, but we need to create the correct buffer
    //this.characteristic.IO_PIN_DATA.writeValue(data);
  }

  readPin(pin) {

  }

  writeMatrixIcon(icon) {
    var ledMatrix = new Int8Array(5);
    var buffer = [
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0']
    ]
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        buffer[i][7-j] = icon[i][4 - j]
      }
    }
    for (var i = 0; i < 5; i++) {
      var string = buffer[i].join("");
      ledMatrix[i]=parseInt(string,2)
    }
    if(this.connected){
      this.characteristic.LED_STATE.writeValue(ledMatrix)
      .then(_ => {
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  writeMatrixTextSpeed(speed){
    var buffer= new Uint8Array(speed);
    if(this.connected){
      this.characteristic.LED_TEXT.writeValue(buffer)
      .then(_ => {
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  writeMatrixText(str){
    var buffer= new Uint8Array(toUTF8Array(str));
    if(this.connected){
      this.characteristic.LED_TEXT.writeValue(buffer)
      .then(_ => {
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
*/
  onButtonA(){
    console.log("onButtonA()");
    this.buttonACallBack();
  }

  onButtonB(){
    this.buttonBCallBack();
  }

  characteristic_updated(event) {

    this.onBLENotifyCallback();
    //BUTTON CHARACTERISTIC
    if (event.target.uuid == BTN_A_STATE) {
      //console.log("BTN_A_STATE", event.target.value.getInt8());
      this.buttonA = event.target.value.getInt8();
      if (this.buttonA){
        this.onButtonA();
      }
    }

    if (event.target.uuid == BTN_B_STATE) {
      //console.log("BTN_B_STATE", event.target.value.getInt8());
      this.buttonB = event.target.value.getInt8();
      if (this.buttonB){
        this.onButtonB();
      }
    }

    //ACCELEROMETER CHARACTERISTIC
    if (event.target.uuid == ACCEL_DATA) {
      //true is for reading the bits as little-endian
      //console.log("ACCEL_DATA_X", event.target.value.getInt16(0,true));
      //console.log("ACCEL_DATA_Y", event.target.value.getInt16(2,true));
      //console.log("ACCEL_DATA_Z", event.target.value.getInt16(4,true));
      this.accelerometer.x = event.target.value.getInt16(0, true);
      this.accelerometer.y = event.target.value.getInt16(2, true);
      this.accelerometer.z = event.target.value.getInt16(4, true);
    }

    // MAGNETOMETER CHARACTERISTIC (raw data)
    if (event.target.uuid == MAGNETO_DATA) {
      //  console.log("MAGNETO_DATA_X", event.target.value.getInt16(0,true));
      //  console.log("MAGNETO_DATA_Y", event.target.value.getInt16(2,true));
      //  console.log("MAGNETO_DATA_Z", event.target.value.getInt16(4,true));
      this.magnetometer_raw.x = event.target.value.getInt16(0, true);
      this.magnetometer_raw.y = event.target.value.getInt16(2, true);
      this.magnetometer_raw.z = event.target.value.getInt16(4, true);
    }

    // MAGNETOMETER CHARACTERISTIC (bearing)
    if (event.target.uuid == MAGNETO_BEARING) {
      //console.log("BEARING", event.target.value.getInt16(0,true));
      this.magnetometer_bearing = event.target.value.getInt16(0, true);
    }

    // TEMPERATURE CHARACTERISTIC
    if (event.target.uuid == TEMP_DATA) {
      //console.log("TEMP_DATA", event.target.value.getInt8());
      this.temperature = event.target.value.getInt8();

    }
  }

  searchDevice() {
    filters: []
    var options = {};
    options.acceptAllDevices = true;
    options.optionalServices = [ACCEL_SRV, MAGNETO_SRV, BTN_SRV, IO_PIN_SRV, LED_SRV, TEMP_SRV];

    console.log('Requesting Bluetooth Device...');
    console.log('with ' + JSON.stringify(options));

    navigator.bluetooth.requestDevice(options)
    .then(device => {

      console.log('> Name:             ' + device.name);
      console.log('> Id:               ' + device.id);

      device.addEventListener('gattserverdisconnected', this.onDisconnectCallback);

      // Attempts to connect to remote GATT Server.
      return device.gatt.connect();

    })
    .then(server => {
      // Note that we could also get all services that match a specific UUID by
      // passing it to getPrimaryServices().
      this.onConnectCallback();
      console.log('Getting Services...');
      return server.getPrimaryServices();
    })
    .then(services => {
      console.log('Getting Characteristics...');
      let queue = Promise.resolve();
      services.forEach(service => {
        queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
          console.log('> Service: ' + service.uuid);
          characteristics.forEach(characteristic => {
            console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
              getSupportedProperties(characteristic));

            //need to store all the characteristic I want to write to be able to access them later.
            switch (characteristic.uuid) {
              case IO_PIN_DATA:
                this.characteristic.IO_PIN_DATA = characteristic;
                break;

              case IO_AD_CONFIG:
                this.characteristic.IO_AD_CONFIG = characteristic;
                break;

              case IO_PIN_CONFIG:
                this.characteristic.IO_PIN_CONFIG = characteristic;
                break;

              case IO_PIN_PWM:
                this.characteristic.IO_PIN_PWM = characteristic;
                break;

              case LED_STATE:
                this.characteristic.LED_STATE = characteristic;
                this.connected = true;

                break;

              case LED_TEXT:
                this.characteristic.LED_TEXT = characteristic;
                break;

              case LED_SCROLL:
                this.characteristic.LED_SCROLL = characteristic;
                break;

              default:

            }


            if (getSupportedProperties(characteristic).includes('NOTIFY')) {
              characteristic.startNotifications().catch(err => console.log('startNotifications', err));
              characteristic.addEventListener('characteristicvaluechanged',
                this.characteristic_updated.bind(this));
            }
          });
        }));
      });
      return queue;
    }
  )
    .catch(error => {
      console.log('Argh! ' + error);
    });
  }
}


/* Utils */

function isWebBluetoothEnabled() {
  if (navigator.bluetooth) {
    return true;
  } else {
    ChromeSamples.setStatus('Web Bluetooth API is not available.\n' +
      'Please make sure the "Experimental Web Platform features" flag is enabled.');
    return false;
  }
}


function getSupportedProperties(characteristic) {
  let supportedProperties = [];
  for (const p in characteristic.properties) {
    if (characteristic.properties[p] === true) {
      supportedProperties.push(p.toUpperCase());
    }
  }
  return '[' + supportedProperties.join(', ') + ']';
}

// function toUTF8Array(str) {
//     var utf8 = [];
//     for (var i=0; i < str.length; i++) {
//         var charcode = str.charCodeAt(i);
//         if (charcode < 0x80) utf8.push(charcode);
//         else if (charcode < 0x800) {
//             utf8.push(0xc0 | (charcode >> 6),
//                       0x80 | (charcode & 0x3f));
//         }
//         else if (charcode < 0xd800 || charcode >= 0xe000) {
//             utf8.push(0xe0 | (charcode >> 12),
//                       0x80 | ((charcode>>6) & 0x3f),
//                       0x80 | (charcode & 0x3f));
//         }
//         // surrogate pair
//         else {
//             i++;
//             // UTF-16 encodes 0x10000-0x10FFFF by
//             // subtracting 0x10000 and splitting the
//             // 20 bits of 0x0-0xFFFFF into two halves
//             charcode = 0x10000 + (((charcode & 0x3ff)<<10)
//                       | (str.charCodeAt(i) & 0x3ff));
//             utf8.push(0xf0 | (charcode >>18),
//                       0x80 | ((charcode>>12) & 0x3f),
//                       0x80 | ((charcode>>6) & 0x3f),
//                       0x80 | (charcode & 0x3f));
//         }
//     }
//     return utf8;
// }

var microbit = new uBit();

microbit.onConnect(function(){
  console.log("connected");
});


document.querySelector('button').addEventListener('click', event => {
  microbit.searchDevice();
});





var midi, data;
var temp;

var c = new AudioContext();



var gates=[];
var gates2=[];
var gates3=[];

var now=[];

var at = 0.02; //Fundamental attack time
var dt = 0.5; //Fundamental decay time

var hat2 = 0.02; //1st harmonic attack time in sec
var hdt2 = 0.5; //1st harmonic decay time in sec
var ha2 = 1; //1st harmonic amplitude range between 0 and 1

var hat3 = 0.03; //2nd harmonic attack time in sec  (non si presuppone sia maggiore di hat2)
var hdt3 = 0.5; //2nd harmonic decay time in sec
var ha3 = 1; //2nd harmonic amplitude range between 0 and 1

//valori delle armoniche
var h1 = 1,
    h2b = Math.pow(2, 1/12),
    h2 = Math.pow(2, 2/12),
    h3b = Math.pow(2, 3/12),
    h3 = Math.pow(2, 4/12),
    h4 = Math.pow(2, 5/12), 
    h5b = Math.pow(2, 6/12),
    h5 = Math.pow(2, 7/12), 
    h6b = Math.pow(2, 8/12),
    h6 = Math.pow(2, 9/12), 
    h7b = Math.pow(2, 10/12),
    h7 = Math.pow(2, 11/12),
    h8 = 2;

var h = 0; //variabile armonica da modificare (vedi sotto come viene utilizzata)
var hh = 0; //seconda variabile armonica da modificare


microbit.onBleNotify(function(){
  aX = microbit.getAccelerometer().x;
  aY = microbit.getAccelerometer().y;
  aZ = microbit.getAccelerometer().z;
  document.getElementById("acc_X").innerHTML=microbit.getAccelerometer().x;
  document.getElementById("acc_Y").innerHTML=microbit.getAccelerometer().y;
  document.getElementById("acc_Z").innerHTML=microbit.getAccelerometer().z;
  
  //in base alla posizione del microbit abbiamo provato a far suonare la 3 e la 7 oppure la 5 e l'8... hh non viene riaggiornata a 0 quindi rimangono suonate la 7 e l 8
  if(aX>512 && aY>512){
    h=h3; //RICORDA h è la prima armonica che voglio in questo caso la quinta
    hh=h7; //RICORDA hh è la seconda armonica il questo caso la 7
  }
  else if(aX<-512){
    h=h5; 
    hh = h8*2;
  }
  else{
    h=0;
  }

// mettendo due if uno per la X e la Y non riusciamo a modificare entrambi le variabili contemporaneamente quindi o modifichiamo h oppure hh 

/*if(aY>512)
    hh=h3;
  else if(aY<-512)
    hh=h3b;
  else
    hh=0;
    */

});



// request MIDI access------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
    console.log('MIDI data', data); // MIDI data [144, 63, 73] in order tipo, tasto e velocity
  
    var [command, key, velocity] = data;
 
   if (command === 254) return; //perchè la mia tastiera manda in continuazione command = 254
    else  if (command === 144 && velocity!=0) {
      attack(key, velocity);
      
// comando del RELEASE: Tastiera Gianmarco = 128 --- Tastiera Federico = 144 (come il comando dell'attack solo che la velocity è 0)
    } else if (command === 128 || (command === 144 && velocity === 0)) {    
      release(key);
    }  
  
}

//Attack and Release--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function attack(midiNote, volume) {
  volume = volume*0.3; //volume*0.3 per non fare schifo sulle casse
  const freq = Math.pow(2, (midiNote-69)/12)*440;
  
  var o = c.createOscillator();
  var o2 = c.createOscillator();
  var o3 = c.createOscillator();
  
  var g = c.createGain();
  var g2 = c.createGain();
  var g3 = c.createGain();

  o.connect(g);
  o2.connect(g2);
  o3.connect(g3);
  
  g.connect(c.destination);
  g2.connect(c.destination);
  g3.connect(c.destination);
  
  //qui dico in quale oscillatore va quella determinata armonica 
  o.frequency.value = freq;
  o2.frequency.value = freq*h; 
  o3.frequency.value = freq*hh; 
  
  g.gain.value = 0;
  g2.gain.value = 0;
  g3.gain.value = 0;

  now[freq]= c.currentTime;
  
  
  g.gain.linearRampToValueAtTime(volume/124,now[freq]+at);
  g2.gain.linearRampToValueAtTime(volume/124*ha2,now[freq]+hat2);
  g3.gain.linearRampToValueAtTime(volume/124*ha3,now[freq]+hat3);
 
  o.start();
  o2.start();
  o3.start();
  
  gates[freq] = g;
  gates2[freq] = g2;
  gates3[freq] = g3;
}

function release(midiNote) {
  const freq = Math.pow(2, (midiNote-69)/12)*440;
  
  gates[freq].gain.linearRampToValueAtTime(0,c.currentTime+dt);
  
  //con questo if risolviamo il problema dell'armonica che rimaneva suonata se il tempo di pressione del tasto era inferiore al tempo della rampa di salita dell'attack
  if(c.currentTime-now[freq]<hat3 || c.currentTime-now[freq]<hat2 ){
    gates2[freq].gain.linearRampToValueAtTime(0,now[freq]+hat2);
    gates3[freq].gain.linearRampToValueAtTime(0,now[freq]+hat3);
  }  
  else{
    gates2[freq].gain.linearRampToValueAtTime(0,c.currentTime+hdt2);
    gates3[freq].gain.linearRampToValueAtTime(0,c.currentTime+hdt3);
  }
}