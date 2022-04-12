var calcContainerEle = document.querySelector("#calculator-container");
calcContainerEle.addEventListener("click", (e) => onButtonClick(e));

var resultEle = document.querySelector("#result");

var operationSymbolMap = {
  "/": "divide",
  "+": "add",
  "-": "minus",
  x: "multiply",
};

var curOperation, curNumber1, curNumber2;
var activeOperationBtnEle;

function compute(num1, num2, op) {
  var n1 = Number(num1);
  var n2 = Number(num2);
  let result;
  switch (op) {
    case "+":
      result = n1 + n2;
      break;
    case "-":
      result = n1 - n2;
      break;
    case "/":
      result = n1 / n2;
      break;
    case "x":
      result = n1 * n2;
  }
  return result;
}

function doNumber(num) {
  let newNum;
  if (curOperation) {
    curNumber2 = curNumber2 ? `${curNumber2}` : num;
    newNum = curNumber2;
  } else {
    curNumber1 = curNumber1 ? `${curNumber1}${num}` : num;
    newNum = curNumber1;
  }
  resultEle.innerHTML = newNum;
}

function doOperation(operation) {
  var prevOperation = curOperation;
  // if curNumber2 is active, then must be a continuous operation
  // so perform curOperation on num1 and num2 and assign result to num1
  if (curNumber2) {
    var result = compute(curNumber1, curNumber2, curOperation);
    curNumber1 = result;
    curNumber2 = 0;
    result.innerHTML = result;
  }
  curOperation = operation;

  // make prev selected operation unactive (if necesssary)
  if (prevOperation) {
    var prevBtnEle = document.querySelector(
      `#${operationSymbolMap[prevOperation]}`
    );
    prevBtnEle.classList.remove("active");
  }
}

function reset(lastComputedNum) {
  if (activeOperationBtnEle) {
    activeOperationBtnEle.classList.remove("active");
    activeOperationBtnEle = null;
  }
  if (lastComputedNum !== undefined) {
    // equal button clicked
    curNumber1 = lastComputedNum;
  } else {
    // reset button clicked
    curNumber1 = null;
    resultEle.innerHTML = "0";
  }
  curNumber2 = null;
  curOperation = null;
}

function makePosNeg() {
  if (curNumber1 || curNumber2) {
    var newNumber;
    if (curNumber2) {
      newNumber = curNumber2 * -1;
      curNumber2 = newNumber;
    } else {
      newNumber = curNumber1 * -1;
      curNumber1 = newNumber;
    }
    resultEle.innerHTML = newNumber;
  }
}

function makeDecimal() {
  function appendDecimal(n) {
    var numStr = n !== undefined ? n.toString() : "0";
    if (!numStr.includes(".")) {
      numStr = `${numStr}.`;
    }
    return numStr;
  }

  if (curOperation) {
    // curNumber2 decimal
    var nStr = appendDecimal(curNumber2);
    resultEle.innerHTML = nStr;
    curNumber2 = nStr;
  } else {
    // curNumber1 decimal
    var nStr = appendDecimal(curNumber1);
    resultEle.innerHTML = nStr;
    curNumber1 = nStr;
  }
}

function doEqual() {
  if (curNumber1 && curNumber2 && curOperation) {
    var result = compute(curNumber1, curNumber2, curOperation);
    resultEle.innerHTML = result;
    reset(result);
  }
}

// event listener
function onButtonClick(e) {
  var btnClickedValue = e.target.innerHTML;
  if (Number.isInteger(parseInt(btnClickedValue))) {
    doNumber(btnClickedValue);
    debug();
    return;
  }

  switch (btnClickedValue) {
    case "AC":
      reset();
      break;
    case "+/-":
      makePosNeg();
      break;
    case "/":
      doOperation("/");
      break;
    case "x":
      doOperation("x");
      break;
    case "-":
      doOperation("-");
      break;
    case "+":
      doOperation("+");
      break;
    case ".":
      makeDecimal();
      break;
    case "=":
      doEqual();
      break;
    default:
      break;
  }
  debug();
}

function debug() {
  document.querySelector("#curNumber1").innerHTML = curNumber1;
  document.querySelector("#curNumber2").innerHTML = curNumber2;
  document.querySelector("#curOperation").innerHTML = curOperation;
}
