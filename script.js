// Part 2 Logic
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  percent() {
    this.currentOperand = this.currentOperand / 100;
  }

  other() {
    this.currentOperand = -this.currentOperand;
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    // if (!this.currentOperand && this.previousOperand === "") return;
    if (this.currentOperand === "" && this.previousOperand === "") return;

    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    if (this.currentOperand) this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
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
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = computation;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.value = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.value = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation} ${this.currentOperand}`;
    } else {
      this.previousOperandTextElement.value = "";
    }
  }
}

const numberButtons = document.querySelectorAll("#number");
const operationButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".btn-equal");
const previousOperandTextElement = document.querySelector("#previous-operand");
const currentOperandTextElement = document.querySelector("#current-operand");
const deleteButton = document.querySelector("#btn-2");
const allClearButton = document.querySelector("#btn-1");
const percentButton = document.querySelector("#btn-0");
const other = document.querySelector("#btn-16");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.value);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.value);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

percentButton.addEventListener("click", () => {
  calculator.percent();
  calculator.updateDisplay();
});

other.addEventListener("click", () => {
  calculator.other();
  calculator.updateDisplay();
});
