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

        switch(buttonText){
            case 'back':{
                this.handleBackspace();
                break;
            }
            default:{
                this.addToinput(buttonText);
            }
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
}

document.addEventListener('DOMContentLoaded',()=>{
    const inputfield=document.getElementById("inputfield");
    new Calculator(inputfield);
})