import finalString from "./scripts/stringReplacer.js";
import historyHandler from "./scripts/historyhandler.js";
import toggleTheme from "./scripts/themehandler.js";
import handleKeyboardinput from "./scripts/keyboardhandler.js";
import memoryHandler from "./scripts/memoryhandler.js";
import inputOperation from "./scripts/inputoperation.js";
import toggleHandler,{toggleTrignobutton,toggleFunctionbutton,closeTogglebuttons} from "./scripts/togglehandler.js";

class Calculator{
    display: HTMLInputElement;
    memory: number;
    trignoFlag: boolean;
    functionFlag: boolean;
    degFlag: boolean;
    secondFunctionality: boolean;
    historyFlag: boolean;
    toggledark: boolean;

    constructor(display: HTMLInputElement){
        this.display=display;
        this.memory=localStorage.getItem('memoryValue')?Number(localStorage.getItem('memoryValue')):0;
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
            (element as HTMLButtonElement).addEventListener('click',(event)=>{
                this.handleButtonClick((element as HTMLButtonElement));
            });
        });

        document.addEventListener('click',(event: Event)=>{
            if(!((event.target as HTMLElement).closest('.row3__btn--trigno')||(event.target as HTMLElement).closest('.row3__btn--function'))){
                closeTogglebuttons.call(this);
            }
        });

        (document.querySelector('.btn--history') as HTMLButtonElement).addEventListener('click',(event)=>{
            this.historyFlag=!this.historyFlag;
            historyHandler.toggleHistory(this.historyFlag);
        });
        
        (document.querySelector('.btn--clearHistory') as HTMLButtonElement).addEventListener('click',(event)=>{
            localStorage.removeItem('storedHistory');
            historyHandler.getHistory();
        });

        (document.querySelector('.btn--theme') as HTMLButtonElement).addEventListener('click',(event)=>{
            this.toggledark=!this.toggledark;
            toggleTheme(this.toggledark);
        });

        document.addEventListener('keydown',(event)=>{
            handleKeyboardinput.call(this, event.key);
        });
    }

    handleButtonClick(element: HTMLButtonElement){
        let buttonText=element.id||element.textContent;

        try{
            switch(buttonText){
                case 'back':{
                    inputOperation.handleBackspace.call(this);
                    break;
                }
                case 'C':{
                    inputOperation.clearDisplay.call(this);
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
                    inputOperation.addToinput.call(this,'%');
                    break;
                }
                case 'log':{
                    inputOperation.addToinput.call(this,'log(');
                    break;
                }
                case 'ln':{
                    inputOperation.addToinput.call(this,'ln(');
                    break;
                }
                case 'x2':{
                    inputOperation.addToinput.call(this,'^2');
                    break;
                }
                case '2√x':
                case '3√x':{
                    inputOperation.addToinput.call(this,'√');
                    break;
                }
                case 'xy':{
                    inputOperation.addToinput.call(this,'^');
                    break;
                }
                case '|x|':{
                    inputOperation.addToinput.call(this,'|');
                    break;
                }
                case 'n!':{
                    inputOperation.addToinput.call(this,'!');
                    break;
                }
                case 'exp':{
                    inputOperation.addToinput.call(this,'.e+');
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
                    this.displayValue=this.memory.toString();
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
                    inputOperation.addToinput.call(this,buttonText+'(');
                    break;
                }
                case '2nd':{
                    this.secondFunctionality=!this.secondFunctionality;
                    toggleHandler.toggleSecondfunctionality.call(this,element);
                    break;
                }
                case 'x3':{
                    inputOperation.addToinput.call(this,'^3');
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
                    inputOperation.addToinput.call(this,buttonText!);
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
            inputOperation.displayError.call(this);
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
    const inputfield=document.getElementById("inputfield") as HTMLInputElement;
    new Calculator(inputfield);
})

export default Calculator;