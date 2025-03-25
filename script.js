import Utilities from "./scripts/utilities.js";
import finalString from "./scripts/stringReplacer.js";
import historyHandler from "./scripts/historyhandler.js";
import toggleTheme from "./scripts/themehandler.js";
import handleKeyboardinput from "./scripts/keyboardhandler.js";
import memoryHandler from "./scripts/memoryhandler.js";
import inputOperation from "./scripts/inputoperation.js";
import toggleHandler from "./scripts/togglehandler.js";

class Calculator{
    constructor(display){
        this.display=display;
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
            if(!(event.target.className==="row3__btn--trigno btn"||event.target.className==="row3__btn--function btn")){
                // this.closeTogglebuttons();
                toggleHandler.closeTogglebuttons.call(this);
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
                    // this.handleBackspace();
                    inputOperation.handleBackspace.call(this);
                    break;
                }
                case 'C':{
                    // this.clearDisplay();
                    inputOperation.clearDisplay.call(this);
                    break;
                }
                case '+/-':{
                    // this.toggleSign();
                    toggleHandler.toggleSign.call(this);
                    break;
                }
                case '1/x':{
                    // this.convertToreciprocal();
                    toggleHandler.convertToreciprocal.call(this);
                    break;
                }
                case 'mod':{
                    // this.addToinput('%');
                    inputOperation.addToinput.call(this,'%');
                    break;
                }
                case 'log':{
                    // this.addToinput('log(');
                    inputOperation.addToinput.call(this,'log(');
                    break;
                }
                case 'ln':{
                    // this.addToinput('ln(');
                    inputOperation.addToinput.call(this,'ln(');
                    break;
                }
                case 'x2':{
                    // this.addToinput('^2');
                    inputOperation.addToinput.call(this,'^2');
                    break;
                }
                case '2√x':
                case '3√x':{
                    // this.addToinput('√');
                    inputOperation.addToinput.call(this,'√');
                    break;
                }
                case 'xy':{
                    // this.addToinput('^');
                    inputOperation.addToinput.call(this,'^');
                    break;
                }
                case '|x|':{
                    // this.addToinput('|');
                    inputOperation.addToinput.call(this,'|');
                    break;
                }
                case 'n!':{
                    // this.addToinput('!');
                    inputOperation.addToinput.call(this,'!');
                    break;
                }
                case 'exp':{
                    // this.addToinput('.e+');
                    inputOperation.addToinput.call(this,'.e+');
                    break;
                }
                case '10x':{
                    // this.powerOften();
                    toggleHandler.powerOften.call(this);
                    break;
                }
                case 'M+':{
                    memoryHandler.addMemory.call(this,finalString(this.display.value,this.degFlag,this.secondFunctionality));
                    memoryHandler.updateMemorybutton.call(this);
                    break;
                }
                case 'M-':{
                    memoryHandler.subtractMemory.call(this,finalString(this.displayvalue,this.degFlag,this.secondFunctionality));
                    memoryHandler.updateMemorybutton.call(this);
                    break;
                }
                case 'MS':{
                    memoryHandler.storeMemory.call(this,finalString(this.display.value,this.degFlag,this.secondFunctionality));
                    memoryHandler.updateMemorybutton.call(this);
                    break;
                }
                case 'MC':{
                    memoryHandler.clearMemory.call(this);
                    memoryHandler.updateMemorybutton.call(this);
                    break;
                }
                case 'MR':{
                    this.display.value=this.memory;
                    break;
                }
                case 'Trigonometry':{
                    this.trignoFlag=!this.trignoFlag;
                    // this.toggleTrignobutton();
                    toggleHandler.toggleTrignobutton.call(this);
                    break;
                }
                case '𝑓Function':{
                    this.functionFlag=!this.functionFlag;
                    // this.toggleFunctionbutton();
                    toggleHandler.toggleFunctionbutton.call(this);
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
                    // this.addToinput(buttonText+'(');
                    inputOperation.addToinput.call(this,buttonText+'(');
                    break;
                }
                case '2nd':{
                    this.secondFunctionality=!this.secondFunctionality;
                    // this.toggleSecondfunctionality(element);
                    toggleHandler.toggleSecondfunctionality.call(this,element);
                    break;
                }
                case 'x3':{
                    // this.addToinput('^3');
                    inputOperation.addToinput.call(this,'^3');
                    break;
                }
                case '=':{
                    this.calculate();
                    break;
                }
                case 'F-E':{
                    // this.convertFixedToExponent();
                    toggleHandler.convertFixedToExponent.call(this);
                    break;
                }
                default:{
                    inputOperation.addToinput.call(this,buttonText);
                }
            }
        }catch{
            throw new Error('Error while getting button value');
        }
    }

    calculate(){
        try{ 
            const originalinput=this.display.value;
            const finalInput=finalString(originalinput,this.degFlag,this.secondFunctionality);
            console.log(finalInput);
            
            const result=eval(finalInput);
            this.display.value=result;
            historyHandler.addHistory(originalinput,result);
        }catch(error){
            inputOperation.displayError.call(this);
        }
    }

    // toggleSign(){
    //     let regex=/(\d+)$/;
    //     let regexnot=/\(\-(\d+)\)$/;
    //     if(regex.test(this.display.value)){
    //         this.display.value=this.display.value.replace(regex,(match,num)=>{
    //             return '(-'+num+')';
    //         });
    //     }
    //     else if(regexnot.test(this.display.value)){
    //         this.display.value=this.display.value.replace(regexnot,(match,num)=>{
    //             return num;
    //         });
    //     }
    // }

    // convertToreciprocal(){
    //     let regex=/((\d+)\.?(\d*))$/;
    //     if(regex.test(this.display.value)){
    //         this.display.value=this.display.value.replace(regex,(match,num)=>{
    //             return '1/'+num;
    //         })
    //     }
    //     else{
    //         this.display.value+='1/';
    //     }
    // }

    // powerOften(){
    //     let regex=/((\d+)\.?(\d*))$/;
    //     if(regex.test(this.display.value)){
    //         this.display.value=this.display.value.replace(regex,(match,num)=>{
    //             return '10^'+num;
    //         })
    //     }
    //     else{
    //         this.display.value+='10^';
    //     }
    // }

    // convertFixedToExponent(){
    //     let regexfe=/(\d+)\.?(\d*)$/g;
    //     if(regexfe.test(this.display.value)){
    //         this.display.value=this.display.value.replace(regexfe,(match,num1,num2)=>{
    //             console.log(num1+" "+num2);
    //             if(num2===""){
    //                 console.log("inside");
                    
    //                 if(num1.length>1){
    //                     let firstnum=num1[0];
    //                     let remaining=num1.slice(1,num1.length);
    //                     let exponential=remaining.length;
    //                     if(+remaining===0){
    //                         remaining='0';
    //                     }
    //                     return firstnum+'.'+remaining+'x10^'+exponential;
    //                 }
                    
    //                 return num1+'x10^0';
    //             }
    //             else if(+num1===0&&+num2!=0){
    //                 let start=0;
    //                 for(let i=0;i<num2.length;i++){
    //                     if(num2[i]!='0'){
    //                         start=i;
    //                         break;
    //                     }
    //                 }
    //                 num2=num2.slice(start,num2.length);

    //                 return num2+'x10^-'+num2.length;
    //             }
    //             else{
    //                 return num1+num2+'x10^-'+num2.length;
    //             }
    //         });
    //     }
    // }

    // toggleTrignobutton(){
    //     const element=document.getElementsByClassName('dropdown--trigno')[0];
    //     if(this.trignoFlag){
    //         this.functionFlag=false;
    //         this.toggleFunctionbutton();
    //         element.style.display='grid';
    //     }
    //     else{
    //         element.style.display='none';
    //     }
    // }
    
    // toggleFunctionbutton(){
    //     const element=document.getElementsByClassName('dropdown--function')[0];
    //     if(this.functionFlag){
    //         this.trignoFlag=false;
    //         this.toggleTrignobutton();
    //         element.style.display='grid';
    //     }
    //     else{
    //         element.style.display='none';
    //     }
    // }

    // closeTogglebuttons(){
    //     this.trignoFlag=false;
    //     this.functionFlag=false;
    //     this.toggleTrignobutton();
    //     this.toggleFunctionbutton();
    // }

    // toggleSecondfunctionality(element){
    //     const button1=document.getElementsByClassName('secondfunc--btn1')[0];
    //     const button2=document.getElementsByClassName('secondfunc--btn2')[0];
    //     if(this.secondFunctionality){
    //         element.style.backgroundColor = "#93c3e6";
    //         button1.querySelector('sup').textContent=3;
    //         button2.querySelector('sup').textContent=3;
    //     }
    //     else{
    //         element.style.backgroundColor= "#f7f7f7";
    //         button1.querySelector('sup').textContent=2;
    //         button2.querySelector('sup').textContent=2;
    //     }
    // }
}

document.addEventListener('DOMContentLoaded',()=>{
    const inputfield=document.getElementById("inputfield");
    new Calculator(inputfield);
})