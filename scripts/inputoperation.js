const inputOperation={
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

    clearDisplay(){
        this.display.value="";
    },

    displayError(){
        this.display.value="ERROR";
    },

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