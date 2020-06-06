class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    changeSign() {
        this.currentOperand = -(this.currentOperand);
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        computation = eval(this.previousOperand + " " + this.operation + " " + this.currentOperand)
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }
}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const negateButton = document.querySelector('[data-negate]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
    button.addEventListener("click", function() {
        // console.log(button.innerText);
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});
operationButtons.forEach((button) => {
    button.addEventListener("click", function() {
        // console.log(button.innerText);
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});


equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
});

negateButton.addEventListener("click", button => {
    calculator.changeSign();
    calculator.updateDisplay();
});