const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const screen = document.querySelector(".screen");
let displayData = {
    totalSlots: 1,
    totalDigits: 0,
    elements: [],
    operators: {

    }

};

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            add(a, b);
        case "-":
            subtract(a, b);
        case "*":
            multiply(a, b);
        case "/":
            divide(a, b);
        default: return "Invalid Operation!";
    };
};

function clear() {
    document.querySelector(".screen").innerHTML = "0<span></span>";
    displayData.totalDigits = 0;
    displayData.totalSlots = 1;
    displayData.elements = [];
    displayData.operators = [];
};

function display(el) {
    console.log("displayDig was called");
    
    displayData.elements.push(el);
    let displayString = displayData.elements.reduce((str, el) => {
        return str + el;
    },"");
    
    displayData.totalDigits++;
    document.querySelector(".screen").innerHTML = displayString+"<span></span>";
};

function indexOfNode(element, nList) {
    for (let i = 0; i < nList.length; i++) {
        if (nList[i] === element) {
            return i;
        }
        return null;
    }
};

document.querySelector(".clear").addEventListener("click", clear);

const digits = document.querySelectorAll(".digit");

digits.forEach(e => {
    e.addEventListener("click", function(){
        display(e.getAttribute("data-num"));
    });
});

const operators = document.querySelectorAll(".operator");

operators.forEach(e => {
    e.addEventListener("click", () => {
        display(e.getAttribute("data-op"));
    });
});