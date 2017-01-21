import Worker from 'web.worker';
class Utils{
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
            this.button.classList.add(`progress-${ this.currentProgress*100 + 5 }`);
            this.button.classList.remove(`progress-${ this.currentProgress*100 }`);
            this.currentProgress += 0.05;

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

    startWorker(inputFile, frameSize, resolve, reject) {
        let worker = new Worker,
            currentProgress = 0;

        worker.postMessage({
                                size: frameSize,
                                array: inputFile
                            });

        worker.onmessage = (event) => {
            if(event.data.progress) {
                currentProgress = this.showProgress(event.data.progress);
            } else if (event.data.error){
                reject(event.data.error);
            } else {
                this.finish(event.data.file, resolve);
            }
        }
    }

    detectFrameSize(size) {
        let expectedSize,
            numberLength = size.toString().length;

        if(numberLength > 2) {
            expectedSize = +`10e${numberLength - 3}`;
        } else {
            expectedSize = 3;
        }

        return expectedSize;
    }

}

export default new Utils();
