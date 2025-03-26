const historyHandler={
    // To toggle the history container
    toggleHistory(historyFlag){
        const historyContainer=document.querySelector('.calculator__history');
        const display=document.querySelector('.calculator__display');
        const keypad=document.querySelector('.calculator__keypad');
        const historyHeading=document.querySelector('.history__heading');
        const calculator=document.querySelector('.calculator');
        const deleteHistorybtn=document.querySelector('.btn--clearHistory');
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
        let historyArray=JSON.parse(localStorage.getItem('storedHistory'))||[];
        const historyContainer=document.querySelector('.calculator__history');
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
        let historyArray=JSON.parse(localStorage.getItem('storedHistory'))||[];
        let historystring=str+" = "+result;
        historyArray.push(historystring);
        localStorage.setItem('storedHistory',JSON.stringify(historyArray));
    }
}

export default historyHandler;