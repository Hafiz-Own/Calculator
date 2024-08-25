let buttons = document.querySelector(".calculator");
let result = document.querySelector(".result");
let prevResult = document.querySelector(".prevResult");
let dot = document.querySelector(".dot")
let buffer = "0";
let prevBuffer = "";
buttons.addEventListener("click", (event) => {
    if (event.target.tagName == "BUTTON") {
        if (!isNaN(event.target.innerText) || event.target.innerText == ".") {
            handleNumbers(event.target.innerText);
        }
        else {
            handleSymbols(event.target.innerText);
        }
    }
});

let handleNumbers = (number) => {
    if (buffer == "0") {
        buffer = number;
        result.innerText = buffer;
    }
    else {
        buffer += number;
        result.innerText = buffer;
    }
    if (number == ".") {
        dot.disabled = true;
    }
}

let handleSymbols = (symbol) => {
    if (symbol == "AC") {
        buffer = "0";
        result.innerText = "0";
        dot.disabled = false;
    }
    else if (symbol == "←") {
        if (parseInt(buffer) <= 9 || buffer == ".") {
            buffer = "0";
            result.innerText = buffer;
            dot.disabled = false;
            return;
        }
        if (buffer[buffer.length - 1] == ".") {
            buffer = buffer.substring(0, buffer.length - 1);
            result.innerText = buffer;
            dot.disabled = false;
            return;
        }
        else {
            buffer = buffer.substring(0, buffer.length - 1);
            result.innerText = buffer;
        }
    }
}
