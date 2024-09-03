let buttons = document.querySelector(".calculator");
let result = document.querySelector(".result");
let prevResult = document.querySelector(".prevResult");
let dot = document.querySelector(".dot");
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let multiply = document.querySelector(".multiply");
let divide = document.querySelector(".divide");
let buffer = "0";
let cpbuffer = "0";
let total = 0;
let prevSymbol = "";

buttons.addEventListener("click", (event) => {
    if (event.target.tagName == "BUTTON") {
        if (!isNaN(event.target.innerText) || event.target.innerText == ".") {
            handleNumbers(event.target.innerText);
        } else {
            handleSymbols(event.target.innerText);
        }
    }
});

let handleNumbers = (number) => {
    if (prevSymbol == "=") {
        buffer = number;
        cpbuffer = number;
        result.innerText = buffer;
        enableBtns();
        return;
    }

    if (["+", "-", "×", "÷", "%"].includes(buffer[buffer.length - 1])) {
        cpbuffer = "";
    }

    if (buffer == "0") {
        if (number == ".") {
            dot.disabled = true;
        }
        buffer = number;
        cpbuffer = number;
    } else if (number == ".") {
        if (!cpbuffer.includes(".")) {
            dot.disabled = true;
            buffer += number;
            cpbuffer += number;
        }
    } else {
        buffer += number;
        cpbuffer += number;
    }
    result.innerText = buffer;
    enableBtns();
}

let handleSymbols = (symbol) => {
    if (symbol == "AC") {
        buffer = "0";
        cpbuffer = "";
        total = 0;
        prevSymbol = "";
        result.innerText = "0";
        prevResult.innerText = "";
        dot.disabled = false;
        enableBtns();
    } else if (symbol == "←") {

        if(buffer[buffer.length - 1] =="."){
            dot.disabled = false;
        }
        if (buffer.length <= 1 || buffer == ".") {
            buffer = "0";
            cpbuffer = "";
            total = 0;
            result.innerText = "0";
            prevResult.innerText = "";
            dot.disabled = false;
            enableBtns();
            return;
        }

        buffer = buffer.substring(0, buffer.length - 1);
        if (["+", "-", "×", "÷", "%"].includes(buffer[buffer.length - 1])) {
            cpbuffer = ""; 
        } else {
            cpbuffer = buffer;
        }

        result.innerText = buffer;

        if (buffer === "") {
            buffer = "0";
            result.innerText = buffer;
        }

        if (["+", "-", "×", "÷", "%"].includes(buffer[buffer.length - 1])) {
            disableBtns();
        } else {
            enableBtns();
        }

    } else if (symbol == "=") {
        calculate();
        result.innerText = total;
        buffer = total.toString();
        prevSymbol = "=";
        enableBtns();
        prevResult.classList.add('move-down');
        setTimeout(() => {
            prevResult.classList.remove('move-down');
            prevResult.innerText = "";
            result.innerText = total;
        }, 500);
    } else {
        if (!["+", "-", "×", "÷", "%"].includes(buffer[buffer.length - 1])) {
            calculate();
            prevSymbol = symbol;
            buffer += symbol;
            result.innerText = buffer;
            dot.disabled = false;
            disableBtns();
        }
    }
}


let calculate = () => {
    if (prevSymbol == "+") {
        total += parseFloat(cpbuffer);
    } else if (prevSymbol == "-") {
        total -= parseFloat(cpbuffer);
    } else if (prevSymbol == "×") {
        total *= parseFloat(cpbuffer);
    } else if (prevSymbol == "÷") {
        total /= parseFloat(cpbuffer);
    } else if (prevSymbol == "%") {
        total %= parseFloat(cpbuffer);
    } else {
        total = parseFloat(cpbuffer);
    }

    prevResult.innerText = total;
    cpbuffer = "0";
}

let disableBtns = () => {
    plus.disabled = true;
    minus.disabled = true;
    multiply.disabled = true;
    divide.disabled = true;
}

let enableBtns = () => {
    plus.disabled = false;
    minus.disabled = false;
    multiply.disabled = false;
    divide.disabled = false;
}
