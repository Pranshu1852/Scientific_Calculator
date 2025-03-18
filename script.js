const Utilities={
    factorial(num){
        if(num===0){
            return 1;
        }
    
        let ans=1;
        for(let i=1;i<=num;i++){
            ans*=i;
        }
    
        return ans;
    },
    
    squreRoot(num){
        return Math.sqrt(num);
    }
}

const operatorReplacer={
    replaceOperator(inputString){
        return inputString.replace('x','*')
                      .replace('π','Math.PI')
                      .replace('÷','/')
                      .replace('log','Math.log10')
                      .replace('ln','Math.log')
                      .replace('^','**');
    },

    replaceModulus(inputString){
        let regexmodulus=/\|(.+)\|/g;
        return inputString.replace(regexmodulus,(match,num)=>{
            let result=eval(num);
            if(result<0){
                result=-result;
            }                      
            return result;
        });
    },

    replaceFactorial(inputString){
        let regex=/(\d+)!/g;
        return inputString.replace(regex,(match,num)=>{
            return Utilities.factorial(+num);
        });
    },

    replaceRoot(inputString){
        let regexroot=/√(\d+)|√\(?(\d+)(.\d+)?\)?/g;
        return inputString.replace(regexroot,(match,num)=>{
            console.log(match);
            let str=match.substring(1,match.length);
            str=eval(str);
            return Utilities.squreRoot(+str);
        })
    }
}

function finalString(inputString){
    let replacedString=operatorReplacer.replaceOperator(inputString);
    replacedString=operatorReplacer.replaceModulus(replacedString);
    replacedString=operatorReplacer.replaceFactorial(replacedString);
    replacedString=operatorReplacer.replaceRoot(replacedString);
    return replacedString;
}

class Calculator{
    constructor(display){
        this.display=display;
        this.memory=+localStorage.getItem('memoryValue')||0;
        this.initiateEventListener();
    }

    initiateEventListener(){
        document.querySelectorAll(".btn").forEach((element)=>{
            element.addEventListener('click',(event)=>{
                this.handleButtonClick(element);
            });
        })
    }

    handleButtonClick(element){
        let buttonText=element.id||element.textContent;

        try{
            switch(buttonText){
                case 'back':{
                    this.handleBackspace();
                    break;
                }
                case 'C':{
                    this.clearDisplay();
                    break;
                }
                case '+/-':{
                    this.toggleSign();
                    break;
                }
                case '1/x':{
                    this.convertToreciprocal();
                    break;
                }
                case 'mod':{
                    this.addToinput('%');
                    break;
                }
                case 'log':{
                    this.addToinput('log(');
                    break;
                }
                case 'ln':{
                    this.addToinput('ln(');
                    break;
                }
                case 'x2':{
                    this.addToinput('^2');
                    break;
                }
                case '2√x':{
                    this.addToinput('√');
                    break;
                }
                case 'xy':{
                    this.addToinput('^');
                    break;
                }
                case '|x|':{
                    this.addToinput('|');
                    break;
                }
                case 'n!':{
                    this.addToinput('!');
                    break;
                }
                case 'exp':{
                    this.addToinput('.e+');
                    break;
                }
                case '10x':{
                    this.powerOften();
                    break;
                }
                case '=':{
                    this.calculate();
                    break;
                }
                case 'M+':{
                    this.memory+=eval(finalString(this.display.value))||0;
                    localStorage.setItem('memoryValue',this.memory);
                    this.updateMemorybutton();
                    break;
                }
                case 'M-':{
                    this.memory-=eval(finalString(this.displayvalue))||0;
                    localStorage.setItem('memoryValue',this.memory);
                    this.updateMemorybutton();
                    break;
                }
                case 'MS':{
                    this.memory=eval(finalString(this.display.value))||0;
                    localStorage.setItem('memoryValue',this.memory);
                    this.updateMemorybutton();
                    break;
                }
                case 'MC':{
                    this.memory=0;
                    localStorage.removeItem('memoryValue');
                    this.updateMemorybutton();
                    break;
                }
                case 'MR':{
                    this.display.value=this.memory;
                    break;
                }
                default:{
                    this.addToinput(buttonText);
                }
            }
        }catch{
            throw new Error('Error while getting button value');
        }
    }

    calculate(){
        try{     
            const result=eval(finalString(this.display.value));
            this.display.value=result;
        }catch(error){
            this.displayError();
        }
    }

    addToinput(value){
        if(this.display.value==="ERROR"){
            this.display.value=value;
        }
        else{
            this.display.value+=value;
        }
    }

    clearDisplay(){
        this.display.value="";
    }

    displayError(){
        this.display.value="ERROR";
    }

    handleBackspace(){
        if(this.display.value==='ERROR'){
            this.display.value="";
        }
        else{
            this.display.value=this.display.value.substring(0,this.display.value.length-1)
        }
    }

    toggleSign(){
        let regex=/(\d+)$/;
        let regexnot=/\(\-(\d+)\)$/;
        if(regex.test(this.display.value)){
            this.display.value=this.display.value.replace(regex,(match,num)=>{
                return '(-'+num+')';
            });
        }
        else if(regexnot.test(this.display.value)){
            this.display.value=this.display.value.replace(regexnot,(match,num)=>{
                return num;
            });
        }
    }

    convertToreciprocal(){
        let regex=/(\d+)$/;
        if(regex.test(this.display.value)){
            this.display.value=this.display.value.replace(regex,(match,num)=>{
                return '1/'+num;
            })
        }
        else{
            this.display.value+='1/';
        }
    }

    powerOften(){
        let regex=/(\d+)$/;
        if(regex.test(this.display.value)){
            this.display.value=this.display.value.replace(regex,(match,num)=>{
                return '10^'+num;
            })
        }
        else{
            this.display.value+='10^';
        }
    }

    updateMemorybutton(){
        let hasMemory=this.memory===0?false:true;
        document.querySelector('.btn--MC').disabled=!hasMemory;
        document.querySelector('.btn--MR').disabled=!hasMemory;
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const inputfield=document.getElementById("inputfield");
    new Calculator(inputfield);
})