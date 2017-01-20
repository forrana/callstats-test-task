import Step from 'step';
import Worker from 'web.worker';

export default class Step2 extends Step {
    constructor(data) {
        let button = document.querySelector('.button'),
            loader = document.querySelector('#loader'),
            timer,
            interval,
            startTime;

            console.log(data);
        let startTimer = () => {
            timer =  document.querySelector("#timer");
            startTime = Date.now();

            interval = setInterval(() => {
               let elapsedTime = Date.now() - startTime;
               timer.innerHTML = (elapsedTime / 1000).toFixed(3);
           }, 100);
        }

        let finish = (file, resolve) => {
            let elapsedTime = Date.now() - startTime;

            console.info('end processing', new Date().getTime());
            clearInterval(interval);
            timer.innerHTML = (elapsedTime / 1000).toFixed(3);
            resolve(event.data.file);
        }

        let startWorker = (data, resolve) => {
            let worker = new Worker;

            worker.postMessage({
                                    size: 10000,
                                    array: data
                                });
            console.info('start processing', new Date().getTime());

            worker.onmessage = function(event) {
                if(event.data.file) {
                    finish(event.data.file, resolve);
                } else {
                    console.info(event.data.progress);
                }
            }
        }

        let prepareDOM = () => {
            button.classList.add('step2_button');
            button.innerHTML = '<span id="timer"></span>';
            loader.style.display = 'block';
        }

        let processFile = (resolve) => {
            let fr = new FileReader();

            fr.onload = function(e) {
                let inputArray = e.target.result.split('\n').map(value => +value),
                    startTime;

                startWorker(inputArray, resolve);
                startTimer();
            };
            console.log(data);
            fr.readAsText(data);
        }

        let clearDom = () => {
            button.classList.remove('step2_button');
            loader.style.display = 'none';
        }

        super(
            prepareDOM,
            processFile,
            clearDom
        );
    }

}
