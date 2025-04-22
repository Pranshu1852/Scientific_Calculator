import finalString from "./scripts/stringReplacer.js";
import historyHandler from "./scripts/historyhandler.js";
import toggleTheme from "./scripts/themehandler.js";
import handleKeyboardinput from "./scripts/keyboardhandler.js";
import memoryHandler from "./scripts/memoryhandler.js";
import InputOperation from "./scripts/inputoperation.js";
import toggleHandler,{toggleTrignobutton,toggleFunctionbutton,closeTogglebuttons} from "./scripts/togglehandler.js";

class Calculator{
    constructor(display){
        this.display=display;
        this.inputOperation=new InputOperation(display);
        this.memory=+localStorage.getItem('memoryValue')||0;
        this.trignoFlag=false;
        this.functionFlag=false;
        this.degFlag=true;
        this.secondFunctionality=false;
        this.historyFlag=false;
        this.toggledark=false;
        this.initiateEventListener();
        memoryHandler.updateMemorybutton.call(this);
    }

    initiateEventListener(){
        document.querySelectorAll(".btn").forEach((element)=>{
            element.addEventListener('click',(event)=>{
                this.handleButtonClick(element);
            });
        });

        document.addEventListener('click',(event)=>{
            if(!(event.target.closest('.row3__btn--trigno')||event.target.closest('.row3__btn--function'))){
                closeTogglebuttons.call(this);
            }
        });

        document.querySelector('.btn--history').addEventListener('click',(event)=>{
            this.historyFlag=!this.historyFlag;
            historyHandler.toggleHistory(this.historyFlag);
        })
        
        document.querySelector('.btn--clearHistory').addEventListener('click',(event)=>{
            localStorage.removeItem('storedHistory');
            historyHandler.getHistory();
        })

        document.querySelector('.btn--theme').addEventListener('click',(event)=>{
            this.toggledark=!this.toggledark;
            toggleTheme(this.toggledark);
        })

        document.addEventListener('keydown',(event)=>{
            handleKeyboardinput.call(this, event.key);
        })
    }

    handleButtonClick(element){
        let buttonText=element.id||element.textContent;

        try{
            switch(buttonText){
                case 'back':{
                    this.inputOperation.handleBackspace();
                    break;
                }
                case 'C':{
                    this.inputOperation.clearDisplay();
                    break;
                }
                case '+/-':{
                    toggleHandler.toggleSign.call(this);
                    break;
                }
                case '1/x':{
                    toggleHandler.convertToreciprocal.call(this);
                    break;
                }
                case 'mod':{
                    this.inputOperation.addToinput('%');
                    break;
                }
                case 'log':{
                    this.inputOperation.addToinput('log(');
                    break;
                }
                case 'ln':{
                    this.inputOperation.addToinput('ln(');
                    break;
                }
                case 'x2':{
                    this.inputOperation.addToinput('^2');
                    break;
                }
                case '2√x':
                case '3√x':{
                    this.inputOperation.addToinput('√');
                    break;
                }
                case 'xy':{
                    this.inputOperation.addToinput('^');
                    break;
                }
                case '|x|':{
                    this.inputOperation.addToinput('|');
                    break;
                }
                case 'n!':{
                    this.inputOperation.addToinput('!');
                    break;
                }
                case 'exp':{
                    this.inputOperation.addToinput('.e+');
                    break;
                }
                case '10x':{
                    toggleHandler.powerOften.call(this);
                    break;
                }
                case 'M+':{
                    memoryHandler.addMemory.call(this,finalString(this.displayValue,this.degFlag,this.secondFunctionality));
                    memoryHandler.updateMemorybutton.call(this);
                    break;
                }
                case 'M-':{
                    memoryHandler.subtractMemory.call(this,finalString(this.displayValue,this.degFlag,this.secondFunctionality));
                    memoryHandler.updateMemorybutton.call(this);
                    break;
                }
                case 'MS':{
                    memoryHandler.storeMemory.call(this,finalString(this.displayValue,this.degFlag,this.secondFunctionality));
                    memoryHandler.updateMemorybutton.call(this);
                    break;
                }
                case 'MC':{
                    memoryHandler.clearMemory.call(this);
                    memoryHandler.updateMemorybutton.call(this);
                    break;
                }
                case 'MR':{
                    this.displayValue=this.memory;
                    break;
                }
                case 'Trigonometry':{
                    this.trignoFlag=!this.trignoFlag;
                    toggleTrignobutton.call(this);
                    break;
                }
                case '𝑓Function':{
                    this.functionFlag=!this.functionFlag;
                    toggleFunctionbutton.call(this);
                    break;
                }
                case 'DEG':{
                    this.degFlag=false;
                    element.textContent='RAD';
                    break;
                }
                case 'RAD':{
                    this.degFlag=true;
                    element.textContent='DEG';
                    break;
                }
                case 'sin':
                case 'cos':
                case 'tan':
                case 'cosec':
                case 'sec':
                case 'cot':
                case 'ceil':
                case 'floor':{
                    this.inputOperation.addToinput(buttonText+'(');
                    break;
                }
                case '2nd':{
                    this.secondFunctionality=!this.secondFunctionality;
                    toggleHandler.toggleSecondfunctionality.call(this,element);
                    break;
                }
                case 'x3':{
                    this.inputOperation.addToinput('^3');
                    break;
                }
                case '=':{
                    this.calculate();
                    break;
                }
                case 'F-E':{
                    toggleHandler.convertFixedToExponent.call(this);
                    break;
                }
                default:{
                    this.inputOperation.addToinput(buttonText);
                }
            }
        }catch{
            throw new Error('Error while getting button value');
        }
    }

    calculate(){
        try{ 
            const originalinput=this.displayValue;
            const finalInput=finalString(originalinput,this.degFlag,this.secondFunctionality);
            
            const result=eval(finalInput);
            this.displayValue=result;
            historyHandler.addHistory(originalinput,result);
        }catch(error){
            this.inputOperation.displayError();
        }
    }

    get displayValue() {
        return this.display.value;
    }
        
    set displayValue(value) {
        this.display.value = value;
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const inputfield=document.getElementById("inputfield");
    new Calculator(inputfield);
})