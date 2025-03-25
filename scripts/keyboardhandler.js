import inputOperation from "./inputoperation.js";

function handleKeyboardinput(value){
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