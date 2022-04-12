var calcContainerEle = document.querySelector("#calculator" - container);
calcContainerEle.addEventListener("click", (e) => onButtonClick(e));

var resultEle = document.querySelector("#result");

var curOperation, curNumber1, curNumber2;

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
      //   if (n2 != 0) reset = n1 / n2;
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
  // if curNumber2 is active, then must be a continuous operation
  // so perform curOperation on num1 and num2 and assign result to num1
  if (curNumber2) {
    var result = compute(curNumber1, curNumber2, curOperation);
    curNumber1 = result;
    curNumber2 = 0;
    result.innerHTML = result;
  }
  curOperation = operation;
}

function reset() {
  console.log(reset);
}

function makePosNeg() {
  console.log("makePosNeg");
}

function makeDecimal() {
  console.log("makeDecimal");
}

function doEqual() {
  if (curNumber1 && curNumber2 && curOperation) {
    var result = compute(curNumber1, curNumber2, curOperation);
    resultEle.innerHTML = result;
  }
}

// event listener
function onButtonClick(e) {
  var btnClickedValue = e.target.innerHTML;
  if (Number.isInteger(parseInt(btnClickedValue))) {
    doNumber(btnClickedValue);
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
}
