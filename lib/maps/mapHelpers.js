module.exports = {
  setEntry: function setEntry(width, height) {
    // determines a random entry position
    let entryX;
    let entryY;
    if (Math.random() >= 0.5) { // entry on bottom
      entryX = height - 1;
      entryY = Math.ceil(Math.random() * (width - 2)); // entry shouldn't be on the edges
    } else { // entry on the left
      entryX = Math.ceil(Math.random() * (height - 2)); // same for entry on left column
      entryY = 0;
    }
    return [entryX, entryY];
  },

  setExit: function setExit(width, height) {
    // determines an exit position either in the top row or in the rightmost column
    let exitX;
    let exitY;
    if (Math.random() >= 0.5) { // exit on top
      exitX = 0;
      exitY = Math.ceil(Math.random() * (width - 2)); // prevent outermost tiles from becoming exit
    } else { // exit on the right
      exitX = Math.ceil(Math.random() * (height - 2)); // same for exit on right column
      exitY = width - 1;
    }
    return [exitX, exitY];
  },
};
