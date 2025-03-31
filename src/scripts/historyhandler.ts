interface historyHandler{
    toggleHistory: (flag: boolean)=>void,
    getHistory: ()=>void,
    addHistory: (string: string,result: string)=>void
}

const historyHandler: historyHandler={
    // To toggle the history container
    toggleHistory(historyFlag){
        const historyContainer=document.querySelector('.calculator__history') as HTMLDivElement;
        const display=document.querySelector('.calculator__display') as HTMLDivElement;
        const keypad=document.querySelector('.calculator__keypad') as HTMLDivElement;
        const historyHeading=document.querySelector('.history__heading') as HTMLHeadingElement;
        const calculator=document.querySelector('.calculator') as HTMLDivElement;
        const deleteHistorybtn=document.querySelector('.btn--clearHistory') as HTMLButtonElement;
        if(historyFlag){
            historyContainer.style.display='flex';
            display.style.display='none';
            keypad.style.display='none';
            calculator.style.justifyContent='space-between';
            historyHeading.style.display='inline';
            deleteHistorybtn.style.display='inline';
            this.getHistory();
            if(historyContainer.offsetHeight<historyContainer.scrollHeight){
                historyContainer.scrollTo(0,historyContainer.scrollHeight)
            }
        }
        else{
            historyContainer.style.display='none';
            display.style.display='flex';
            keypad.style.display='grid';
            historyHeading.style.display='none';
            deleteHistorybtn.style.display='none';
        }
    },
    
    // To create each history element into history container
    getHistory(){
        let historyArray:string[]=[];
        let storedHistory=localStorage.getItem('storedHistory');
        if(storedHistory){
            historyArray=JSON.parse(storedHistory)
        }
        const historyContainer=document.querySelector('.calculator__history') as HTMLDivElement;
        historyContainer.innerHTML="";
    
        const newList=document.createElement('ul');
        historyContainer.append(newList);
    
        historyArray.map((value)=>{
            const listitem=document.createElement('li');
            listitem.append(value);
            newList.append(listitem);
        })
    },
    
    // To add the result and expression into the history
    addHistory(str, result){
        let historyArray:string[]=[];
        let storedHistory=localStorage.getItem('storedHistory');
        if(storedHistory){
            historyArray=JSON.parse(storedHistory)
        }
        let historystring=str+" = "+result;
        historyArray.push(historystring);
        localStorage.setItem('storedHistory',JSON.stringify(historyArray));
    }
}

export default historyHandler;