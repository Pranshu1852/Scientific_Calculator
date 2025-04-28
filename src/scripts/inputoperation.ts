const ERROR_MESSAGE = "ERROR";


class InputOperation {
    display: HTMLInputElement

    constructor(displayElement: HTMLInputElement) {
        this.display = displayElement;
    }
    
    addToinput(value: string){
        if (typeof value !== 'string') {
            console.error("Invalid input: Value must be a string.");
            return;
        }

        if(this.displayValue===ERROR_MESSAGE){
            this.displayValue=value;
        }
        else{
            this.displayValue+=value;
        }

        this.scrollToEnd();
    };

    scrollToEnd() {
        if (this.display.offsetWidth < this.display.scrollWidth) {
            this.display.scrollTo(this.display.scrollWidth, 0);
        }
    }

    // To clear all values from display
    clearDisplay(){
        this.displayValue="";
    };

    // To show ERROR in display
    displayError(){
        this.displayValue=ERROR_MESSAGE;
    };

    // To remove ERROR/ Last character from display
    handleBackspace(){
        if(this.displayValue===ERROR_MESSAGE || this.displayValue === ""){
            this.displayValue="";
        }
        else{
            this.displayValue=this.displayValue.substring(0,this.displayValue.length-1)
        }
    };

    get displayValue() {
        return this.display.value;
    }
        
    set displayValue(value: string) {
        this.display.value = value;
    }
}

export default InputOperation;