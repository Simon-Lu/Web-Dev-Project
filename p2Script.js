class Calculator { //sets the elements displayed into this class//
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear() //makes new calculator everything clear is pressed//
    }
  
    clear() { //clears all function//
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {  
      this.currentOperand = this.currentOperand.toString().slice(0, -1) 
      //turn number into strong and slicing last number//
    }
  
    addNumber(number) { //adding numbers to display function//
      if (number === '.' && this.currentOperand.includes('.')) return
      //can type period only once//
      this.currentOperand = this.currentOperand.toString() + number.toString() 
      //add numbers as strings and not numbers//
    }
  
    chooseOperation(operation) { //choosing operation to perform function//
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') { //make sure the numbers compute before updating// 
        this.compute() 
      }
      this.operation = operation 
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() { 
      let computation
      const prev = parseFloat(this.previousOperand) //convert string to number//
      const current = parseFloat(this.currentOperand) //convert string to number//
      if (isNaN(prev) || isNaN(current)) return //cancel function if nothing on display//
      switch (this.operation) {  //do all these operations in a switch//
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default: //if none chosen, don't compute//
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) { //format display number with commas//
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0]) //get numbers before decimal//
      const decimalDigits = stringNumber.split('.')[1] //get numbers after decimal//
      let integerDisplay
      if (isNaN(integerDigits)) { 
        integerDisplay = '' 
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }) 
        //make sure there is only 1 decimal and displaying correct number formatting//
      }
      if (decimalDigits != null) { 
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }    
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` //makes top display like this 456 +//
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  //set all buttons to constant variable so it is easier to work with//
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
   
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  //make a calculator to invoke constructor//

  numberButtons.forEach(button => { //everytime i click a number button it will update display//
    button.addEventListener('click', () => {
      calculator.addNumber(button.innerText) 
      calculator.updateDisplay()
    }) //update dispaly when button clicked//
  })
  
  operationButtons.forEach(button => { //update display everytime operation button pressed//
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })