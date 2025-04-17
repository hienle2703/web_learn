let display = document.querySelector('.display')
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys');

keys.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        const action = e.target.dataset.action;
        const key = e.target;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        document.querySelectorAll('.operator').forEach(k => k.classList.remove('is-depressed'));

        if (action) {
            if (action === 'decimal') {
                if (!displayedNum.includes('.')) {
                    display.textContent = displayedNum + '.';
                }
                calculator.dataset.previousKeyType = 'decimal';
            }

            if (action === 'clear') {
                display.textContent = '0';
                calculator.dataset.firstValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = 'clear';
            }

            if (
                action === 'add' ||
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide'
            ) {
                key.classList.add('is-depressed');

                if (calculator.dataset.firstValue && calculator.dataset.operator) {
                    const result = calculate(
                        calculator.dataset.firstValue,
                        calculator.dataset.operator,
                        displayedNum
                    );
                    display.textContent = result;
                    calculator.dataset.firstValue = result;
                } else {
                    calculator.dataset.firstValue = displayedNum;
                }

                calculator.dataset.operator = action;
                calculator.dataset.previousKeyType = 'operator';
            }

            if (action === 'calculate') {
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;

                if (firstValue && operator) {
                    const result = calculate(firstValue, operator, secondValue);
                    display.textContent = result;
                    calculator.dataset.firstValue = result;
                    calculator.dataset.operator = '';
                }

                calculator.dataset.previousKeyType = 'calculate';
            }
        } else {
            const keyContent = e.target.textContent;

            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }

            calculator.dataset.previousKeyType = 'number';
        }
    }
});

function calculate(n1, operator, n2) {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);
    let result = '';

    switch (operator) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                return 'Error';
            }
            result = num1 / num2;
            break;
    }

    return Math.round(result * 1000000000000) / 1000000000000;
}