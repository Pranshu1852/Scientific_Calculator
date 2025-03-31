import Calculator from "../script";
import inputOperation from "./inputoperation.js";

// To handle keyboard input
function handleKeyboardinput(this: Calculator,value: string):void {
    let regex=/[0-9\|\^\(\)\.\+\-\%\!\/\*]/g;
    
    if(regex.test(value)){
        console.log("inside");
        
        inputOperation.addToinput.call(this,value);
    }
    else if(value==="Backspace"){
        inputOperation.handleBackspace.call(this);
    }
    else if(value==="Enter"){
        this.calculate();
    }
}

export default handleKeyboardinput;