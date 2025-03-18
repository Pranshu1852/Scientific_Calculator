class Calculator{
    constructor(display){
        this.display=display;
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
                default:{
                    this.addToinput(buttonText);
                }
            }
        }catch{
            throw new Error('Error while getting button value');
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
}

document.addEventListener('DOMContentLoaded',()=>{
    const inputfield=document.getElementById("inputfield");
    new Calculator(inputfield);
})