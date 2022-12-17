//  Part 1: used Js render HTML ra UI
const root = document.querySelector("#calculator");
const calcElements = [
  "%",
  "C",
  "<=",
  "÷",
  "1",
  "2",
  "3",
  "*",
  "4",
  "5",
  "6",
  "+",
  "7",
  "8",
  "9",
  "-",
  "+/-",
  "0",
  ".",
  "=",
];
const createElement = (ele, eleType, eleId, eleVal, elePlaceH, cls) => {
  const element = document.createElement(ele);
  element.type = eleType;
  element.id = eleId;
  if (eleVal) element.value = eleVal;
  if (elePlaceH) element.placeholder = elePlaceH;
  if (cls) element.classList.add(cls);
  //   root.appendChild(element);
  root.append(element);
};

createElement("div", "", "output");
createElement("input", "text", "history-operand");
createElement("input", "text", "previous-operand");
createElement("input", "text", "current-operand");

calcElements.forEach(function (e, index) {
  if (e == "<=" || e == "%" || e == "%" || e == "C" || e == "+/-") {
    createElement("input", "button", `btn-${index}`, e, "", "other");
  } else if (e == "+" || e == "-" || e == "*" || e == "÷") {
    createElement("input", "button", `btn-${index}`, e, "", "operator");
  } else if (e == "=") {
    createElement("input", "button", `btn-${index}`, e, "", "btn-equal");
  } else {
    createElement("input", "button", `number`, e, "", "btn");
  }
});
const divOutput = document.querySelector("#output");
const history = document.querySelector("#history-operand");
divOutput.append(history);
const prev = document.querySelector("#previous-operand");
divOutput.append(prev);
const current = document.querySelector("#current-operand");
divOutput.append(current);
