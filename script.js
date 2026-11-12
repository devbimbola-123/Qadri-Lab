
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
  if (className) line.className = className;
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

// Menu clicks — event delegation also supports generated buttons
document.addEventListener("click", event => {
  const toolButton = event.target.closest("[data-tool]");

  if (toolButton) {
    openModule(toolButton.dataset.tool);
  }
});

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  printLine("Theme changed.", "green");
});

document.getElementById("clearBtn").addEventListener("click", clearTerminal);

// TERMINAL COMMANDS
document.getElementById("commandForm").addEventListener("submit", event => {
  event.preventDefault();

  const command = commandInput.value.trim();
  if (!command) return;

  printLine("operator@qadri:~$ " + command, "green");
  commandInput.value = "";

  const parts = command.toLowerCase().split(/\s+/);
  const name = parts[0];

  switch (name) {
    case "help":
      printLines([
        "Available commands:",
        "help      - Show commands",
        "about     - About Qadri Pro",
        "date      - Show current date and time",
        "system    - Open browser information",
        "network   - Open network command guide",
        "password  - Open password strength checker",
        "generate  - Open number generator",
        "theme     - Switch dashboard theme",
        "clear     - Clear terminal"
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
      document.body.classList.toggle("light-theme");
      printLine("Theme changed.", "green");
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
