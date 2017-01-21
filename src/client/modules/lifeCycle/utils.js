export default class {
    constructor(){
        this.button = document.querySelector('.button');
        this.currentProgress = 0;
    }

    startTimer() {
        this.startTime = Date.now();
        this.timer =  document.querySelector("#timer");

        this.interval = setInterval(() => {
           let elapsedTime = Date.now() - this.startTime;
           this.timer.innerHTML = (elapsedTime / 1000).toFixed(3);
       }, 100);
    }

    finish(file, resolve) {
        let elapsedTime = Date.now() - this.startTime;

        clearInterval(this.interval);
        this.timer.innerHTML = (elapsedTime / 1000).toFixed(3);
        resolve(event.data.file);
    }

    showProgress(actualProgress) {
        if(this.currentProgress < actualProgress) {
            this.button.classList.add(`progress-${ this.currentProgress + 5 }`);
            this.button.classList.remove(`progress-${ this.currentProgress }`);
            this.currentProgress += 5;

            return this.currentProgress;
        }
    }

    convertStringToDataArray(string) {
        let array = string.split('\n');

        while(array[array.length-1] === "") {
            array.pop();
        }

        return array.map(value => +value);
    }
}
