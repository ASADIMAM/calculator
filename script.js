// script.js

document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));

    let currentOperand = '';
    let previousOperand = '';
    let operation = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentOperand = '';
                previousOperand = '';
                operation = null;
                updateDisplay();
            } else if (value === '=') {
                if (operation && currentOperand !== '' && previousOperand !== '') {
                    currentOperand = operate(previousOperand, currentOperand, operation);
                    operation = null;
                    previousOperand = '';
                    updateDisplay();
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentOperand === '' && previousOperand === '') return;
                if (currentOperand !== '') {
                    if (previousOperand === '') {
                        previousOperand = currentOperand;
                    } else {
                        previousOperand = operate(previousOperand, currentOperand, operation);
                    }
                    currentOperand = '';
                }
                operation = value;
                updateDisplay();
            } else {
                if (currentOperand.length >= 10) return; // Prevent overflow
                currentOperand += value;
                updateDisplay();
            }
        });
    });

    function updateDisplay() {
        display.innerText = currentOperand || previousOperand || '0';
    }

    function operate(num1, num2, operation) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        switch (operation) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            default:
                return num2;
        }
    }
});
