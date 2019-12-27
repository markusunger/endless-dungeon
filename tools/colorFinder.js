const Uc = require('unicornhat-hd');

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

setInterval(() => {
  const randomColor = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ];
  unicorn.clear();
  unicorn.setBrightness(0.4);
  for (let i = 0; i < 16; i += 1) {
    for (let j = 0; j < 16; j += 1) {
      unicorn.setPixel(j, i, ...randomColor);
      console.log(randomColor);
    }
  }
  unicorn.show();
}, 1000);
