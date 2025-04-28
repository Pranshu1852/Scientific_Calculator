const historyHandler = {
    // To toggle the history container
    toggleHistory(historyFlag) {
        const elements = {
            historyContainer: document.querySelector('.calculator__history'),
            display: document.querySelector('.calculator__display'),
            keypad: document.querySelector('.calculator__keypad'),
            historyHeading: document.querySelector('.history__heading'),
            calculator: document.querySelector('.calculator'),
            deleteHistorybtn: document.querySelector('.btn--clearHistory'),
        };
        if (!elements.historyContainer || !elements.display || !elements.keypad || !elements.calculator || !elements.historyHeading || !elements.deleteHistorybtn) {
            console.error("One or more required elements are missing from the DOM.");
            return;
        }
        if (historyFlag) {
            elements.historyContainer.style.display = 'flex';
            elements.display.style.display = 'none';
            elements.keypad.style.display = 'none';
            elements.calculator.style.justifyContent = 'space-between';
            elements.historyHeading.style.display = 'inline';
            elements.deleteHistorybtn.style.display = 'inline';
            this.getHistory();
            if (elements.historyContainer.offsetHeight < elements.historyContainer.scrollHeight) {
                elements.historyContainer.scrollTo(0, elements.historyContainer.scrollHeight);
            }
        }
        else {
            elements.historyContainer.style.display = 'none';
            elements.display.style.display = 'flex';
            elements.keypad.style.display = 'grid';
            elements.historyHeading.style.display = 'none';
            elements.deleteHistorybtn.style.display = 'none';
        }
    },
    // To create each history element into history container
    getHistory() {
        try {
            let historyArray = [];
            let storedHistory = localStorage.getItem('storedHistory');
            if (storedHistory) {
                historyArray = JSON.parse(storedHistory);
            }
            const historyContainer = document.querySelector('.calculator__history');
            historyContainer.innerHTML = "";
            const newList = document.createElement('ul');
            historyContainer.append(newList);
            historyArray.map((value) => {
                const listitem = document.createElement('li');
                listitem.append(value);
                newList.append(listitem);
            });
        }
        catch (error) {
            console.error("Failed to load history from localStorage:", error);
        }
    },
    // To add the result and expression into the history
    addHistory(str, result) {
        try {
            let historyArray = [];
            let storedHistory = localStorage.getItem('storedHistory');
            if (storedHistory) {
                historyArray = JSON.parse(storedHistory);
            }
            let historystring = str + " = " + result;
            historyArray.push(historystring);
            localStorage.setItem('storedHistory', JSON.stringify(historyArray));
        }
        catch (error) {
            console.error("Failed to add history to localStorage:", error);
        }
    }
};
export default historyHandler;
