interface utilities{
    factorial: (args: number)=>number,
    Root: (num: number,flag: boolean)=>number,
    convertTorad: (num: number,flag: boolean)=>number
}

const Utilities: utilities={
    // To calculate factorial
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
    
    // To get square and cube root of number
    Root(num,secondFunctionality){
        if(secondFunctionality){
            return Math.cbrt(num);
        }
        return Math.sqrt(num);
    },

    // To toggle value from degree to radian
    convertTorad(num,degFlag){
        if(degFlag){
            return num*Math.PI/180;
        }
        return num;
    }
}

export default Utilities;