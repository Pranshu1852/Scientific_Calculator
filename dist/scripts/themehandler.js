// Toggle light and dark theme
function toggleTheme(toggledark) {
    const calculator = document.querySelector('.calculator');
    if (toggledark) {
        document.body.style.backgroundColor = "black";
        calculator.style.backgroundColor = "#242424";
        document.querySelectorAll('button').forEach((element) => {
            element.style.color = "white";
        });
        document.querySelectorAll('.calculator__keypad>button').forEach((element) => {
            element.style.backgroundColor = "#212121";
        });
        document.querySelectorAll('.number').forEach((element) => {
            element.style.backgroundColor = "black";
        });
    }
    else {
        document.body.style.backgroundColor = "";
        calculator.style.backgroundColor = "";
        document.querySelectorAll('button').forEach((element) => {
            element.style.color = "";
        });
        document.querySelectorAll('.calculator__keypad>button').forEach((element) => {
            element.style.backgroundColor = "";
        });
        document.querySelectorAll('.number').forEach((element) => {
            element.style.backgroundColor = "";
        });
    }
}
export default toggleTheme;
