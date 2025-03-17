let inputfield=document.getElementById("inputfield");


window.onload=()=>{
    updatememorybutton();
}


function fact(num){
    if(num===0){
        return 1;
    }

    let ans=1;
    for(let i=1;i<=num;i++){
        ans*=i;
    }

    return ans;
}

function squreroot(num){
    return Math.sqrt(num);
}

let inputtext="";
function isoperator(char){
    if(char==='+'||char==='-'||char==='x'||char==='÷'){
        return true;
    }
    return false;
}


function finalstring(str){
    let newstr=str.replace('x','*');
    newstr=newstr.replace('π','Math.PI');
    newstr=newstr.replace('÷','/');
    newstr=newstr.replace('log','Math.log10');
    newstr=newstr.replace('ln','Math.log');
    newstr=newstr.replace('^','**');
    // newstr=newstr.replace('e','*2.718281828459045*');
    let regex=/(\d+)!/g;
    newstr=newstr.replace(regex,(match,num)=>{
        return fact(+num);
    })
    let regexroot=/√(\d+)|√\(?(\d+)(.\d+)?\)?/g;
    newstr=newstr.replace(regexroot,(match,num)=>{
        console.log(match);
        let str=match.substring(1,match.length);
        str=eval(str);
        
        
        return squreroot(+str);
    })
    let regexmodulus=/\|(.+)\|/g;
    newstr=newstr.replace(regexmodulus,(match,num)=>{
        console.log(num);
        
        let cal=eval(num);
        if(cal<0){
            cal=-cal;
        }
        // console.log(cal);
                            
        return cal;
    });

    newstr=newstr.replace(/(\d)e(\d)/g,"$1*Math.E*$2")
                    .replace(/(\d)e\b/g,"$1*Math.E")
                    .replace(/\be(\d)/g,"Math.E*$1")
                    .replace(/\be\b/g,"Math.E");

    newstr=newstr.replace('ceil','Math.ceil')
    newstr=newstr.replace('floor','Math.floor')
    newstr=newstr.replace(/sin\((.+)\)/g,`Math.sin(converttorad($1)).toFixed(2)`);
    newstr=newstr.replace(/cos\((.+)\)/g,"Math.cos(converttorad($1)).toFixed(2)");
    newstr=newstr.replace(/tan\((.+)\)/g,"Math.sin(converttorad($1)).toFixed(2)/Math.cos(converttorad($1)).toFixed(2)");
    newstr=newstr.replace(/cosec\((.+)\)/g,"(1/Math.sin(converttorad($1)).toFixed(2)).toFixed(2)");
    newstr=newstr.replace(/sec\((.+)\)/g,"(1/Math.cos(converttorad($1)).toFixed(2)).toFixed(2)");
    newstr=newstr.replace(/cot\((.+)\)/g,"Math.cos(converttorad($1)).toFixed(2)/Math.sin(converttorad($1)).toFixed(2)");

    return newstr;
}

let trignoflag=false;
let functionflag=false;
let memory=+localStorage.getItem('memoryValue')||0;

function togglebutton(){
    const ele=document.getElementsByClassName('dropdown--trigno')[0];
    if(trignoflag){
        functionflag=false;
        // togglebutton();
        ele.style.display='grid';
    }
    else{
        ele.style.display='none';
    }

    // const ele1=document.getElementsByClassName('dropdown--function')[0];
    // if(functionflag){
    //     trignoflag=false;
    //     togglebutton();
    //     ele1.style.display='grid';
    // }
    // else{
    //     ele1.style.display='none';
    // }
}


let degflag=true;

function converttorad(num){
    if(degflag){
        return (num*Math.PI/180);
    }
    return num;
}

function updatememorybutton(){
    let hasMemory=memory===0?false:true;
    document.querySelector('.btn--MC').disabled=!hasMemory;
    document.querySelector('.btn--MR').disabled=!hasMemory;
}


document.querySelectorAll(".btn").forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
        let expression=ele.id||ele.textContent;
        // console.log(expression);
        
        switch(expression){
            case 'back':{
                if(inputfield.value==='ERROR'){
                    inputfield.value="";
                }
                else{
                    inputfield.value=inputfield.value.substring(0,inputfield.value.length-1)
                }
                break;
            }
            case 'C':{
                inputfield.value="";
                break;
            }
            case '+/-':{
                let regex=/(\d+)$/;
                let regexnot=/\(\-(\d+)\)$/;
                if(regex.test(inputfield.value)){
                    inputfield.value=inputfield.value.replace(regex,(match,num)=>{
                        return '(-'+num+')';
                    });
                }
                else if(regexnot.test(inputfield.value)){
                    
                    inputfield.value=inputfield.value.replace(regexnot,(match,num)=>{
                        console.log("inside");
                        return num;
                    });
                }
                break;
            }
            case 'F-E':{
                let regexfe=/(\d+)?\.?(\d+)$/g;
                if(regexfe.test(inputfield.value)){
                    inputfield.value=inputfield.value.replace(regexfe,(match,num1,num2)=>{
                        console.log("num:"+num2);
                        if(num1===""){
                            if(num2.length>1){
                                let firstnum=num2[0];
                                let remaining=num2.slice(1,num.length);
                                let exponential=remaining.length;
                                if(+remaining===0){
                                    remaining='0';
                                }
                                return firstnum+'.'+remaining+'x10^'+exponential;
                            }
                            
                            return num2+'x10^0';
                        }
                    });
                }

                break;
            }
            case 'mod':{
                inputfield.value+='%';
                break;
            }
            case 'log':{
                inputfield.value+='log(';
                break;
            }
            case 'ln':{
                inputfield.value+='ln(';
                break;
            }
            case 'x2':{
                inputfield.value+='^2';
                break;
            }
            case '2√x':{
                inputfield.value+='√';
                break;
            }
            case 'xy':{
                inputfield.value+='^';
                break;
            }
            case '1/x':{
                let regex=/(\d+)$/;
                if(regex.test(inputfield.value)){
                    inputfield.value=inputfield.value.replace(regex,(match,num)=>{
                        return '1/'+num;
                    })
                }
                else{
                    inputfield.value+='1/';
                }
                break;
            }
            case '|x|':{
                inputfield.value+='|';
                break;
            }
            case '10x':{
                let regex=/(\d+)$/;
                if(regex.test(inputfield.value)){
                    inputfield.value=inputfield.value.replace(regex,(match,num)=>{
                        return '10^'+num;
                    })
                }
                else{
                    inputfield.value+='10^';
                }
                break;
            }
            case 'n!':{
                inputfield.value+='!';
                break;
            }
            case 'exp':{
                inputfield.value+='.e+'
                break;
            }
            case 'Trigonometry':{
                trignoflag=!trignoflag;
                togglebutton();
                console.log(trignoflag);
                break;
            }
            case '𝑓Function':{
                functionflag=!functionflag;
                console.log(functionflag);
                break;
            }
            case 'M+':{
                memory+=eval(finalstring(inputfield.value));
                localStorage.setItem('memoryValue',memory);
                updatememorybutton();
                console.log(memory);
                break;
            }
            case 'M-':{
                memory-=eval(finalstring(inputfield.value));
                localStorage.setItem('memoryValue',memory);
                updatememorybutton();
                break;
            }
            case 'MS':{
                memory=eval(finalstring(inputfield.value));
                localStorage.setItem('memoryValue',memory);
                updatememorybutton();
                break;
            }
            case 'MC':{
                memory=0;
                localStorage.removeItem('memoryValue');
                updatememorybutton();
                break;
            }
            case 'MR':{
                inputfield.value=memory;
                break;
            }
            case 'DEG':{
                degflag=false;
                ele.textContent='RAD';
                break;
            }
            case 'RAD':{
                degflag=true;
                ele.textContent='DEG';
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
                inputfield.value+=ele.textContent+'(';
                break;
            }
            case '=':{
                let newstr=finalstring(inputfield.value)
                
                console.log(newstr);
                try{
                    inputfield.value=eval(newstr);
                }
                catch(err){
                    inputfield.value="ERROR"
                }
                break;
            }
            default:{
                inputfield.value+=ele.textContent;
            }
        }
    })
})

document.addEventListener('keydown',(e)=>{
    if('0123456789'.includes(e.key)||'()x-+||'.includes(e.key)){
        inputfield.value+=e.key;
    }
})
