let firstNum = "0",
	lastNum = "0",
	operator,
	justCalculated = false;

// Display Text
const display = document.querySelector(".display");

const displayText = document.createElement("div");
displayText.classList.add("displayText");
displayText.textContent = "0";
display.appendChild(displayText);

function add(a, b) {
	return Math.round((a + b) * 10) / 10;
}

function subtract(a, b) {
	return Math.round((a - b) * 10) / 10;
}

function multiply(a, b) {
	return Math.round(a * b * 10) / 10;
}

function divide(a, b) {
	return Math.round((a / b) * 10) / 10;
}

function operate() {
	if (operator === "+") {
		result = String(add(parseFloat(firstNum), parseFloat(lastNum)));
		displayText.textContent = result;
	} else if (operator === "-") {
		result = String(subtract(parseFloat(firstNum), parseFloat(lastNum)));
		displayText.textContent = result;
	} else if (operator === "*") {
		result = String(multiply(parseFloat(firstNum), parseFloat(lastNum)));
		displayText.textContent = result;
	} else if (operator === "/") {
		if (lastNum !== "0") {
			result = String(divide(parseFloat(firstNum), parseFloat(lastNum)));
			displayText.textContent = result;
		} else {
			displayText.classList.add("errorText");
			displayText.textContent = "Division by zero";
			firstNum = "0";
			lastNum = "0";
			operator = undefined;
			justCalculated = "true";
			return;
		}
	}
	firstNum = result;
	lastNum = "0";
	operator = undefined;
	justCalculated = true;
	console.log(firstNum, lastNum, operator, justCalculated);
}

const clearBtn = document.querySelector("#clearBtn");
clearBtn.onclick = () => {
	displayText.classList.remove("errorText");
	displayText.textContent = "0";
	firstNum = "0";
	lastNum = "0";
	operator = undefined;
};

const delBtn = document.querySelector("#delBtn");
delBtn.onclick = () => {
	displayText.textContent = displayText.textContent.slice(0, -1);
	if (operator === undefined) {
		firstNum = firstNum.slice(0, -1);
	} else {
		lastNum = lastNum.slice(0, -1);
	}
	console.log(firstNum, lastNum, operator, justCalculated);
};

const decBtn = document.querySelector("#decBtn");
decBtn.onclick = () => {
	if (operator === undefined) {
		firstNum = firstNum + ".";
		displayText.textContent = firstNum;
	} else {
		lastNum = lastNum + ".";
		displayText.textContent = firstNum + operator + lastNum;
	}
};

const buttons = [
	document.querySelector("#zeroBtn"),
	document.querySelector("#oneBtn"),
	document.querySelector("#twoBtn"),
	document.querySelector("#threeBtn"),
	document.querySelector("#fourBtn"),
	document.querySelector("#fiveBtn"),
	document.querySelector("#sixBtn"),
	document.querySelector("#sevenBtn"),
	document.querySelector("#eightBtn"),
	document.querySelector("#nineBtn"),
];

buttons.forEach((btn, i) => {
	btn.onclick = () => {
		displayText.classList.remove("errorText");
		if (justCalculated) {
			firstNum = String(i);
			displayText.textContent = firstNum;
			justCalculated = false;
			return;
		}
		if (operator === undefined) {
			if (firstNum === "0") {
				firstNum = String(i);
			} else {
				firstNum = firstNum + String(i);
			}
			displayText.textContent = firstNum;
		} else {
			if (lastNum === "0") {
				lastNum = String(i);
			} else {
				lastNum = lastNum + String(i);
			}
			displayText.textContent = firstNum + operator + lastNum;
		}
		console.log(firstNum, lastNum, operator);
	};
});

const addBtn = document.querySelector("#addBtn");
const subtractBtn = document.querySelector("#subtractBtn");
const multiplyBtn = document.querySelector("#multiplyBtn");
const divideBtn = document.querySelector("#divideBtn");
const equalBtn = document.querySelector("#equalBtn");

addBtn.onclick = () => {
	if (operator === undefined) {
		displayText.classList.remove("errorText");
		operator = "+";
		displayText.textContent = firstNum + operator;
	} else {
		operate();
		operator = "+";
		displayText.textContent = firstNum + operator;
	}
	justCalculated = false;
};
subtractBtn.onclick = () => {
	if (operator === undefined) {
		displayText.classList.remove("errorText");
		operator = "-";
		displayText.textContent = firstNum + operator;
	} else {
		operate();
		operator = "-";
		displayText.textContent = firstNum + operator;
	}
	justCalculated = false;
};
multiplyBtn.onclick = () => {
	if (operator === undefined) {
		displayText.classList.remove("errorText");
		operator = "*";
		displayText.textContent = firstNum + operator;
	} else {
		operate();
		operator = "*";
		displayText.textContent = firstNum + operator;
	}
	justCalculated = false;
};
divideBtn.onclick = () => {
	if (operator === undefined) {
		displayText.classList.remove("errorText");
		operator = "/";
		displayText.textContent = firstNum + operator;
	} else {
		operate();
		operator = "/";
		displayText.textContent = firstNum + operator;
	}
	justCalculated = false;
};
equalBtn.onclick = () => operate();

document.addEventListener("keydown", (event) => {
	const key = event.key;
	console.log(key);
	if ("0123456789".includes(key)) {
		displayText.classList.remove("errorText");
		if (justCalculated) {
			firstNum = key;
			displayText.textContent = firstNum;
			justCalculated = false;
			return;
		}
		if (operator === undefined) {
			if (firstNum === "0") {
				firstNum = key;
			} else {
				firstNum = firstNum + key;
			}
			displayText.textContent = firstNum;
		} else {
			if (lastNum === "0") {
				lastNum = key;
			} else {
				lastNum = lastNum + key;
			}
			displayText.textContent = firstNum + operator + lastNum;
		}
		console.log(firstNum, lastNum, operator);
	} else if ("+-*/".includes(key)) {
		displayText.classList.remove("errorText");
		if (operator === undefined) {
			operator = key;
			displayText.textContent = firstNum + operator;
		} else {
			operate();
			operator = key;
			displayText.textContent = firstNum + operator;
		}
		justCalculated = false;
	} else if (key === "Enter") {
		operate();
	} else if (key === ".") {
		if (operator === undefined) {
			firstNum = firstNum + ".";
			displayText.textContent = firstNum;
		} else {
			lastNum = lastNum + ".";
			displayText.textContent = firstNum + operator + lastNum;
		}
	} else if (key === "Backspace") {
		displayText.textContent = displayText.textContent.slice(0, -1);
		if (operator === undefined) {
			firstNum = firstNum.slice(0, -1);
		} else {
			lastNum = lastNum.slice(0, -1);
		}
	} else if (key === "Delete") {
		displayText.classList.remove("errorText");
		displayText.textContent = "0";
		firstNum = "0";
		lastNum = "0";
		operator = undefined;
	}
});
