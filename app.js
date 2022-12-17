const numberButtons = document.querySelectorAll("#number");
const operationButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".btn-equal");
const history = document.querySelector("#history-operand");
const previousOperandTextElement = document.querySelector("#previous-operand");
const currentOperandTextElement = document.querySelector("#current-operand");
const deleteButton = document.querySelector("#btn-2");
const allClearButton = document.querySelector("#btn-1");
const percentButton = document.querySelector("#btn-0");
const other = document.querySelector("#btn-16");

let historyNum = "";
let previousOperand = "";
let currentOperand = "";
let operator = "";

console.log(previousOperand);
const clear = () => {
  historyNum = "";
  previousOperand = "";
  currentOperand = "";
};

const deleteHandler = () => {
  currentOperand = currentOperand.slice(0, -1);
};

const percent = () => {
  currentOperand = currentOperand / 100;
};

const otherHandler = () => {
  currentOperand = -currentOperand;
};

const appendNumber = (number) => {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand + number;
  historyNum = historyNum + number;
};

const chooseOperation = (operation) => {
  historyNum = currentOperand + operation;

  if (currentOperand === "" && previousOperand === "") return;
  if (previousOperand !== "") {
    computeHandler();
  }
  if (currentOperand) previousOperand = currentOperand;
  currentOperand = "";
};

const computeHandler = (operation) => {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operator) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = Number(eval(computation).toFixed(8));
  previousOperand = "";
};

const updateDisplay = (operation) => {
  if (currentOperand === Infinity) {
    currentOperandTextElement.value = "Error";
  } else {
    currentOperandTextElement.value = currentOperand;
  }

  history.value = historyNum;
  if (operation != null) {
    history.value = historyNum;
  } else {
    previousOperandTextElement.value = "";
  }
};

// call function
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.value);
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.value;
    chooseOperation(button.value);
    updateDisplay(button.value);
  });
});

equalsButton.addEventListener("click", (button) => {
  computeHandler();
  updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  clear();
  updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  deleteHandler();
  updateDisplay();
});

percentButton.addEventListener("click", () => {
  percent();
  updateDisplay();
});

other.addEventListener("click", () => {
  otherHandler();
  updateDisplay();
});
