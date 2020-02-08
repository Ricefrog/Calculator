const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
let divideByZero = false;
let tooManyOperators = false;

let numOfPlus = 0;
let numOfMinus = 0;
let numOfDiv = 0;
let numOfMult = 0;
let displayString;

const screen = document.querySelector(".screen");
let displayData = {
    totalSlots: 1,
    totalDigits: 0,
    elements: [],
    operators: {

    }

};


function operate(a, b, operator) {
    if (b == 0 && operator == "/") {
        console.log("divided by zero");
        displayMsg("FUCK YOU!");
        return null;
    };

    a = parseInt(a, 10);
    b = parseInt(b, 10);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default: return "Invalid Operation!";
    };
};

function clear() {
    document.querySelector(".screen").innerHTML = "0<span></span>";
    displayData.totalDigits = 0;
    displayData.totalSlots = 1;
    displayData.elements = [];
    displayData.operators = [];
    displayString = "";
};

//function to display messages
function displayMsg(str) {
    document.querySelector(".screen").innerHTML = str+"<span></span>";
};

//function to display an array on calculator screen
function display(el) {
    displayData.elements.push(el);
    displayString = displayData.elements.reduce((str, el) => {
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
        
        switch (e.getAttribute("data-op")) {
            case "+":
                numOfPlus++;
            case "-":
                numOfMinus++;
            case "*":
                numOfMult++;
            case "/":
                numOfDiv++;
        }
    });
});

const equalSign = document.querySelector(".equals");
equalSign.addEventListener("click", () => altEquals(displayString));

//these are related to doing the math



//when add operator is called

//function to check if an element is an operator
function isOperator(e) {
    return e == "+" || e == "-" || e == "*" || e == "/";
};

//creates a list of the current operators in the element list
function operatorList() {
    let ops = [];
    displayData.elements.forEach(e => {
        if (isOperator(e)) {
            ops.push(e);
        };
    });
    return ops;
};

//returns an array of the digits separated by operators
function digitChunks(displayStr) {
    let chunkArr = [""];
    let v = 0;
    for (let i = 0; i < displayStr.length; i++) {
        if (!isOperator(displayStr[i])) {
            chunkArr[v] = chunkArr[v]+displayStr[i];
        } else {
            v++;
            chunkArr[v] = "";
        };
    };
    chunkArr = chunkArr.filter(e => e != "");
    return chunkArr;
};

//function to replace two chunks in a chunkArray
function replaceChunks(indA, newChunk, chunkArr) {
    chunkArr.splice(indA, 2, newChunk);
};

//function to create an evaluation list
function evalList(operatorList, digitChunks) {
    let evalList;
};

function equals(displayStr) {
    let digChunks = digitChunks(displayStr);
    let opList = operatorList(displayStr);
    console.log("digList: "+digChunks);
    console.log("opList:"+opList);
    //evaluate * and / left to right, replace those chunks
    while (digChunks.length > 1) {

        for (let i = 0; i < opList.length; i++) {
            if (opList[i] == "*" || opList == "/") {
                console.log("i = "+i);
                let result = operate(digChunks[i], digChunks[i+1], opList[i]);
                
                console.log("This is the result:"+result);
                digChunks.splice(i, 2, result);
                
                console.log("new digList:"+digChunks);
                opList.splice(i, 1, " ");
            };
        };

        for (let i = 0; i < opList.length; i++) {
            if (opList[i] == "+" || opList[i] == "-") {
                let result = operate(digChunks[i], digChunks[i+1], opList[i]);
                digChunks.splice(i, 2, result);
                opList.splice(i, 1, " ");
            };
        };

    };
    clear();
    display(digChunks[0]);
    return digChunks;
};

function altEquals(displayStr) {
    let digChunks = digitChunks(displayStr);
    let opList = operatorList(displayStr);

    if (opList.length >= digChunks.length) {
        tooManyOperators = true;
    };

    console.log("digList: "+digChunks);
    console.log("opList:"+opList);
    //evaluate * and / left to right, replace those chunks
    

    for (let i = 0; i < opList.length; i++) {
        if (opList[i] == "*" || opList == "/") {

            console.log("i = "+i);
            let result = operate(digChunks[i], digChunks[i+1], opList[i]);

            if (result == null) {
                digChunks = [0];
                divideByZero = true;
                break;
            };

            console.log("This is the result (*/):"+result);

            digChunks.splice(i, 2, result);
            console.log("new digList:"+digChunks);

            opList.splice(i, 1);
            console.log("new opList:"+opList);
        };
    };
    
    for (let i = 0; i < opList.length; i++) {
        console.log("iteration +-");
        if (opList[i] == "+" || opList[i] == "-") {

            console.log("i = "+i);
            let result = operate(digChunks[i], digChunks[i+1], opList[i]);

            if (result == null) {
                digChunks = [0];
                divideByZero = true;
                break;
            };

            console.log("This is the result (+-):"+result);
            digChunks.splice(i, 2, result);
            console.log("new digList:"+digChunks);

            opList.splice(i, 1);
            console.log("new opList:"+opList);
        };
    };

    if (opList.length == 1) {
        let result = operate(digChunks[0], digChunks[1], opList[0]);
        digChunks.splice(0, 2, result);
    }

    
    clear();
    if (divideByZero === true) {
        displayMsg("Divide By Zero Error");
        divideByZero = false;
    } else if (tooManyOperators === true) {
        displayMsg("Too Many Operators");
        tooManyOperators = false;
    } else
    display(digChunks[0]);
};