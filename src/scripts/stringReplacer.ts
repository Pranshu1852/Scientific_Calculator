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

const REGEX={
    MODULUS: /\|(.+)\|/g,
    FACTORIAL: /(\d+)!/g,
    ROOT: /√(\d+)|√\(?(\d+)(.\d+)?\)?/g,
    EULER: {
        DIGIT_e_DIGIT: /(\d)e(\d)/g,
        DIGIT_e: /(\d)e\b/g,
        e_DIGIT: /\be(\d)/g,
        _e_: /\be\b/g,
        ANY_e_ANY: /\.e\+/g
    },
    TRIGNO: {
        SIN: /sin\((.+)\)/g,
        COS: /cos\((.+)\)/g,
        TAN: /tan\((.+)\)/g,
        COSEC: /cosec\((.+)\)/g,
        SEC: /sec\((.+)\)/g,
        COT: /cot\((.+)\)/g
    } 
}

function validateInput(inputString: string) {
    try {
        if (typeof inputString !== 'string') {
            throw new Error('Input must be a string.');
        }
    } catch (error) {
        console.error(error);
    }
}

// To replace operators in string
const operatorReplacer: operatorReplacer={
    replaceOperator(inputString){
        validateInput(inputString);
        return inputString.replaceAll('x','*')
                      .replaceAll('π','Math.PI')
                      .replaceAll('÷','/')
                      .replaceAll('log','Math.log10')
                      .replaceAll('ln','Math.log')
                      .replaceAll('^','**');
    },

    replaceModulus(inputString){
        validateInput(inputString);
        let regexmodulus=REGEX.MODULUS;
        return inputString.replace(regexmodulus,(match,num)=>{
            let result=eval(num);
            if(result<0){
                result=-result;
            }                      
            return result;
        });
    },

    replaceFactorial(inputString){
        validateInput(inputString);
        let regex=REGEX.FACTORIAL;
        return inputString.replace(regex,(match:string,num:string):string=>{
            return Utilities.factorial(+num).toString();
        });
    },

    replaceRoot(inputString,secondFunctionality){
        validateInput(inputString);
        let regexroot=REGEX.ROOT;
        return inputString.replace(regexroot,(match:string,num:string):string=>{
            console.log(match);
            let str=match.substring(1,match.length);
            str=eval(str);
            return Utilities.Root(+str,secondFunctionality).toString();
        })
    },

    replaceeuler(inputString){
        validateInput(inputString);
        return inputString.replace(REGEX.EULER.DIGIT_e_DIGIT,"$1*Math.E*$2")
                    .replace(REGEX.EULER.DIGIT_e,"$1*Math.E")
                    .replace(REGEX.EULER.e_DIGIT,"Math.E*$1")
                    .replace(REGEX.EULER.ANY_e_ANY,"e")
                    .replace(REGEX.EULER._e_,"Math.E");
    },

    replacetrigno(inputString,degFlag){
        validateInput(inputString);
        return inputString.replace(REGEX.TRIGNO.SIN,(match,num)=>{
            return Math.sin(Utilities.convertTorad(eval(num),degFlag)).toFixed(2);
        })
        .replace(REGEX.TRIGNO.COS,(match,num)=>{
            return Math.cos(Utilities.convertTorad(eval(num),degFlag)).toFixed(2);
        })
        .replace(REGEX.TRIGNO.TAN,(match:string,num:string):string=>{
            return (Number(Math.sin(Utilities.convertTorad(eval(num),degFlag)).toFixed(2))/Number(Math.cos(Utilities.convertTorad(eval(num),degFlag)).toFixed(2))).toString();
        })
        .replace(REGEX.TRIGNO.COSEC,(match:string,num:string):string=>{
            return ((1/Number(Math.sin(Utilities.convertTorad(eval(num),degFlag)).toFixed(2))).toFixed(2)).toString();
        })
        .replace(REGEX.TRIGNO.SEC,(match:string,num:string):string=>{
            return ((1/Number(Math.cos(Utilities.convertTorad(eval(num),degFlag)).toFixed(2))).toFixed(2)).toString();
        })
        .replace(REGEX.TRIGNO.COT,(match:string,num:string):string=>{
            return (Number(Math.cos(Utilities.convertTorad(eval(num),degFlag)).toFixed(2))/Number(Math.sin(Utilities.convertTorad(eval(num),degFlag)).toFixed(2))).toString();
        });
    },

    replaceFunctions(inputString){
        validateInput(inputString);
        return inputString.replaceAll('ceil','Math.ceil')
                          .replaceAll('floor','Math.floor');
    },
}

// To generate final string that goes into eval
function finalString(inputString:string,degFlag:boolean,secondFunctionality:boolean):string {
    validateInput(inputString);
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