const memoryHandler={
    addMemory(inputStr){
        this.memory+=eval(inputStr)||0;
        localStorage.setItem('memoryValue',this.memory);
    },

    subtractMemory(inputStr){
        this.memory-=eval(inputStr)||0;
        localStorage.setItem('memoryValue',this.memory);
    },

    storeMemory(inputStr){
        this.memory=eval(inputStr)||0;
        localStorage.setItem('memoryValue',this.memory);
    },

    clearMemory(){
        this.memory=0;
        localStorage.removeItem('memoryValue');
    },

    updateMemorybutton(){
        let hasMemory=this.memory===0?false:true;
        document.querySelector('.btn--MC').disabled=!hasMemory;
        document.querySelector('.btn--MR').disabled=!hasMemory;
    }
}

export default memoryHandler;