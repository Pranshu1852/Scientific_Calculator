const inputOperation={
    // To add value/operator/ERROR in display 
    addToinput(value){
        if(this.display.value==="ERROR"){
            this.display.value=value;
        }
        else{
            this.display.value+=value;
        }

        if(this.display.offsetWidth<this.display.scrollWidth){
            this.display.scrollTo(this.display.scrollWidth,0);
        }
    },

    // To clear all values from display
    clearDisplay(){
        this.display.value="";
    },

    // To show ERROR in display
    displayError(){
        this.display.value="ERROR";
    },

    // To remove ERROR/ Last character from display
    handleBackspace(){
        if(this.display.value==='ERROR'){
            this.display.value="";
        }
        else{
            this.display.value=this.display.value.substring(0,this.display.value.length-1)
        }
    }
};

export default inputOperation;