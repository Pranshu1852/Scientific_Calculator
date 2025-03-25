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

export default Utilities;