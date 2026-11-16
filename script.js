
const output = document.getElementById("output");
const toolContent = document.getElementById("toolContent");
const commandInput = document.getElementById("commandInput");

// MATRIX BACKGROUND
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
const chars = "01ABCDEF<>/{}[]$#";
const fontSize = 14;
let columns = 0;
let drops = [];

function resizeMatrix() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  columns = Math.ceil(window.innerWidth / fontSize);
  drops = Array.from(
    { length: columns },
    () => Math.random() * -100
  );
}

function drawMatrix() {
  ctx.fillStyle = document.body.classList.contains("light-theme")
    ? "rgba(234,243,237,0.13)"
    : "rgba(2,8,5,0.13)";

  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = document.body.classList.contains("light-theme")
    ? "#087c45"
    : "#20ff91";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (
      drops[i] * fontSize > window.innerHeight &&
      Math.random() > 0.975
    ) {
      drops[i] = 0;
    }

    drops[i] += 0.7;
  }

  requestAnimationFrame(drawMatrix);
}

resizeMatrix();
drawMatrix();
window.addEventListener("resize", resizeMatrix);

// TERMINAL OUTPUT
function printLine(message, className = "") {
  const line = document.createElement("p");
  line.textContent = message;

  line.classList.add("terminal-line");

  if (className) line.classList.add(className);

  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function printLines(lines) {
  lines.forEach(line => printLine(line));
}

function clearTerminal() {
  output.replaceChildren();
  printLine("Terminal cleared.");
  printLine("Type help to view available commands.", "green");
}

// DASHBOARD MODULES
const modules = {
  dashboard() {
    toolContent.innerHTML = `
      <p class="eyebrow">QUICK ACTIONS</p>
      <h2>Control Center</h2>
      <p class="muted">Select a module to get started.</p>
      <button class="action-btn" data-tool="system">⌘ System information</button>
      <button class="action-btn" data-tool="network">⌁ Network guide</button>
      <button class="action-btn" data-tool="password">◇ Password strength checker</button>
      <button class="action-btn" data-tool="generator">⚡ Number generator</button>
    `;
  },

  system() {
    toolContent.innerHTML = `
      <p class="eyebrow">SYSTEM MODULE</p>
      <h2>Browser Information</h2>
      <p class="muted">Information available to this webpage.</p>
      <div class="result" id="systemResult"></div>
    `;

    const result = document.getElementById("systemResult");
    const details = [
      ["Platform", navigator.platform || "Not available"],
      ["Language", navigator.language || "Not available"],
      ["Screen", `${screen.width} × ${screen.height}`],
      ["Browser", navigator.userAgent]
    ];

    details.forEach(([label, value]) => {
      const row = document.createElement("p");
      row.textContent = `${label}: ${value}`;
      result.appendChild(row);
    });
  },

  network() {
    toolContent.innerHTML = `
      <p class="eyebrow">NETWORK MODULE</p>
      <h2>Network Guide</h2>
      <p class="muted">Learn the basic Windows networking commands.</p>
      <div class="result">
        <p><strong>ipconfig</strong> — View network adapter details.</p>
        <p><strong>ping example.com</strong> — Test connectivity to a host.</p>
        <p><strong>tracert example.com</strong> — Inspect the route to a host.</p>
        <p><strong>nslookup example.com</strong> — Query DNS information.</p>
      </div>
      <p class="muted" style="margin-top:12px">
        To run these commands, open Windows CMD separately.
        This webpage does not execute them.
      </p>
    `;
  },

  password() {
    toolContent.innerHTML = `
      <p class="eyebrow">SECURITY MODULE</p>
      <h2>Password Strength</h2>
      <p class="muted">Test an example password locally in this page.</p>
      <input id="passwordInput" type="password"
        autocomplete="off" placeholder="Enter a test password">
      <button class="action-btn" id="checkPassword">Check strength</button>
      <div id="passwordResult" class="result">
        Your result will appear here.
      </div>
      <p class="muted" style="margin-top:10px">
        Do not enter a real password. This is a basic educational estimate.
      </p>
    `;

    document.getElementById("checkPassword").addEventListener("click", () => {
      const value = document.getElementById("passwordInput").value;
      const result = document.getElementById("passwordResult");

      if (!value) {
        result.textContent = "Enter a test password first.";
        return;
      }

      let score = 0;
      if (value.length >= 12) score++;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
      if (/\d/.test(value)) score++;
      if (/[^A-Za-z0-9]/.test(value)) score++;

      const labels = [
        "Very weak",
        "Weak",
        "Fair",
        "Good",
        "Stronger by these basic checks"
      ];

      result.textContent =
        labels[score] + " — " +
        (value.length < 12
          ? "Try a longer, unique passphrase."
          : "Length check passed.");
    });
  },

  generator() {
    toolContent.innerHTML = `
      <p class="eyebrow">UTILITY MODULE</p>
      <h2>Number Generator</h2>
      <p class="muted">Generate a random number between 1 and 999999.</p>
      <button class="action-btn" id="generateNumber">⚡ Generate</button>
      <div class="result" id="numberResult">Ready.</div>
    `;

    document.getElementById("generateNumber").addEventListener("click", () => {
      document.getElementById("numberResult").textContent =
        "Generated number: " + (Math.floor(Math.random() * 999999) + 1);
    });
  },

    cyberLab() {
    toolContent.innerHTML = `
      <p class="eyebrow">QADRI PRO / CYBER LAB</p>
      <h2>Cybersecurity Learning Center</h2>
      <p class="muted">
        Explore cybersecurity concepts through safe interactive lessons.
      </p>

      <div class="result">
        <h3>🛡️ Welcome to Cyber Lab</h3>
        <p>Select a learning module to begin.</p>
      </div>

      <button class="action-btn" data-lab="network">
        🌐 Network Explorer
      </button>

      <button class="action-btn" data-lab="password">
        🔐 Password Security Lab
      </button>

      <button class="action-btn" data-lab="phishing">
        🎣 Phishing Awareness
      </button>

      <button class="action-btn" data-lab="commands">
        💻 Command Simulator
      </button>
    `;
  }


};


function openModule(name) {
  if (!modules[name]) return;

  modules[name]();

  document.querySelectorAll(".nav-btn[data-tool]").forEach(button => {
    button.classList.toggle("active", button.dataset.tool === name);
  });

  printLine("Module opened: " + name, "green");
}


function networkExplorer() {
  toolContent.innerHTML = `
    <p class="eyebrow">CYBER LAB / NETWORK EXPLORER</p>
    <h2>Network Explorer 🌐</h2>

    <p class="muted">
      Learn how devices communicate across networks.
    </p>

    <div class="result">
      <h3>🌍 What is an IP Address?</h3>
      <p>
        An IP address is a numerical address used to identify
        a device on a network.
      </p>
    </div>

    <div class="result">
      <h3>📡 What is a Router?</h3>
      <p>
        A router connects different networks and directs
        data between them.
      </p>
    </div>

    <div class="result">
      <h3>🔎 What is DNS?</h3>
      <p>
        DNS translates website names into IP addresses
        that computers can use.
      </p>
    </div>

    <div class="result">
      <h3>🧠 Quick Knowledge Check</h3>
      <p>Which system translates domain names into IP addresses?</p>

      <button class="action-btn" data-answer="wrong">
        Router
      </button>

      <button class="action-btn" data-answer="correct">
        DNS
      </button>

      <button class="action-btn" data-answer="wrong">
        Keyboard
      </button>

      <p id="networkFeedback"></p>
    </div>

    <button class="action-btn" data-lab="home">
      ← Back to Cyber Lab
    </button>
  `;
}


function passwordLab() {
  toolContent.innerHTML = `
    <p class="eyebrow">CYBER LAB / PASSWORD SECURITY</p>
    <h2>Password Security 🔐</h2>

    <p class="muted">
      Learn what makes a password difficult to guess.
    </p>

    <div class="result">
      <h3>🔑 Password length</h3>
      <p>Longer passwords are generally harder to guess.</p>
    </div>

    <div class="result">
      <h3>🔠 Character variety</h3>
      <p>Use a mixture of uppercase letters, lowercase letters,
      numbers and symbols.</p>
    </div>

    <div class="result">
      <h3>🚫 Avoid predictable information</h3>
      <p>Avoid names, birthdays, common words and obvious sequences.</p>
    </div>

    <div class="result">
      <h3>🧠 Security tip</h3>
      <p>Use a unique password for every account.
      Never share your passwords.</p>
    </div>


    <div class="result">
      <h3>🧪 Password Strength Demo</h3>

      <p>Use a fictional sample password for this demo.</p>

      <input
        type="text"
        id="passwordInput"
        placeholder="Enter a sample password..."
      >

      <h3 id="strengthText">Strength: Not tested</h3>

      <div class="strength-bar">
        <div id="strengthFill"></div>
      </div>

      <p id="passwordFeedback"></p>
    </div>


    <button class="action-btn" data-lab="home">
      ← Back to Cyber Lab
    </button>
  `;
}


function phishingLab() {
  toolContent.innerHTML = `
    <p class="eyebrow">CYBER LAB / PHISHING AWARENESS</p>

    <h2>Phishing Awareness 🎣</h2>

    <p class="muted">
      Learn how to recognise suspicious messages online.
    </p>

    <div class="result">
      <h3>🚩 Warning Sign 1: Urgency</h3>
      <p>Messages pressuring you to act immediately may be suspicious.</p>
    </div>

    <div class="result">
      <h3>🚩 Warning Sign 2: Strange Links</h3>
      <p>Unexpected links or unfamiliar website addresses deserve caution.</p>
    </div>

    <div class="result">
      <h3>🚩 Warning Sign 3: Personal Information</h3>
      <p>Never share passwords or verification codes through unexpected messages.</p>
    </div>

    <div class="result">
      <h3>🧠 Quick Knowledge Check</h3>
      <p>A message claims your account will be closed unless you click an unfamiliar link. What should you do?</p>

      <button class="action-btn" data-phishing="wrong">
        Click immediately
      </button>

      <button class="action-btn" data-phishing="correct">
        Verify through the official website
      </button>

      <button class="action-btn" data-phishing="wrong">
        Share your password
      </button>

      <p id="phishingFeedback"></p>
    </div>

    <button class="action-btn" data-lab="home">
      ← Back to Cyber Lab
    </button>
  `;
}



function checkPasswordStrength() {
  const input = document.getElementById("passwordInput");
  const strengthText = document.getElementById("strengthText");
  const strengthFill = document.getElementById("strengthFill");
  const feedback = document.getElementById("passwordFeedback");

  if (!input || !strengthText || !strengthFill || !feedback) return;

  const password = input.value;
  let score = 0;

  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (!password) {
    strengthText.textContent = "Strength: Not tested";
    strengthFill.style.width = "0%";
    feedback.textContent = "";
    return;
  }

  if (score <= 1) {
    strengthText.textContent = "Strength: Weak";
    strengthFill.style.width = "25%";
    feedback.textContent = "Try a longer, less predictable sample.";
  } else if (score <= 3) {
    strengthText.textContent = "Strength: Medium";
    strengthFill.style.width = "60%";
    feedback.textContent = "Good start! Add more variety.";
  } else {
    strengthText.textContent = "Strength: Strong";
    strengthFill.style.width = "100%";
    feedback.textContent = "Great! Your sample meets these checks.";
  }
}


document.addEventListener("input", event => {
  if (event.target.id === "passwordInput") {
    checkPasswordStrength();
  }
});





document.addEventListener("click", event => {
  const answerButton = event.target.closest("[data-answer]");

  if (answerButton) {
    const feedback = document.getElementById("networkFeedback");

    if (feedback) {
      feedback.textContent =
        answerButton.dataset.answer === "correct"
          ? "CORRECT! DNS translates domain names into IP addresses."
          : "Not quite! Try again.";
    }
    return;
  }

  const phishingAnswer = event.target.closest("[data-phishing]");

if (phishingAnswer) {
  const feedback = document.getElementById("phishingFeedback");

  if (feedback) {
    feedback.textContent =
      phishingAnswer.dataset.phishing === "correct"
        ? "CORRECT! Always verify suspicious messages through official channels."
        : "Not quite! Never trust unexpected messages asking you to click links or share information.";
  }

  return;
}

  const labButton = event.target.closest("[data-lab]");
  if (!labButton) return;

  const lab = labButton.dataset.lab;

  if (lab === "network") {
    networkExplorer();
  } else if (lab === "home") {
  modules.cyberLab();
} else if (lab === "password") {
  passwordLab();
}
else if (lab === "phishing") {
  phishingLab();
}
else if (lab === "commands") {
  commandSimulator();
}

function commandSimulator() {
  toolContent.innerHTML = `
    <p class="eyebrow">CYBER LAB / COMMAND SIMULATOR</p>

    <h2>Command Simulator 💻</h2>

    <p class="muted">
      Practise basic terminal commands in a safe environment.
    </p>

    <div class="result">
      <h3>Available Commands</h3>
      <p><strong>help</strong> — Show available commands</p>
      <p><strong>whoami</strong> — Display simulated user</p>
      <p><strong>date</strong> — Display today's date</p>
      <p><strong>clear</strong> — Clear the simulator</p>
    </div>

    <div class="result">
      <div id="simOutput">
        QADRI SIMULATOR v1.0<br>
        Type help to begin.
      </div>

      <input
        type="text"
        id="simInput"
        placeholder="Enter a command..."
      >

      <button class="action-btn" id="runSim">
        Run Command
      </button>
    </div>

    <button class="action-btn" data-lab="home">
      ← Back to Cyber Lab
    </button>
  `;
}


function runSimCommand() {
  const input = document.getElementById("simInput");
  const output = document.getElementById("simOutput");

  if (!input || !output) return;

  const command = input.value.trim().toLowerCase();

  if (!command) return;

  let response = "";

  switch (command) {
    case "help":
      response = "Available commands: help, whoami, date, clear";
      break;

    case "whoami":
      response = "Simulated user: QADRI_GUEST";
      break;

    case "date":
      response = "Simulator date: " + new Date().toLocaleDateString();
      break;

    case "clear":
      output.innerHTML = "QADRI SIMULATOR v1.0<br>Screen cleared.";
      input.value = "";
      return;

    default:
      response = "Command not recognised. Type help.";
  }

  output.innerHTML +=
    "<br><span style='color:#00ff88'>guest@qadri:~$ " +
    command +
    "</span><br>" +
    response;

  input.value = "";
}

document.addEventListener("click", event => {
  if (event.target.id === "runSim") {
    runSimCommand();
  }
});

document.addEventListener("keydown", event => {
  if (
    event.key === "Enter" &&
    event.target.id === "simInput"
  ) {
    runSimCommand();
  }
});


});





// Menu clicks — event delegation also supports generated buttons
document.addEventListener("click", event => {
  const toolButton = event.target.closest("[data-tool]");

  if (toolButton) {
    openModule(toolButton.dataset.tool);
  }
});

const themes = [
  "matrix",
  "light-theme",
  "blue-theme",
  "purple-theme",
  "crimson-theme",
  "golden-theme"
];

let currentTheme = 0;
// RESTORE SAVED THEME
const savedTheme = localStorage.getItem("qadriTheme");

if (savedTheme && themes.includes(savedTheme)) {
  currentTheme = themes.indexOf(savedTheme);

  if (savedTheme !== "matrix") {
    document.body.classList.add(savedTheme);
  }
}

function changeTheme() {
  currentTheme = (currentTheme + 1) % themes.length;

  document.body.classList.remove(
    "light-theme",
    "blue-theme",
    "purple-theme",
    "crimson-theme",
    "golden-theme"
  );

  if (themes[currentTheme] !== "matrix") {
    document.body.classList.add(themes[currentTheme]);
  }

  localStorage.setItem("qadriTheme", themes[currentTheme]);

  printLine("Theme changed to: " + themes[currentTheme], "green");
}

document.getElementById("themeBtn").addEventListener("click", changeTheme);

document.getElementById("clearBtn").addEventListener("click", clearTerminal);

// TERMINAL COMMAND HISTORY
const commandHistory = [];
let historyIndex = 0;
commandInput.addEventListener("keydown", (event) => {

  if (event.key === "ArrowUp") {
    event.preventDefault();

    if (historyIndex > 0) {
      historyIndex--;
      commandInput.value = commandHistory[historyIndex];
    }
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();

    if (historyIndex < commandHistory.length) {
      historyIndex++;
    }

    commandInput.value =
      commandHistory[historyIndex] || "";
  }

});
document.getElementById("commandForm").addEventListener("submit", event => {
  event.preventDefault();

  const command = commandInput.value.trim();
if (!command) return;

// Save command to history
commandHistory.push(command);
historyIndex = commandHistory.length;

printLine("User@qadri:~$ " + command, "green");
commandInput.value = "";

  const parts = command.toLowerCase().split(/\s+/);
  const name = parts[0];

  switch (name) {
    case "help":
  printLines([
    "================================",
    "       QADRI PRO COMMANDS",
    "================================",
    "help      - Show all commands",
    "about     - About Qadri Pro",
    "whoami    - Operator information",
    "history   - Previous commands",
    "date      - Current date and time",
    "matrix    - Matrix visual status",
    "system    - Browser information",
    "network   - Network learning guide",
    "password  - Password checker",
    "generate  - Number generator",
    "theme     - Change dashboard theme",
    "clear     - Clear terminal",
    "neofetch  - Display QADRI PRO system summary",
    "================================"
  ]);
  break;
      case "whoami":
  printLines([
    "OPERATOR: QADRI USER",
    "PLATFORM: QADRI PRO",
    "ACCESS: LOCAL DEMO",
    "STATUS: ACTIVE"
  ]);
  break;

case "history":
  if (commandHistory.length === 0) {
    printLine("No commands recorded yet.");
  } else {
    commandHistory.forEach((item, index) => {
      printLine(`${index + 1}. ${item}`);
    });
  }
  break;

case "matrix":
  printLines([
    "MATRIX VISUAL STATUS: ACTIVE",
    "VISUAL ENGINE: RUNNING",
    "COLOR: NEON GREEN"
  ]);
  break;

  case "neofetch":
  printLines([
    " ",
    "       ██████╗  ██████╗ ",
    "      ██╔═══██╗██╔═══██╗",
    "      ██║   ██║██║   ██║",
    "      ██║   ██║██║   ██║",
    "      ╚██████╔╝╚██████╔╝",
    "       ╚═════╝  ╚═════╝ ",
    " ",
    "     Q A D R I   P R O",
    "--------------------------------",
    " OS       : QADRI PRO WEB",
    " VERSION  : 2.0",
    " INTERFACE: CYBER DASHBOARD",
    " THEME    : " + (themes[currentTheme] || "matrix"),
    " ENGINE   : JAVASCRIPT",
    " STATUS   : ONLINE",
    " ACCESS   : LOCAL DEMO",
    "--------------------------------",
    " LEARN  |  BUILD  |  SECURE",
    " "
  ]);
  break;

    case "about":
      printLine("Qadri Pro V2.0 — A browser-based learning dashboard.");
      break;

    case "date":
      printLine(new Date().toLocaleString());
      break;

    case "system":
      openModule("system");
      break;

    case "network":
      openModule("network");
      break;

    case "password":
      openModule("password");
      break;

    case "generate":
      openModule("generator");
      break;

    case "theme":
  changeTheme();
  break;

    case "clear":
      clearTerminal();
      break;

    default:
      printLine("Unknown command. Type help to see available commands.");
  }
});

document.getElementById("toolCount").textContent =
  String(Object.keys(modules).length).padStart(2, "0");

  const difficultyButtons = document.querySelectorAll(".difficulty-btn");

difficultyButtons.forEach(button => {
  button.addEventListener("click", () => {

    difficultyButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const level = button.dataset.level;

    selectedDifficulty = level;
    currentQuestion = 0;
    quizScore = 0;

    document.getElementById("next-question").textContent =
      "Next Question →";

    loadQuestion();

    printLine("Difficulty changed to: " + level, "green");
  });
});


const quizQuestions = {
  beginner: [
    {
      question: "What does HTTPS help protect?",
      options: [
        "Internet connection speed",
        "Data exchanged with a website",
        "Computer battery",
        "Screen brightness"
      ],
      answer: 1
    },
    {
      question: "Which is the strongest password practice?",
      options: [
        "Using your name",
        "Using 123456",
        "Using a long, unique password",
        "Using your birthday"
      ],
      answer: 2
    }
  ],

  intermediate: [
    {
      question: "What is phishing?",
      options: [
        "A type of computer hardware",
        "A deceptive attempt to steal information",
        "A software update",
        "A programming language"
      ],
      answer: 1
    },
    {
      question: "What does two-factor authentication add?",
      options: [
        "An extra verification step",
        "More storage",
        "Faster internet",
        "A new operating system"
      ],
      answer: 0
    }
  ],

  advanced: [
    {
      question: "What is the main purpose of a firewall?",
      options: [
        "Edit images",
        "Manage screen brightness",
        "Monitor and control network traffic",
        "Create documents"
      ],
      answer: 2
    },
    {
      question: "What does encryption do?",
      options: [
        "Deletes all files",
        "Transforms data into a protected form",
        "Increases processor speed",
        "Removes software bugs"
      ],
      answer: 1
    }
  ]
};

let selectedDifficulty = "beginner";
let currentQuestion = 0;
let quizScore = 0;
let totalXP = Number(localStorage.getItem("qadriXP")) || 0;

const achievements = [
  { id: "badge-first", xp: 10 },
  { id: "badge-learner", xp: 50 },
  { id: "badge-expert", xp: 100 }
];


function updateLevel() {
  const levels = [
    { name: "ROOKIE", min: 0, max: 50 },
    { name: "EXPLORER", min: 50, max: 100 },
    { name: "CYBER LEARNER", min: 100, max: 200 },
    { name: "SECURITY SPECIALIST", min: 200, max: 350 },
    { name: "ELITE", min: 350, max: 500 }
  ];

  const current = levels.find(level =>
    totalXP >= level.min && totalXP < level.max
  ) || levels[levels.length - 1];

  const progress = Math.min(
    100,
    ((totalXP - current.min) /
    (current.max - current.min)) * 100
  );

  document.getElementById("user-level").textContent =
    `LEVEL ${levels.indexOf(current) + 1} — ${current.name}`;

  document.getElementById("level-progress-text").textContent =
    `${totalXP} / ${current.max} XP`;

  document.getElementById("level-progress-fill").style.width =
    `${progress}%`;
}


function updateXP() {
  document.getElementById("quiz-xp").textContent =
    `XP: ${totalXP}`;

  localStorage.setItem("qadriXP", totalXP);

  achievements.forEach(achievement => {
    const badge = document.getElementById(achievement.id);

    if (totalXP >= achievement.xp) {
  badge.classList.add("unlocked");
  badge.classList.remove("locked");

  const alreadyUnlocked =
    localStorage.getItem(achievement.id) === "unlocked";

  if (!alreadyUnlocked) {
    localStorage.setItem(achievement.id, "unlocked");

    showAchievementToast(
      badge.querySelector("small").previousSibling.textContent.trim()
    );
  }
}
  });
}

function showAchievementToast(message) {
  const toast = document.getElementById("achievement-toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message + " unlocked!";
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

updateXP();
let questionAnswered = false;

function loadQuestion() {
  const questions = quizQuestions[selectedDifficulty];
  const question = questions[currentQuestion];

  questionAnswered = false;

  document.getElementById("question-count").textContent =
    `QUESTION ${currentQuestion + 1} / ${questions.length}`;

  document.getElementById("quiz-score").textContent =
    `SCORE: ${quizScore}`;

  document.getElementById("quiz-question").textContent =
    question.question;

  document.getElementById("quiz-feedback").textContent = "";

  document.getElementById("next-question").disabled = true;

  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    optionsContainer.appendChild(button);
  });
}


function checkAnswer(selectedIndex) {
  if (questionAnswered) return;

  questionAnswered = true;

  const question = quizQuestions[selectedDifficulty][currentQuestion];
  const feedback = document.getElementById("quiz-feedback");
  const options = document.querySelectorAll(".quiz-option");

  options.forEach(button => {
    button.disabled = true;
    button.style.cursor = "not-allowed";
  });

  if (selectedIndex === question.answer) {
    totalXP += 10;
    updateXP();

    quizScore++;

    feedback.textContent = "CORRECT! Excellent work.";
    feedback.style.color = "var(--green)";

  } else {
    feedback.textContent = "Not quite! Try the next question.";
    feedback.style.color = "#fb7185";
  }

  document.getElementById("quiz-score").textContent =
    `SCORE: ${quizScore}`;

  document.getElementById("next-question").disabled = false;

  updateLevel();
}


function nextQuestion() {
  const questions = quizQuestions[selectedDifficulty];

  currentQuestion++;

  if (currentQuestion >= questions.length) {
    document.getElementById("quiz-question").textContent =
      "Challenge completed!";

    document.getElementById("quiz-options").innerHTML = "";

    document.getElementById("quiz-feedback").textContent =
      `Final score: ${quizScore} / ${questions.length}`;

    document.getElementById("question-count").textContent =
      "COMPLETED";

    document.getElementById("next-question").disabled = true;
    document.getElementById("next-question").textContent = "Completed";
    return;
  }

  loadQuestion();
}

document.getElementById("next-question")
  .addEventListener("click", nextQuestion);

loadQuestion();
updateLevel();


// QADRI PRO DAILY CHALLENGE ENGINE

const dailyQuestions = [
  {
    question: "Which action helps protect your online accounts?",
    options: [
      "Sharing your password",
      "Using two-factor authentication",
      "Using the same password everywhere",
      "Ignoring security updates"
    ],
    answer: 1
  },
  {
    question: "What should you do with a suspicious email link?",
    options: [
      "Click immediately",
      "Forward it to everyone",
      "Verify the sender before interacting",
      "Enter your password"
    ],
    answer: 2
  },
  {
    question: "What is encryption used for?",
    options: [
      "Protecting information",
      "Increasing screen brightness",
      "Deleting applications",
      "Speeding up downloads"
    ],
    answer: 0
  },
  {
    question: "Why are software updates important?",
    options: [
      "They change your wallpaper",
      "They can fix security vulnerabilities",
      "They remove your files",
      "They disable passwords"
    ],
    answer: 1
  }
];

// Get today's date using the user's local calendar
function getDailyDate() {
  const date = new Date();

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

// Select a consistent question for each day
function getTodayQuestion() {
  const date = new Date();
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date - start) / 86400000);

  return dailyQuestions[day % dailyQuestions.length];
}

function loadDailyChallenge() {
  const today = getDailyDate();
  const question = getTodayQuestion();

  const optionsContainer =
    document.getElementById("daily-options");

  document.getElementById("daily-question").textContent =
    question.question;

  optionsContainer.innerHTML = "";

  const completedToday =
    localStorage.getItem("dailyCompleted") === today;

  dailyQuestions.length; // Question collection remains available.

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "daily-option";
    button.textContent = option;
    button.disabled = completedToday;

    button.addEventListener("click", () => {
      checkDailyAnswer(index);
    });

    optionsContainer.appendChild(button);
  });

  const streak =
    Number(localStorage.getItem("dailyStreak")) || 0;

  document.getElementById("daily-streak").textContent =
    `${streak} DAYS`;

  if (completedToday) {
    document.getElementById("daily-status").textContent =
      "MISSION STATUS: COMPLETED";

    document.getElementById("daily-feedback").textContent =
      "You've already completed today's mission. Come back tomorrow!";
  } else {
    document.getElementById("daily-status").textContent =
      "MISSION STATUS: PENDING";
  }
}

function checkDailyAnswer(selectedIndex) {
  const today = getDailyDate();

  if (localStorage.getItem("dailyCompleted") === today) {
    return;
  }

  const question = getTodayQuestion();
  const feedback = document.getElementById("daily-feedback");

  if (selectedIndex !== question.answer) {
    feedback.textContent = "Incorrect! Try another answer.";
    feedback.style.color = "#fb7185";
    return;
  }

  // Correct answer!
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayKey = [
    yesterday.getFullYear(),
    String(yesterday.getMonth() + 1).padStart(2, "0"),
    String(yesterday.getDate()).padStart(2, "0")
  ].join("-");

  const lastCompleted =
    localStorage.getItem("lastDailyCompleted");

  let streak =
    Number(localStorage.getItem("dailyStreak")) || 0;

  if (lastCompleted === yesterdayKey) {
    streak++;
  } else if (lastCompleted !== today) {
    streak = 1;
  }

  localStorage.setItem("dailyStreak", streak);
  localStorage.setItem("lastDailyCompleted", today);
  localStorage.setItem("dailyCompleted", today);

  totalXP += 25;
  updateXP();

  document.getElementById("daily-streak").textContent =
    `${streak} DAYS`;

  document.getElementById("daily-status").textContent =
    "MISSION STATUS: COMPLETED";

  feedback.textContent =
    "CORRECT! +25 XP earned. Daily mission complete!";

  feedback.style.color = "var(--green)";

  document.querySelectorAll(".daily-option").forEach(button => {
    button.disabled = true;
  });
}

// Start the daily challenge
loadDailyChallenge();


