function generateKeyGrid(key) {
    key = key.toUpperCase().replace(/[^A-Z]/g, "") + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var keyGrid = [];
    var index = 0;
    var used = new Array(26).fill(false);

    for (var i = 0; i < key.length; i++) {
        var ch = key.charAt(i);
        if (!used[ch.charCodeAt(0) - 65]) {
            keyGrid[Math.floor(index / 5)] = keyGrid[Math.floor(index / 5)] || [];
            keyGrid[Math.floor(index / 5)][index % 5] = ch;
            used[ch.charCodeAt(0) - 65] = true;
            index++;
        }
    }

    return keyGrid;
}

function preprocessText(text) {
    text = text.toUpperCase().replace(/[^A-Z]/g, "");
    var processedText = text;

    for (var i = 1; i < processedText.length; i += 2) {
        if (processedText.charAt(i) === processedText.charAt(i - 1)) {
            processedText = processedText.slice(0, i) + "X" + processedText.slice(i);
        }
    }

    if (processedText.length % 2 !== 0) {
        processedText += "X";
    }

    return processedText;
}

function encrypt(text, keyGrid) {
    var encryptedText = "";

    for (var i = 0; i < text.length; i += 2) {
        var ch1 = text.charAt(i);
        var ch2 = text.charAt(i + 1);

        var row1 = -1, col1 = -1, row2 = -1, col2 = -1;
        for (var j = 0; j < 5; j++) {
            for (var k = 0; k < 5; k++) {
                if (keyGrid[j][k] === ch1) {
                    row1 = j;
                    col1 = k;
                }
                if (keyGrid[j][k] === ch2) {
                    row2 = j;
                    col2 = k;
                }
            }
        }

        var encryptedCh1, encryptedCh2;
        if (row1 === row2) {
            encryptedCh1 = keyGrid[row1][(col1 + 1) % 5];
            encryptedCh2 = keyGrid[row2][(col2 + 1) % 5];
        } else if (col1 === col2) {
            encryptedCh1 = keyGrid[(row1 + 1) % 5][col1];
            encryptedCh2 = keyGrid[(row2 + 1) % 5][col2];
        } else {
            encryptedCh1 = keyGrid[row1][col2];
            encryptedCh2 = keyGrid[row2][col1];
        }

        encryptedText += encryptedCh1 + encryptedCh2;
    }

    return encryptedText;
}

// Decrypt the encrypted text
function decrypt(encryptedText, keyGrid) {
  let decryptedText = "";

  for (let i = 0; i < encryptedText.length; i += 2) {
    let ch1 = encryptedText.charAt(i);
    let ch2 = encryptedText.charAt(i + 1);

    let [row1, col1] = findCharacterLocation(ch1, keyGrid);
    let [row2, col2] = findCharacterLocation(ch2, keyGrid);

    let decryptedCh1, decryptedCh2;
    if (row1 === row2) {
      decryptedCh1 = keyGrid[row1][(col1 + 4) % 5];
      decryptedCh2 = keyGrid[row2][(col2 + 4) % 5];
    } else if (col1 === col2) {
      decryptedCh1 = keyGrid[(row1 + 4) % 5][col1];
      decryptedCh2 = keyGrid[(row2 + 4) % 5][col2];
    } else {
      decryptedCh1 = keyGrid[row1][col2];
      decryptedCh2 = keyGrid[row2][col1];
    }

    decryptedText += decryptedCh1 + decryptedCh2;
  }

  return decryptedText;
}

// Find the location of a character in the key grid
function findCharacterLocation(ch, keyGrid) {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (keyGrid[row][col] === ch) {
        return [row, col];
      }
    }
  }
}

// Handle the encrypt button click
// Handle the encrypt button click
function handleEncrypt() {
  let key = document.getElementById("key").value;
  let text = document.getElementById("text").value;
  let keyGrid = generateKeyGrid(key);
  let processedText = preprocessText(text);
  let encryptedText = encrypt(processedText, keyGrid);

  // Add space between every two letters
  encryptedText = encryptedText.match(/.{1,2}/g).join(" ");

  document.getElementById("result").innerHTML =
    "Encrypted Text: " + encryptedText;
}

// Handle the decrypt button click
function handleDecrypt() {
  let key = document.getElementById("key").value;
  let encryptedText = document.getElementById("text").value;

  // Remove spaces from the encrypted text
  encryptedText = encryptedText.replace(/\s/g, "");

  let keyGrid = generateKeyGrid(key);
  let decryptedText = decrypt(encryptedText, keyGrid);

  // Remove any additional characters from the decrypted text
  decryptedText = decryptedText.substr(0, encryptedText.length);

  document.getElementById("result").innerHTML =
    "Decrypted Text: " + decryptedText;
}