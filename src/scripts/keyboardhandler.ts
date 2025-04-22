import Calculator from "../script";

// To handle keyboard input
function handleKeyboardinput(this: Calculator,value: string):void {
    let regex=/[0-9\|\^\(\)\.\+\-\%\!\/\*]/g;
    
    if(regex.test(value)){
        console.log("inside");
        
        this.inputOperation.addToinput(value);
    }
    else if(value==="Backspace"){
        this.inputOperation.handleBackspace();
    }
    else if(value==="Enter"){
        this.calculate();
    }
}

export default handleKeyboardinput;