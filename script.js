var localStorage = window.localStorage;
let profileTableBody = document.querySelector("#profile-table-body");
//score variables
let score = 0;
let highScore = 0;
let scoreText = document.querySelector("#score");
let highScoreText = document.querySelector("#high-score");
//themes
let defaultTheme = document.querySelector("#default");
let winterTheme = document.querySelector("#winter");
let christmasTheme = document.querySelector("#christmas");
let rageTheme = document.querySelector("#rage");
//instructions modal
let instructionButton = document.querySelector("#instruction-button");
let modalBackground = document.querySelector("#modal-background");
let modalClose = document.querySelector("#modal-close-button");
let modal = document.querySelector("#modal");
//2048 modal
let modal2048 = document.querySelector("#modal-2048");
let modalContinue2048 = document.querySelector("#modal-2048-continue");
let modalEnd2048 = document.querySelector("#modal-2048-end");
let hasReached2048 = false;
//end modal
let endGameModal = document.querySelector("#end-game-modal");
let endModalAgain = document.querySelector("#end-modal-again");
let endModalClose = document.querySelector("#end-modal-close");
// signup modal
let signupModal = document.querySelector("#signup-modal");
let signupCloseButton = document.querySelector("#signup-close-button");
//profile modal
let profileModal = document.querySelector("#profile-modal");
let welcomePlayer = document.querySelector("#welcome-player");
let profileModalClose = document.querySelector("#profile-modal-close");
//signup button
let signup = document.querySelector("#signup");
let profile = document.querySelector("#profile");
//check game running
let isGameRunning = true;
let checkNextTurn = false;
//signup function variables
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let submitSignup = document.querySelector("#submit-signup");
let hasSignedUp = false;
//themes
let themeButton = document.querySelector("#theme-button");
//audio
let audio = new Audio("pop.mov");
let backgroundMusic = new Audio("pop.mov");
backgroundMusic.loop = true;
backgroundMusic.autoplay = true;
//first row
let A0 = document.querySelector("#A0");
let A1 = document.querySelector("#A1");
let A2 = document.querySelector("#A2");
let A3 = document.querySelector("#A3");
//second row
let B0 = document.querySelector("#B0");
let B1 = document.querySelector("#B1");
let B2 = document.querySelector("#B2");
let B3 = document.querySelector("#B3");
//third row
let C0 = document.querySelector("#C0");
let C1 = document.querySelector("#C1");
let C2 = document.querySelector("#C2");
let C3 = document.querySelector("#C3");
//forth row
let D0 = document.querySelector("#D0");
let D1 = document.querySelector("#D1");
let D2 = document.querySelector("#D2");
let D3 = document.querySelector("#D3");
//grids
let grid = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

let checkSameGrid = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

//event listeners
document.addEventListener("keydown", function(event) {
  if (isGameRunning == true) {
    if (event.key === "d" || event.key === "ArrowRight") {
      rightKey();
    }
  }
});

document.addEventListener("keydown", function(event) {
  if (isGameRunning == true) {
    if (event.key === "a" || event.key === "ArrowLeft") {
      leftKey();
    }
  }
});

document.addEventListener("keydown", function(event) {
  if (isGameRunning == true) {
    if (event.key === "w" || event.key === "ArrowUp") {
      upKey();
    }
  }
});

document.addEventListener("keydown", function(event) {
  if (isGameRunning == true) {
    if (event.key === "s" || event.key === "ArrowDown") {
      downKey();
    }
  }
});

function setThemeDefault() {
  backgroundMusic.pause();
  let squares = document.querySelectorAll(".square");

  document.documentElement.style.backgroundImage = "url('default.jpeg')";
  audio = new Audio("pop.mov");
  backgroundMusic = new Audio("lofiBackground.mp3");
  backgroundMusic.play();
  setInterval(chillPlay, 84000);

  squares.forEach(function(square) {
    square.style.borderColor = "black";
  });

  localStorage.setItem("theme", "default");
}

function chillPlay() {
  backgroundMusic.play();
}

function setThemeWinter() {
  backgroundMusic.pause();
  let squares = document.querySelectorAll(".square");

  document.documentElement.style.backgroundImage = "url('winter.jpeg')";
  audio = new Audio("wind.mov");
  backgroundMusic = new Audio("rainBackground.mp3");
  backgroundMusic.play();
  setInterval(winterPlay, 901000);

  squares.forEach(function(square) {
    square.style.borderColor = "lightblue";
  });

  localStorage.setItem("theme", "winter");
}

function winterPlay() {
  backgroundMusic.play();
}

function setThemeChristmas() {
  backgroundMusic.pause();
  let squares = document.querySelectorAll(".square");

  document.documentElement.style.backgroundImage = "url('christmas.jpeg')";
  audio = new Audio("bell.mov");
  backgroundMusic = new Audio("christmasBackground.mp3");
  backgroundMusic.play();
  setInterval(christmasPlay, 28000);

  squares.forEach(function(square) {
    square.style.borderColor = "darkgreen";
  });

  localStorage.setItem("theme", "christmas");
}

function christmasPlay() {
  backgroundMusic.play();
}

function setThemeRage() {
  backgroundMusic.pause();
  let squares = document.querySelectorAll(".square");

  document.documentElement.style.backgroundImage = "url('rage.png')";
  audio = new Audio("glass.mov");
  backgroundMusic = new Audio("scaryBackground.mp3");
  backgroundMusic.play();
  setInterval(scaryPlay, 156000);

  squares.forEach(function(square) {
    square.style.borderColor = "red";
  });

  localStorage.setItem("theme", "rage");
}

function scaryPlay() {
  backgroundMusic.play();
}

//checks if the person is signedup when the page initally loads
function checkIfSignedUp() {
  if (localStorage.getItem("hasSignedUp") == "true") {
    signup.style.display = "none";
    profile.style.display = "block";

    // Load the profile table from local storage
    const storedProfileTable = localStorage.getItem("profileTable");
    if (storedProfileTable) {
      profileTableBody.innerHTML = storedProfileTable;
    }
  }
}
checkIfSignedUp();

//function to save scores in profile
function saveScoreAndDisplayInProfile(score) {
  if (localStorage.getItem("hasSignedUp") == true.toString()) {
    // Create a new row for the profile table
    const newRow = document.createElement("tr");
    //creates the new column
    const dateCell = document.createElement("td");
    const scoreCell = document.createElement("td");

    // Calculate the current date
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`;

    // Set the cell values
    dateCell.textContent = formattedDate; // Current date
    scoreCell.textContent = score; // The score

    //saves the score in the certain column
    newRow.appendChild(dateCell);
    newRow.appendChild(scoreCell);

    // Append the new row to the profile table
    profileTableBody.appendChild(newRow);

    // Save the updated profile table to local storage
    localStorage.setItem("profileTable", profileTableBody.innerHTML);
  }
}

//function to handle signup feature
function handleSignup() {
  if (username.value.length > 0 && password.value.length > 0) {
    signupModal.classList.remove("is-active");
    hasSignedUp = true;
    localStorage.setItem("username", username.value);
    console.log(
      "username: " + localStorage.getItem("username", username.value),
    );
    localStorage.setItem("password", password.value);
    console.log(
      "password: " + localStorage.getItem("password", password.value),
    );
    localStorage.setItem("hasSignedUp", true.toString());
    console.log(
      "Signed up? " + localStorage.getItem("hasSignedUp", hasSignedUp),
    );
    checkIfSignedUp();
  }
  return false;
}

//checks if the game should end
function checkEndGame() {
  // Check if there are any empty cells
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === null) {
        return;
      }
    }
  }

  // Check if there are any adjacent cells with the same value
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const currentCell = grid[i][j];
      // Check right
      if (j < grid[i].length - 1 && grid[i][j + 1] === currentCell) {
        return;
      }
      // Check left
      if (j > 0 && grid[i][j - 1] === currentCell) {
        return;
      }
      // Check down
      if (i < grid.length - 1 && grid[i + 1][j] === currentCell) {
        return;
      }
      // Check up
      if (i > 0 && grid[i - 1][j] === currentCell) {
        return;
      }
    }
  }

  // If no empty cells and no adjacent cells with the same value, the game should end.
  isGameRunning = false;
  console.log("Game should end");
  endGameModal.classList.add("is-active");

  // Save the score and display it in the profile table
  saveScoreAndDisplayInProfile(score);
}

//sets the inital grid
function initialGrid() {
  let randomTwoRow = Math.floor(Math.random() * grid.length);
  let randomTwoColumn = Math.floor(Math.random() * grid.length);
  let randomFourRow = Math.floor(Math.random() * grid.length);
  let randomFourColumn = Math.floor(Math.random() * grid.length);

  grid[randomTwoRow][randomTwoColumn] = 2;
  grid[randomFourRow][randomFourColumn] = 4;

  checkSameGrid = copyGrid(grid);

  highScore = localStorage.getItem("highScore");
  highScoreText.textContent = highScore;

  if (localStorage.getItem("theme") == "default") {
    setThemeDefault();
  } else if (localStorage.getItem("theme") == "winter") {
    setThemeWinter();
  } else if (localStorage.getItem("theme") == "christmas") {
    setThemeChristmas();
  } else if (localStorage.getItem("theme") == "rage") {
    setThemeRage();
  } else {
    setThemeDefault();
  }
}
initialGrid();

//function called to display the text as the grid variable
function updateGrid() {
  audio.play();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = document.querySelector(
        `#${String.fromCharCode(65 + i)}${j}`,
      );
      const value = grid[i][j];

      // Remove all value classes first
      cell.classList.remove(
        "value-2",
        "value-4",
        "value-8",
        "value-16",
        "value-32",
        "value-64",
        "value-128",
        "value-256",
        "value-512",
        "value-1024",
        "value-2048",
        "value-bigger-2048",
      );

      if (value) {
        cell.textContent = value;
        cell.classList.add(`value-${value}`);
      } else {
        cell.textContent = ""; // Clear cell content if value is null
      }
    }
  }
}
updateGrid();

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) {
        return false;
      }
    }
  }

  return true;
}

function copyGrid(arr) {
  return arr.map((row) => [...row]);
}

//spawns the number when you playing the game
function numberSpawner(row, column, isHorizontal) {
  if (!arraysAreEqual(grid, checkSameGrid)) {
    let availableSpaces = [];

    if (isHorizontal) {
      for (let i = 0; i < grid.length; i++) {
        if (grid[i][column] === null) {
          availableSpaces.push(i);
        }
      }

      if (availableSpaces.length > 0) {
        let randomIndex = Math.floor(Math.random() * availableSpaces.length);
        let randomRow = availableSpaces[randomIndex];
        if (Math.random() > 0.3) {
          grid[randomRow][column] = 2;
        } else {
          grid[randomRow][column] = 4;
        }
      }
    } else {
      for (let i = 0; i < grid.length; i++) {
        if (grid[row][i] === null) {
          availableSpaces.push(i);
        }
      }

      if (availableSpaces.length > 0) {
        let randomIndex = Math.floor(Math.random() * availableSpaces.length);
        let randomColumn = availableSpaces[randomIndex];
        if (Math.random() > 0.2) {
          grid[row][randomColumn] = 2;
        } else {
          grid[row][randomColumn] = 4;
        }
      }
    }
    checkSameGrid = copyGrid(grid); // Update the checkSameGrid
  } else {
    console.log("Grid is the same as before, won't spawn a number.");
    return;
  }
}

//checks if you have reached 2048
function hasReachedTile2048() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] === 2048) {
        if (hasReached2048 === false) {
          modal2048.classList.add("is-active");
        }
        hasReached2048 = true;
      }
    }
  }
}

//keeps track of the scores
function scoreCounter(value) {
  score += value;
  scoreText.textContent = score;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreText.textContent = highScore;
  }
}

//function to run the animation
function animateTile(fromRow, fromCol, toRow, toCol) {
  const fromCell = document.querySelector(
    `#${String.fromCharCode(65 + fromRow)}${fromCol}`,
  );

  const tileSize = 100; // Adjust this value based on your tile size
  const dx = (toCol - fromCol) * tileSize;
  const dy = (toRow - fromRow) * tileSize;

  // Apply a transform to move the tile
  fromCell.style.transform = `translate(${dx}px, ${dy}px)`;
  fromCell.style.transition = "transform 0.2s ease-in-out";

  // After the animation, reset the transformation
  setTimeout(() => {
    fromCell.style.transform = "none";
  }, 100);
}

//function for when clicking the right key
function rightKey() {
  for (let i = 0; i < 4; i++) {
    for (let k = 2; k >= 0; k--) {
      // start from second to last column and move to left
      if (grid[i][k] !== null) {
        let j = k + 1; // set target column one to the right

        // move the tile to the rightmost empty cell or merge with another tile
        while (j < 4 && (grid[i][j] === null || grid[i][j] === grid[i][k])) {
          if (grid[i][j] === null) {
            // move tile to right
            grid[i][j] = grid[i][k]; //set new one
            grid[i][k] = null; //set old to null
            // Add animation here
            animateTile(i, k, i, j);
          } else if (grid[i][j] === grid[i][k]) {
            // merge tiles
            grid[i][j] *= 2; //combine numbers
            scoreCounter(grid[i][j]);
            grid[i][k] = null; //set old one to null
            // Add animation here
            animateTile(i, k, i, j);
          }
          k = j; // move to next column
          j++;
        }
      }
    }
  }

  numberSpawner(null, 0, true);
  updateGrid();
  hasReachedTile2048();
  checkEndGame();
}

//function for when clicking the left key
function leftKey() {
  for (let i = 0; i < 4; i++) {
    for (let k = 1; k <= 3; k++) {
      // start from second column and move right
      if (grid[i][k] !== null) {
        let j = k - 1; // set target column one to the left

        // move the tile to the rightmost empty cell or merge with another tile
        while (j >= 0 && (grid[i][j] === null || grid[i][j] === grid[i][k])) {
          if (grid[i][j] === null) {
            // Move tile left with animation
            animateTile(i, k, i, j);
            // move tile to left
            grid[i][j] = grid[i][k]; //set new one
            grid[i][k] = null; //set old to null
          } else if (grid[i][j] === grid[i][k]) {
            // Move tile left with animation
            animateTile(i, k, i, j);
            // merge tiles
            grid[i][j] *= 2; //combine numbers
            scoreCounter(grid[i][j]);
            grid[i][k] = null; //set old one to null
          }
          k = j; // move to next column
          j--;
        }
      }
    }
  }
  numberSpawner(null, 3, true);
  updateGrid();
  hasReachedTile2048();
  checkEndGame();
}

//function for when clicking the up key
function upKey() {
  for (let i = 0; i < 4; i++) {
    for (let k = 1; k < 4; k++) {
      // start from second last row and move up
      if (grid[k][i] !== null) {
        let j = k - 1; // Set the target row one below

        // Move the tile upwards to the topmost empty cell or merge with another tile
        while (j >= 0 && (grid[j][i] === null || grid[j][i] === grid[k][i])) {
          if (grid[j][i] === null) {
            // Move tile up with animation
            animateTile(k, i, j, i);
            // Move tile up
            grid[j][i] = grid[k][i];
            grid[k][i] = null;
          } else if (grid[j][i] === grid[k][i]) {
            // Move tile up with animation
            animateTile(k, i, j, i);
            // Merge tiles
            grid[j][i] *= 2;
            scoreCounter(grid[j][i]);
            grid[k][i] = null;
          }
          k = j; // Move to the next row
          j--;
        }
      }
    }
  }
  numberSpawner(3, null, false);
  updateGrid();
  hasReachedTile2048();
  checkEndGame();
}

//function for when clicking the down key
function downKey() {
  for (let i = 0; i < 4; i++) {
    for (let k = 2; k >= 0; k--) {
      // start from second row and move down
      if (grid[k][i] !== null) {
        let j = k + 1; // set target row one below

        // move tile down to the downmost empty cell or merge with another tile
        while (j < 4 && (grid[j][i] === null || grid[j][i] === grid[k][i])) {
          // Move tile down with animation
          animateTile(k, i, j, i);
          if (grid[j][i] === null) {
            // move tile down
            grid[j][i] = grid[k][i];
            grid[k][i] = null;
          } else if (grid[j][i] === grid[k][i]) {
            // Move tile down with animation
            animateTile(k, i, j, i);
            // merge tiles
            grid[j][i] *= 2;
            scoreCounter(grid[j][i]);
            grid[k][i] = null;
          }
          k = j; // move to the next row
          j++;
        }
      }
    }
  }

  numberSpawner(0, null, false);
  updateGrid();
  hasReachedTile2048();
  checkEndGame();
}

//various fucntions to open/close modals
function closeModal() {
  modal.classList.remove("is-active");
}

function closeModal2048() {
  modal2048.classList.remove("is-active");
}

function openSignup() {
  signupModal.classList.add("is-active");
  isGameRunning = false;
}

function closeSignup() {
  signupModal.classList.remove("is-active");
  isGameRunning = true;
}

function openProfile() {
  profileModal.classList.add("is-active");
  welcomePlayer.textContent = `Hello - ${localStorage.getItem("username")}`;
}

function closeProfile() {
  profileModal.classList.remove("is-active");
}

function openInstructions() {
  modal.classList.add("is-active");
}

function toggleThemeActivity() {
  themeButton.classList.toggle("is-active");
}

//onclicks
modalBackground.onclick = closeModal;
modalClose.onclick = closeModal;

modalContinue2048.onclick = closeModal2048;
modalEnd2048.onclick = function() {
  location.reload();
};

endModalAgain.onclick = function() {
  location.reload();
};

endModalClose.onclick = function() {
  window.close();
};

signup.onclick = openSignup;
signupCloseButton.onclick = closeSignup;

submitSignup.onclick = function(event) {
  isGameRunning = true;
  event.preventDefault();
  handleSignup();
};

profile.onclick = openProfile;
profileModalClose.onclick = closeProfile;

instructionButton.onclick = openInstructions;

themeButton.onclick = toggleThemeActivity;
defaultTheme.onclick = setThemeDefault;
winterTheme.onclick = setThemeWinter;
christmasTheme.onclick = setThemeChristmas;
rageTheme.onclick = setThemeRage;