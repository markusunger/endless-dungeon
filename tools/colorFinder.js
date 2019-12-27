const Uc = require('unicornhat-hd');
const rl = require('readline-sync');

let unicorn;
try {
  unicorn = new Uc('/dev/spidev0.0');
} catch (e) {
  console.log(`Couldn't initialize unicorn hat! ${e}`);
}

process.on('SIGINT', () => {
  if (unicorn) {
    unicorn.clear();
    unicorn.show();
  }
  process.exit();
});

while (true) {
  const color = rl.question('Color array: ').split(',').map(Number);
  unicorn.clear();
  unicorn.setBrightness(0.4);
  for (let i = 0; i < 16; i += 1) {
    for (let j = 0; j < 16; j += 1) {
      unicorn.setPixel(j, i, ...color);
    }
  }
  console.log(`Color was ${color}.`);
  unicorn.show();
}
