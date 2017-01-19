import Worker from 'web.worker';

export default class StateMachine{
    constructor() {
        this.button = document.querySelector('.button');
        this.loader = document.querySelector('#loader');
        this.resultLink = document.querySelector('#resultLink');

        this.currentStep = 0;
        this.uploadedFile = null;
        this.interval = null;

        this.lifeCycle = [
            this.step0,
            this.step1,
            this.step2,
            this.step3
        ];
    }

    nextStep(params) {
        this.currentStep < this.lifeCycle.length &&
            this.lifeCycle[this.currentStep].call(this, params);

        this.currentStep++;
    }

    start() {
        this.nextStep();
    }

    step0() {
        this.button.innerHTML = `
            Upload
            <input type="file" name="file" id="fileUploder">
        `;

        let fileUploader = document.querySelector('#fileUploder');

        fileUploder.addEventListener('change', (this.onFileUpload).bind(this))
    }

    onFileUpload(event) {
        this.uploadedFile = event.target.files[0];
        this.nextStep();
    }

    step1(){
        this.button.classList.add('button_start');
        this.button.innerHTML = 'Start';
        this.button.addEventListener('click', this.onStartClick.bind(this));
    }

    onStartClick() {
        this.nextStep();
    }

    step2(){
        this.button.classList.remove('button_start');
        this.button.classList.add('processing');
        this.button.removeEventListener('click', this.onStartClick);
        this.button.innerHTML = '<span id="timer"></span>';

        this.loader.style.display = 'block';

        this.processFile();
    }

    step3(file){
        this.resultLink.download = 'results.csv';
        this.resultLink.href = window.URL.createObjectURL(file);

        this.button.classList.remove('button_start');
        this.button.classList.add('button_download');
        this.button.classList.add('pulse');
    }

    processFile(){
        let fr = new FileReader();

        fr.onload = (function(e) {
            let inputArray = e.target.result.split('\n').map(value => +value),
                worker = new Worker,
                startTime;

            this.startWorker(inputArray);
            console.info('start processing', new Date().getTime());
            this.startTimer();
        }).bind(this);
        fr.readAsText(this.uploadedFile);
    }

    startTimer() {
        let startTime = Date.now();

        this.interval = setInterval(function() {
           let elapsedTime = Date.now() - startTime;
           document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(3);
       }, 100);
    }

    startWorker(data) {
        let worker = new Worker;

        worker.postMessage({
                                size: 1000,
                                array: data
                            });

        worker.onmessage = function(event) {
            console.info('end processing', new Date().getTime());
            clearInterval(this.interval);
            this.loader.style.display = 'none';
            this.nextStep(event.data.file);
        }.bind(this)
    }
}
