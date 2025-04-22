// To handle keyboard input
function handleKeyboardinput(value) {
    let regex = /[0-9\|\^\(\)\.\+\-\%\!\/\*]/g;
    if (regex.test(value)) {
        console.log("inside");
        this.inputOperation.addToinput(value);
    }
    else if (value === "Backspace") {
        this.inputOperation.handleBackspace();
    }
    else if (value === "Enter") {
        this.calculate();
    }
}
export default handleKeyboardinput;
