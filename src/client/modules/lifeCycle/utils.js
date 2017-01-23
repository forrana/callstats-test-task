import Worker from 'web.worker';

/**
 * Provide steps with specific logic.
 * @class Utils
 */
class Utils {
    /**
     * constructor - Setting global vars
     * @constructor
     */
    constructor() {
        this.button = document.querySelector('.button');
        this.currentProgress = 0;
    }

    /**
     * convertMillisecondsToHHMMSS - simple conversion from seconds to
     *  human readable format
     *
     * @param  {type} milliseconds description
     * @return {string} Time string in format mm:ss.sss
     */
    convertMillisecondsToHHMMSS(milliseconds) {
        return new Date(milliseconds).toISOString().substr(-10, 9);
    }

    /**
     * startTimer - start interval function which counts and writes on screen
     *  passed time
     *
     */
    startTimer() {
        this.startTime = Date.now();
        this.timer = document.querySelector('#timer');

        this.interval = setInterval(() => {
            let elapsedTime = Date.now() - this.startTime;

            this.timer.innerHTML = this.convertMillisecondsToHHMMSS(elapsedTime);
        }, 100);
    }

    /**
     * finish - stop timer, update screen with more precise data
     *  resolve passed into promise by file
     *
     * @param  {File} file    processed file blob object
     * @param  {Promise} resolve resolve promise
     */
    finish(file, resolve) {
        let elapsedTime = Date.now() - this.startTime;

        clearInterval(this.interval);
        this.timer.innerHTML = this.convertMillisecondsToHHMMSS(elapsedTime);
        resolve(file);
    }

    /**
     * showProgress - description
     *
     * @param  {number} actualProgress update progress on screen by changin class
     * @return {number} currently displayed progress
     */
    showProgress(actualProgress) {
        if (this.currentProgress < actualProgress) {
            this.button.classList.add(`progress-${this.currentProgress + 5}`);
            if (this.button.classList.contains(`progress-${this.currentProgress}`)) {
                this.button.classList.remove();
            }
            this.currentProgress += 5;

            return this.currentProgress;
        }
    }

    /**
     * clearProgress - clear currentProgress global var
     *
     */
    clearProgress() {
        this.currentProgress = 0;
    }

    /**
     * convertStringToDataArray - convert input string, recieved from *.csv file,
     *  to js Array, convert all string values into numbers
     *
     * @param  {string} string stringyfied input array
     * @return {number[]}        converted from string number array
     */
    convertStringToDataArray(string) {
        let array = string.split('\n');

        while (array[array.length - 1] === '') {
            array.pop();
        }

        return array.map(value => +value);
    }

    /**
     * startWorker - description
     *
     * @param  {number[]} inputDataArray recieved from *.csv file array
     * @param  {number} frameSize size of sliding window
     * @param  {Function} resolve   resolve Promise function
     * @param  {Function} reject    reject Promise function
     */
    startWorker(inputDataArray, frameSize, resolve, reject) {
        let worker = new Worker();

        worker.postMessage([frameSize, inputDataArray]);

        worker.onmessage = (event) => {
            if (event.data.progress) {
                this.showProgress(event.data.progress);
            } else if (event.data.error) {
                reject(event.data.error);
            } else {
                this.finish(event.data.file, resolve);
            }
        };
    }

    /**
     * detectFrameSize - detect sliding window frame size (Sf)
     *  by input array length (Si)
     *  formula: Si > 2 ? Sf = 10e( Math.floor( Math.log10( Si ) ) - 3 ) : 3
     *
     * @param  {number} size description
     * @return {type}      description
     */
    detectFrameSize(size) {
        let numberLength = size.toString().length;

        return numberLength > 2
            ? +`10e${numberLength - 3}`
            : 3;
    }

}

export default new Utils();
