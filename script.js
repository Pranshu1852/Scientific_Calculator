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
    
    Root(num,secondFunctionality){
        if(secondFunctionality){
            return Math.cbrt(num);
        }
        return Math.sqrt(num);
    },

    convertTorad(num,degFlag){
        if(degFlag){
            return num*Math.PI/180;
        }
        return num;
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

    replaceRoot(inputString,secondFunctionality){
        let regexroot=/√(\d+)|√\(?(\d+)(.\d+)?\)?/g;
        return inputString.replace(regexroot,(match,num)=>{
            console.log(match);
            let str=match.substring(1,match.length);
            str=eval(str);
            return Utilities.Root(+str,secondFunctionality);
        })
    },

    replaceeuler(inputString){
        return inputString.replace(/(\d)e(\d)/g,"$1*Math.E*$2")
                    .replace(/(\d)e\b/g,"$1*Math.E")
                    .replace(/\be(\d)/g,"Math.E*$1")
                    .replace(/\.e\+/g,"e")
                    .replace(/\be\b/g,"Math.E");
    },

    replacetrigno(inputString,degFlag){
        return inputString.replace(/sin\((.+)\)/g,(match,num)=>{
            return Math.sin(Utilities.convertTorad(eval(num),degFlag)).toFixed(2);
        })
        .replace(/cos\((.+)\)/g,(match,num)=>{
            return Math.cos(Utilities.convertTorad(eval(num),degFlag)).toFixed(2);
        })
        .replace(/tan\((.+)\)/g,(match,num)=>{
            return Math.sin(Utilities.convertTorad(eval(num),degFlag)).toFixed(2)/Math.cos(Utilities.convertTorad(eval(num),degFlag)).toFixed(2);
        })
        .replace(/cosec\((.+)\)/g,(match,num)=>{
            return (1/Math.sin(Utilities.convertTorad(eval(num),degFlag)).toFixed(2)).toFixed(2);
        })
        .replace(/sec\((.+)\)/g,(match,num)=>{
            return (1/Math.cos(Utilities.convertTorad(eval(num),degFlag)).toFixed(2)).toFixed(2);
        })
        .replace(/cot\((.+)\)/g,(match,num)=>{
            return Math.cos(Utilities.convertTorad(eval(num),degFlag)).toFixed(2)/Math.sin(Utilities.convertTorad(eval(num),degFlag)).toFixed(2);
        });
    },

    replaceFunctions(inputString){
        return inputString.replace('ceil','Math.ceil')
                          .replace('floor','Math.floor');
    },

    replaceBrackets(inputString){
        return inputString.replace(/(\d)\(/g,"$1*(")
                          .replace(/\)(\d)/g,")*$1");
    }
}

function finalString(inputString,degFlag,secondFunctionality){
    let replacedString=operatorReplacer.replaceOperator(inputString);
    replacedString=operatorReplacer.replaceModulus(replacedString);
    replacedString=operatorReplacer.replaceFactorial(replacedString);
    replacedString=operatorReplacer.replaceRoot(replacedString,secondFunctionality);
    replacedString=operatorReplacer.replaceeuler(replacedString);
    replacedString=operatorReplacer.replacetrigno(replacedString,degFlag);
    replacedString=operatorReplacer.replaceFunctions(replacedString);
    replacedString=operatorReplacer.replaceBrackets(replacedString);
    return replacedString;
}

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
        this.updateMemorybutton();
    }

    initiateEventListener(){
        document.querySelectorAll(".btn").forEach((element)=>{
            element.addEventListener('click',(event)=>{
                this.handleButtonClick(element);
            });
        });

        document.addEventListener('click',(event)=>{
            if(!(event.target.className==="row3__btn--trigno btn"||event.target.className==="row3__btn--function btn")){
                this.closeTogglebuttons();
            }
        });

        document.querySelector('.btn--history').addEventListener('click',(event)=>{
            this.historyFlag=!this.historyFlag;
            this.toggleHistory();
        })
        
        document.querySelector('.btn--clearHistory').addEventListener('click',(event)=>{
            localStorage.removeItem('storedHistory');
            this.getHistory();
        })

        document.querySelector('.btn--theme').addEventListener('click',(event)=>{
            this.toggledark=!this.toggledark;
            this.toggleTheme();
        })

        document.addEventListener('keydown',(event)=>{
            this.handleKeyboardinput(event.key);
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
                case '2√x':
                case '3√x':{
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
                case 'M+':{
                    this.memory+=eval(finalString(this.display.value,this.degFlag,this.secondFunctionality))||0;
                    localStorage.setItem('memoryValue',this.memory);
                    this.updateMemorybutton();
                    break;
                }
                case 'M-':{
                    this.memory-=eval(finalString(this.displayvalue,this.degFlag,this.secondFunctionality))||0;
                    localStorage.setItem('memoryValue',this.memory);
                    this.updateMemorybutton();
                    break;
                }
                case 'MS':{
                    this.memory=eval(finalString(this.display.value,this.degFlag,this.secondFunctionality))||0;
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
                case 'Trigonometry':{
                    this.trignoFlag=!this.trignoFlag;
                    this.toggleTrignobutton();
                    break;
                }
                case '𝑓Function':{
                    this.functionFlag=!this.functionFlag;
                    this.toggleFunctionbutton();
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
                    this.addToinput(buttonText+'(');
                    break;
                }
                case '2nd':{
                    this.secondFunctionality=!this.secondFunctionality;
                    this.toggleSecondfunctionality(element);
                    break;
                }
                case 'x3':{
                    this.addToinput('^3');
                    break;
                }
                case '2√x':{
                    this.addToinput('√');
                    break;
                }
                case '=':{
                    this.calculate();
                    break;
                }
                case 'F-E':{
                    this.convertFixedToExponent();
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

    handleKeyboardinput(value){
        let regex=/[0-9\|\^\(\)\.\+\-\%\!\/\*]/g;
        
        if(regex.test(value)){
            console.log("inside");
            
            this.addToinput(value);
        }
        else if(value==="Backspace"){
            this.handleBackspace();
        }
        else if(value==="Enter"){
            this.calculate();
        }
    }

    calculate(){
        try{ 
            const originalinput=this.display.value;
            const finalInput=finalString(originalinput,this.degFlag,this.secondFunctionality);
            console.log(finalInput);
            
            const result=eval(finalInput);
            this.display.value=result;
            this.addHistory(originalinput,result);
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
        let regex=/((\d+)\.?(\d*))$/;
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
        let regex=/((\d+)\.?(\d*))$/;
        if(regex.test(this.display.value)){
            this.display.value=this.display.value.replace(regex,(match,num)=>{
                return '10^'+num;
            })
        }
        else{
            this.display.value+='10^';
        }
    }

    convertFixedToExponent(){
        let regexfe=/(\d+)\.?(\d*)$/g;
        if(regexfe.test(this.display.value)){
            this.display.value=this.display.value.replace(regexfe,(match,num1,num2)=>{
                console.log(num1+" "+num2);
                if(num2===""){
                    console.log("inside");
                    
                    if(num1.length>1){
                        let firstnum=num1[0];
                        let remaining=num1.slice(1,num1.length);
                        let exponential=remaining.length;
                        if(+remaining===0){
                            remaining='0';
                        }
                        return firstnum+'.'+remaining+'x10^'+exponential;
                    }
                    
                    return num1+'x10^0';
                }
                else if(+num1===0&&+num2!=0){
                    let start=0;
                    for(let i=0;i<num2.length;i++){
                        if(num2[i]!='0'){
                            start=i;
                            break;
                        }
                    }
                    num2=num2.slice(start,num2.length);

                    return num2+'x10^-'+num2.length;
                }
                else{
                    return num1+num2+'x10^-'+num2.length;
                }
            });
        }
    }

    updateMemorybutton(){
        let hasMemory=this.memory===0?false:true;
        document.querySelector('.btn--MC').disabled=!hasMemory;
        document.querySelector('.btn--MR').disabled=!hasMemory;
    }

    toggleTrignobutton(){
        const element=document.getElementsByClassName('dropdown--trigno')[0];
        if(this.trignoFlag){
            this.functionFlag=false;
            this.toggleFunctionbutton();
            element.style.display='grid';
        }
        else{
            element.style.display='none';
        }
    }
    
    toggleFunctionbutton(){
        const element=document.getElementsByClassName('dropdown--function')[0];
        if(this.functionFlag){
            this.trignoFlag=false;
            this.toggleTrignobutton();
            element.style.display='grid';
        }
        else{
            element.style.display='none';
        }
    }

    closeTogglebuttons(){
        this.trignoFlag=false;
        this.functionFlag=false;
        this.toggleTrignobutton();
        this.toggleFunctionbutton();
    }

    toggleSecondfunctionality(element){
        const button1=document.getElementsByClassName('secondfunc--btn1')[0];
        const button2=document.getElementsByClassName('secondfunc--btn2')[0];
        if(this.secondFunctionality){
            element.style.backgroundColor = "#93c3e6";
            button1.querySelector('sup').textContent=3;
            button2.querySelector('sup').textContent=3;
        }
        else{
            element.style.backgroundColor= "#f7f7f7";
            button1.querySelector('sup').textContent=2;
            button2.querySelector('sup').textContent=2;
        }
    }

    toggleHistory(){
        const historyContainer=document.querySelector('.calculator__history');
        const display=document.querySelector('.calculator__display');
        const keypad=document.querySelector('.calculator__keypad');
        const historyHeading=document.querySelector('.history__heading');
        const calculator=document.querySelector('.calculator');
        const deleteHistorybtn=document.querySelector('.btn--clearHistory');
        if(this.historyFlag){
            historyContainer.style.display='flex';
            display.style.display='none';
            keypad.style.display='none';
            calculator.style.justifyContent='space-between';
            historyHeading.style.display='inline';
            deleteHistorybtn.style.display='inline';
            this.getHistory();
        }
        else{
            historyContainer.style.display='none';
            display.style.display='flex';
            keypad.style.display='grid';
            historyHeading.style.display='none';
            deleteHistorybtn.style.display='none';
        }
    }
    
    getHistory(){
        let historyArray=JSON.parse(localStorage.getItem('storedHistory'))||[];
        const historyContainer=document.querySelector('.calculator__history');
        historyContainer.innerHTML="";
    
        const newList=document.createElement('ul');
        historyContainer.append(newList);
    
        historyArray.map((value)=>{
            const listitem=document.createElement('li');
            listitem.append(value);
            newList.append(listitem);
        })
    }
    
    addHistory(str, result){
        let historyArray=JSON.parse(localStorage.getItem('storedHistory'))||[];
        let historystring=str+" = "+result;
        historyArray.push(historystring);
        localStorage.setItem('storedHistory',JSON.stringify(historyArray));
    }

    toggleTheme(){
        const calculator=document.querySelector('.calculator');
        
        if(this.toggledark){
            document.body.style.backgroundColor="black";
            calculator.style.backgroundColor="#242424";
            document.querySelectorAll('button').forEach((element)=>{
                element.style.color="white";
            })
            document.querySelectorAll('.calculator__keypad>button').forEach((element)=>{
                element.style.backgroundColor="#212121";
            })
            document.querySelectorAll('.number').forEach((element)=>{
                element.style.backgroundColor="black";
            })
        }
        else{
            document.body.style.backgroundColor="";
            calculator.style.backgroundColor="";
            document.querySelectorAll('button').forEach((element)=>{
                element.style.color="";
            })
            document.querySelectorAll('.calculator__keypad>button').forEach((element)=>{
                element.style.backgroundColor="";
            })
            document.querySelectorAll('.number').forEach((element)=>{
                element.style.backgroundColor="";
            })
        }
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const inputfield=document.getElementById("inputfield");
    new Calculator(inputfield);
})