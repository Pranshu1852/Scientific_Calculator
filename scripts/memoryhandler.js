const memoryHandler={
    // To add the value into memory
    addMemory(inputStr){
        this.memory+=eval(inputStr)||0;
        localStorage.setItem('memoryValue',this.memory);
    },

    // To subtract value into memory
    subtractMemory(inputStr){
        this.memory-=eval(inputStr)||0;
        localStorage.setItem('memoryValue',this.memory);
    },

    // To store value into memory
    storeMemory(inputStr){
        this.memory=eval(inputStr)||0;
        localStorage.setItem('memoryValue',this.memory);
    },

    // To clear memory value
    clearMemory(){
        this.memory=0;
        localStorage.removeItem('memoryValue');
    },

    // To update the MC and MR button when there is some value in memory
    updateMemorybutton(){
        let hasMemory=this.memory===0?false:true;
        document.querySelector('.btn--MC').disabled=!hasMemory;
        document.querySelector('.btn--MR').disabled=!hasMemory;
    }
}

export default memoryHandler;