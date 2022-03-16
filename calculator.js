export default class Calculator {
   constructor(
      primaryOperationDisplay,
      secondaryOperationDisplay,
      operationDisplay
   ) {
      this.#primaryOperationDisplay = primaryOperationDisplay;
      this.#secondaryOperationDisplay = secondaryOperationDisplay;
      this.#operationDisplay = operationDisplay;
      this.clear();
   }
   #primaryOperationDisplay;
   #secondaryOperationDisplay;
   #operationDisplay;

   get primaryOperand() {
      return parseFloat(this.#primaryOperationDisplay.dataset.value);
   }
   set primaryOperand(value) {
      this.#primaryOperationDisplay.dataset.value = value ?? "";
      this.#primaryOperationDisplay.textContent = displayNumber(value);
   }
   get secondaryOperand() {
      return parseFloat(this.#secondaryOperationDisplay.dataset.value);
   }
   set secondaryOperand(value) {
      this.#secondaryOperationDisplay.dataset.value = value ?? "";
      this.#secondaryOperationDisplay.textContent = displayNumber(value);
   }
   get operation() {
      return this.#operationDisplay.textContent;
   }
   set operation(value) {
      this.#operationDisplay.textContent = value;
   }
   addDigit(digit) {
      if (
         digit === "." &&
         this.#primaryOperationDisplay.dataset.value.includes(".")
      )
         return;
      if (this.primaryOperand === 0) {
         this.primaryOperand = digit;
         return;
      }
      this.primaryOperand = this.#primaryOperationDisplay.dataset.value + digit;
   }
   removeDigit() {
      const numberString = this.#primaryOperationDisplay.dataset.value;
      if (numberString.length <= 1) {
         this.primaryOperand = 0;
         return;
      }
      this.primaryOperand = numberString.substring(0, numberString.length - 1);
   }
   chooseOperation(operationInput) {
      if (this.operation !== "") return;
      this.operation = operationInput;
      this.secondaryOperand = this.primaryOperand;
      this.primaryOperand = 0;
   }
   evaluate() {
      let result;
      switch (this.operation) {
         case "*":
            result = this.secondaryOperand * this.primaryOperand;
            break;
         case "÷":
            result = this.secondaryOperand / this.primaryOperand;
            break;
         case "+":
            result = this.secondaryOperand + this.primaryOperand;
            break;
         case "-":
            result = this.secondaryOperand - this.primaryOperand;
            break;
         default:
            return;
      }
      this.clear();
      this.primaryOperand = result;
      console.log(result);
      return result;
   }
   clear() {
      this.primaryOperand = 0;
      this.secondaryOperand = "";
      this.operation = "";
   }
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en", {
   maximumFractionDigits: 20,
});

function displayNumber(number) {
   //tantsi s bunbnami pt a formata miile cu virgula :)
   const stringNumber = number?.toString() || "";
   if (stringNumber === "") return "";
   const [integer, decimal] = stringNumber.split(".");
   const formatedInteger = NUMBER_FORMATTER.format(integer);
   if (decimal == null) return formatedInteger;
   return formatedInteger + "." + decimal;
}
