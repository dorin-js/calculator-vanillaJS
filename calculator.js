export default class Calculator {
   constructor(
      primaryOperationDisplay,
      secondaryOperationDisplay,
      operationDisplay
   ) {
      this.primaryOperationDisplay = primaryOperationDisplay;
      this.secondaryOperationDisplay = secondaryOperationDisplay;
      this.operationDisplay = operationDisplay;
   }
   clear() {
      this.primaryOperationDisplay = 0;
      this.secondaryOperationDisplay = "";
      this.operationDisplay = "";
   }
}
