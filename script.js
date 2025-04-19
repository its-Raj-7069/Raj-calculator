let expr = "";

const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");

function appendValue(val) {
  expr += val;
  updateDisplay();
}

function appendOperator(op) {
  expr += ` ${op} `;
  updateDisplay();
}

function appendFunction(fn) {
  expr += fn;
  updateDisplay();
}

function clearAll() {
  expr = "";
  resultEl.innerText = "";
  updateDisplay();
}

function clearEntry() {
  expr = expr.trim().split(' ').slice(0, -1).join(' ') + ' ';
  updateDisplay();
}

function backspace() {
  expr = expr.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  expressionEl.innerText = expr;
}

function evaluateExpression() {
  try {
    const replaced = expr
      .replace(/√/g, "Math.sqrt")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/log/g, "Math.log10")
      .replace(/ln/g, "Math.log")
      .replace(/π/g, "Math.PI")
      .replace(/e/g, "Math.E")
      .replace(/\^/g, "**");
    const result = eval(replaced);
    resultEl.innerText = Number(result.toFixed(8));
  } catch (e) {
    resultEl.innerText = "Error";
  }
}

document.getElementById("themeBtn").addEventListener("click", () => {
  const theme = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute("data-theme", theme === "light" ? "dark" : "light");
});

document.addEventListener("keydown", (e) => {
  if (e.key.match(/[0-9\+\-\*\/\.\(\)]/)) appendValue(e.key);
  else if (e.key === "Enter") evaluateExpression();
  else if (e.key === "Backspace") backspace();
});
