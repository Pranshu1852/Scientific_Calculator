import Utilities from "./utilities.js";

interface operatorReplacer{
    replaceOperator: (string: string)=>string,
    replaceModulus: (string: string)=>string,
    replaceFactorial: (string: string)=>string,
    replaceRoot: (string: string,flag: boolean)=>string,
    replaceeuler: (string: string)=>string,
    replacetrigno: (string: string, flag: boolean)=>string,
    replaceFunctions: (string: string)=>string,
}

// To replace operators in string
const operatorReplacer: operatorReplacer={
    replaceOperator(inputString){
        return inputString.replaceAll('x','*')
                      .replaceAll('π','Math.PI')
                      .replaceAll('÷','/')
                      .replaceAll('log','Math.log10')
                      .replaceAll('ln','Math.log')
                      .replaceAll('^','**');
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
        return inputString.replace(regex,(match:string,num:string):string=>{
            return Utilities.factorial(+num).toString();
        });
    },

    replaceRoot(inputString,secondFunctionality){
        let regexroot=/√(\d+)|√\(?(\d+)(.\d+)?\)?/g;
        return inputString.replace(regexroot,(match:string,num:string):string=>{
            console.log(match);
            let str=match.substring(1,match.length);
            str=eval(str);
            return Utilities.Root(+str,secondFunctionality).toString();
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
        .replace(/tan\((.+)\)/g,(match:string,num:string):string=>{
            return (Number(Math.sin(Utilities.convertTorad(eval(num),degFlag)).toFixed(2))/Number(Math.cos(Utilities.convertTorad(eval(num),degFlag)).toFixed(2))).toString();
        })
        .replace(/cosec\((.+)\)/g,(match:string,num:string):string=>{
            return ((1/Number(Math.sin(Utilities.convertTorad(eval(num),degFlag)).toFixed(2))).toFixed(2)).toString();
        })
        .replace(/sec\((.+)\)/g,(match:string,num:string):string=>{
            return ((1/Number(Math.cos(Utilities.convertTorad(eval(num),degFlag)).toFixed(2))).toFixed(2)).toString();
        })
        .replace(/cot\((.+)\)/g,(match:string,num:string):string=>{
            return (Number(Math.cos(Utilities.convertTorad(eval(num),degFlag)).toFixed(2))/Number(Math.sin(Utilities.convertTorad(eval(num),degFlag)).toFixed(2))).toString();
        });
    },

    replaceFunctions(inputString){
        return inputString.replaceAll('ceil','Math.ceil')
                          .replaceAll('floor','Math.floor');
    },
}

// To generate final string that goes into eval
function finalString(inputString:string,degFlag:boolean,secondFunctionality:boolean):string {
    let replacedString=operatorReplacer.replaceOperator(inputString);
    replacedString=operatorReplacer.replaceModulus(replacedString);
    replacedString=operatorReplacer.replaceFactorial(replacedString);
    replacedString=operatorReplacer.replaceRoot(replacedString,secondFunctionality);
    replacedString=operatorReplacer.replaceeuler(replacedString);
    replacedString=operatorReplacer.replacetrigno(replacedString,degFlag);
    replacedString=operatorReplacer.replaceFunctions(replacedString);
    return replacedString;
}

export default finalString;