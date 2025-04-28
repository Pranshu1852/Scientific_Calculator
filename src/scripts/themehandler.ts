// Toggle light and dark theme
function toggleTheme(toggledark: boolean): void{
    const calculator=document.querySelector('.calculator') as HTMLDivElement;
    if(toggledark){
        document.body.style.backgroundColor="black";
        calculator.style.backgroundColor="#242424";
        document.querySelectorAll('button').forEach((element)=>{
            (element as HTMLButtonElement).style.color="white";
        })
        document.querySelectorAll('.calculator__keypad>button').forEach((element)=>{
            (element as HTMLButtonElement).style.backgroundColor="#212121";
        })
        document.querySelectorAll('.number').forEach((element)=>{
            (element as HTMLButtonElement).style.backgroundColor="black";
        })
    }
    else{
        document.body.style.backgroundColor="";
        calculator.style.backgroundColor="";
        document.querySelectorAll('button').forEach((element)=>{
            (element as HTMLButtonElement).style.color="";
        })
        document.querySelectorAll('.calculator__keypad>button').forEach((element)=>{
            (element as HTMLButtonElement).style.backgroundColor="";
        })
        document.querySelectorAll('.number').forEach((element)=>{
            (element as HTMLButtonElement).style.backgroundColor="";
        })
    }
}


export default toggleTheme;