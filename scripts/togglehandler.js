const toggleHandler={
    // To toggle between sign of last number
    toggleSign(){
        let regex=/(\d+)$/;
        let regexnot=/\(\-(\d+)\)$/;
        if(regex.test(this.displayValue)){
            this.displayValue=this.displayValue.replace(regex,(match,num)=>{
                return '(-'+num+')';
            });
        }
        else if(regexnot.test(this.displayValue)){
            this.displayValue=this.displayValue.replace(regexnot,(match,num)=>{
                return num;
            });
        }
    },

    // To covert last number to reciprocal
    convertToreciprocal(){
        let regex=/((\d+)\.?(\d*))$/;
        if(regex.test(this.displayValue)){
            this.displayValue=this.displayValue.replace(regex,(match,num)=>{
                return '1/'+num;
            })
        }
        else{
            this.displayValue+='1/';
        }
    },

    // To convert last number into 10^number
    powerOften(){
        let regex=/((\d+)\.?(\d*))$/;
        if(regex.test(this.displayValue)){
            this.displayValue=this.displayValue.replace(regex,(match,num)=>{
                return '10^'+num;
            })
        }
        else{
            this.displayValue+='10^';
        }
    },

    // To toggle from Fixed to exponent
    convertFixedToExponent(){
        let regexfe=/(\d+)\.?(\d*)$/g;
        if(regexfe.test(this.displayValue)){
            this.displayValue=this.displayValue.replace(regexfe,(match,num1,num2)=>{
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
    },

    // To toggle between second functionality
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
};

// To toggle trigonometry button
export function toggleTrignobutton(){
    const element=document.getElementsByClassName('dropdown--trigno')[0];
    if(this.trignoFlag){
        this.functionFlag=false;
        toggleFunctionbutton.call(this);
        element.style.display='grid';
    }
    else{
        element.style.display='none';
    }
};

// To toggle function button
export function toggleFunctionbutton(){
    console.log('function');
    
    const element=document.getElementsByClassName('dropdown--function')[0];
    if(this.functionFlag){
        this.trignoFlag=false;
        toggleTrignobutton.call(this);
        element.style.display='grid';
    }
    else{
        element.style.display='none';
    }
};

// To close trigonometry and function button
export function closeTogglebuttons(){
    this.trignoFlag=false;
    this.functionFlag=false;
    toggleTrignobutton.call(this);
    toggleFunctionbutton.call(this);
};

export default toggleHandler;