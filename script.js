/* Variables */
let numberButtons = document.querySelectorAll("[data-number]");
let operatorButtons = document.querySelectorAll("[data-operator]");
let equalsButton = document.querySelector('#result');
let clearButton = document.querySelector('#clear');
let deleteButton = document.querySelector('#delete');
let numberField = document.querySelector('#number-field');
let currentNumber = "0";
let operationObject = {
    storedNumber: 0,
    storedOperator: ""
};

/* Functions */

function operate(operation) {
    switch (operation.operator) {
        case "+":
            return operation.firstNumber + operation.secondNumber;
        case "-":
            return operation.firstNumber - operation.secondNumber;
        case "x":
            return operation.firstNumber * operation.secondNumber;
        case "/":
            return operation.firstNumber / operation.secondNumber;
        case "%":
            return operation.firstNumber / 100;
        default:
            break;
    }
}

function addOperator(operator){
    // If it's the first operation, just stores the current number and executes 
    if (operationObject.storedOperator.length == 0) {
        operationObject.storedNumber = Number(currentNumber);
        currentNumber = "0"
    }
    
    // If operator is % you store it before executing the operation
    if (operator === "%")
        operationObject.storedOperator = operator;

    getResult();

    // After the operation it stores the latest operator
    operationObject.storedOperator = operator;
    
}

function getResult() {
    let result = 0;

    // Adds a plus if there is no operator
    if (operationObject.storedOperator.length === 0) {
        operationObject.storedOperator = "+"
    }

    // When trying to divide or multiply in chain and the current number is 0 it turns it into 1
    if (currentNumber === "0" && (operationObject.storedOperator === "/" || operationObject.storedOperator === "x" )) {
        currentNumber = 1;
    }

    // Executes the operation, if operator is % it only sends the displayed number and the operator
    if (operationObject.storedOperator === "%") {
        console.log({firstNumber: operationObject.storedNumber, operator: operationObject.storedOperator});
        result = operate({firstNumber: operationObject.storedNumber, operator: operationObject.storedOperator})
    } else {
        result = operate({firstNumber: operationObject.storedNumber, operator: operationObject.storedOperator, secondNumber: Number(currentNumber)});
        currentNumber = "0";
    }

    // Stores the result and turns current number into 0
    operationObject.storedNumber = result;
    currentNumber = "0";
    displayNumber(result);
}

function displayNumber(num) {
    numberField.innerHTML = "";
    numberField.innerHTML = num;
}

/*Adds event listener for numbers*/
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", () => {
        currentNumber = currentNumber + numberButton.dataset.number;
        if (currentNumber[0] === "0")
            currentNumber = currentNumber.slice(1);
        displayNumber(currentNumber);
    })
})

/*Adds event listener for operators*/
operatorButtons.forEach((opButton) => {
    opButton.addEventListener("click", () => {
        addOperator(opButton.dataset.operator);
    })
})

/* Event listener for other buttons */
// Equals
equalsButton.addEventListener("click", () => {
    getResult();
})
// Delete
deleteButton.addEventListener("click",() => { 
    currentNumber = currentNumber.slice(1);
    displayNumber(currentNumber);
})
// Clear
clearButton.addEventListener("click",() => {
    operationObject = {
        storedNumber: 0,
        storedOperator: ""
    };
    currentNumber = 0;
    displayNumber(currentNumber);
})

