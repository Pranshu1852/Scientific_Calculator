import Calculator from "../script";

const MC_BUTTON_SELECTOR = '.btn--MC';
const MR_BUTTON_SELECTOR = '.btn--MR';

interface memoryHandler{
    addMemory: (this: Calculator,String: string)=>void,
    subtractMemory: (this: Calculator,String: string)=>void,
    storeMemory: (this: Calculator,String: string)=>void,
    clearMemory:(this: Calculator)=>void,
    updateMemorybutton: (this: Calculator)=>void,
}

const memoryHandler: memoryHandler={
    // To add the value into memory
    addMemory(inputStr){
        this.memory+=eval(inputStr)||0;
        localStorage.setItem('memoryValue',this.memory.toString());
    },

    // To subtract value into memory
    subtractMemory(inputStr){
        this.memory-=eval(inputStr)||0;
        localStorage.setItem('memoryValue',this.memory.toString());
    },

    // To store value into memory
    storeMemory(inputStr){
        this.memory=eval(inputStr)||0;
        localStorage.setItem('memoryValue',this.memory.toString());
    },

    // To clear memory value
    clearMemory(){
        this.memory=0;
        localStorage.removeItem('memoryValue');
    },

    // To update the MC and MR button when there is some value in memory
    updateMemorybutton(){
        let hasMemory=this.memory===0?false:true;
        (document.querySelector(MC_BUTTON_SELECTOR)! as HTMLButtonElement).disabled=!hasMemory;
        (document.querySelector(MR_BUTTON_SELECTOR)! as HTMLButtonElement).disabled=!hasMemory;
    }
}

export default memoryHandler;