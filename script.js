let countdownInterval;
let timeLeft;
let isPaused = false;
let isMoving = false; // Initial auf false gesetzt, um Animation nur einmal zu starten

// Kontroll-Buttons-Container und Geschwindigkeitsregler
const controlButtons = document.querySelector('.control-buttons');
const speedControl = document.querySelector('.speed-control');

// Startwerte für Geschwindigkeit
let speedX = 2;
let speedY = 2;

// Start Countdown
function startCountdown() {
  const days = parseInt(document.getElementById("days").value) || 0;
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;

  timeLeft = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000;

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  pauseText.textContent = "BREAK"; // Zeigt "BREAK", wenn der Countdown läuft
  pauseText.style.display = "block";
  controlButtons.style.display = "flex"; // Kontroll-Buttons sichtbar machen
  speedControl.style.display = "block"; // Schieberegler sichtbar machen

  isMoving = true; // Bewegung erlauben
  if (!isPaused) { // Nur starten, wenn nicht bereits pausiert
    moveText();
  }

  resumeCountdown();
}

// Resume Countdown
function resumeCountdown() {
  if (isPaused || !countdownInterval) {
    countdownInterval = setInterval(updateCountdown, 1000);
    isPaused = false;
    isMoving = true; // Bewegung fortsetzen
  }
}

// Update Countdown
function updateCountdown() {
  const displayHours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const displayMinutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const displaySeconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("countdownDisplay").textContent = 
    `${String(displayHours).padStart(2, '0')}:${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;

  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    document.getElementById("countdownDisplay").textContent = "00:00:00";
    
    // Ändere den Text zu "Let's continue!" und halte die Bewegung an
    pauseText.textContent = "Let's continue!";
    isMoving = false; // Bewegung anhalten

    // Positionierung und Sichtbarkeit von "Let's continue!"
    pauseText.style.top = "20vh";  // 20vh vom oberen Rand
    pauseText.style.left = "50%";  // Zentriert
    pauseText.style.transform = "translateX(-50%)"; // Korrektur zur Zentrierung
    pauseText.style.display = "block"; // Sichtbar machen

    controlButtons.style.display = "none"; // Kontroll-Buttons verstecken
    speedControl.style.display = "none"; // Schieberegler verstecken
    alert("Countdown beendet!");
  }

  timeLeft -= 1000;
}

// Pause Countdown
function pauseCountdown() {
  clearInterval(countdownInterval);
  isPaused = true;
  isMoving = false; // Bewegung anhalten
}

// Stop Countdown
function stopCountdown() {
  clearInterval(countdownInterval);
  isPaused = false;
  isMoving = false; // Bewegung anhalten
  timeLeft = 0;
  document.getElementById("countdownDisplay").textContent = "00:00:00";
  pauseText.style.display = "none";
  controlButtons.style.display = "none"; // Kontroll-Buttons verstecken
  speedControl.style.display = "none"; // Schieberegler verstecken
}

// Ping-Pong-Animation für "BREAK"
const pauseText = document.getElementById("pauseText");

let posX = 50;
let posY = 50;

function moveText() {
  if (isMoving) { // Nur bewegen, wenn isMoving true ist
    posX += speedX;
    posY += speedY;

    if (posX + pauseText.offsetWidth >= window.innerWidth || posX <= 0) {
      speedX = -speedX;
    }
    if (posY + pauseText.offsetHeight >= window.innerHeight || posY <= 0) {
      speedY = -speedY;
    }

    pauseText.style.left = posX + "px";
    pauseText.style.top = posY + "px";
  }

  // Fortlaufende Animation
  requestAnimationFrame(moveText);
}

// Stelle sicher, dass die Animation einmalig beim Laden der Seite initiiert wird
requestAnimationFrame(moveText);

// Funktion zum Anpassen der Geschwindigkeit
function adjustSpeed(value) {
  // Der Wert des Schiebereglers bestimmt die Geschwindigkeit; je höher, desto schneller
  const speedFactor = parseFloat(value);
  speedX = speedFactor;
  speedY = speedFactor;
}
