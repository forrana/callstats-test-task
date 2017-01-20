import Step from 'step';
import Worker from 'web.worker';

export default class Step2 extends Step {
    constructor(data) {
        let button = document.querySelector('.button'),
            loader = document.querySelector('#loader'),
            interval,
            startTime;

        let startTimer = () => {
            startTime = Date.now();

            interval = setInterval(() => {
               let elapsedTime = Date.now() - startTime;
               document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(3);
           }, 100);
        }

        let startWorker = (data, resolve) => {
            let worker = new Worker;

            worker.postMessage({
                                    size: 1000,
                                    array: data
                                });

            worker.onmessage = function(event) {
                let elapsedTime = Date.now() - startTime;

                console.info('end processing', new Date().getTime());
                clearInterval(interval);
                document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(3);

                resolve(event.data.file);
            }
        }

        let prepareDOM = () => {
            button.classList.add('processing');
            button.innerHTML = '<span id="timer"></span>';
            loader.style.display = 'block';
        }

        let processFile = (resolve) => {
            let fr = new FileReader();

            fr.onload = function(e) {
                let inputArray = e.target.result.split('\n')
                                    .map(value => +value),
                    worker = new Worker,
                    startTime;

                startWorker(inputArray, resolve);
                console.info('start processing', new Date().getTime());
                startTimer();
            };

            fr.readAsText(data);
        }

        let clearDom = () => {
            button.classList.remove('processing');
            loader.style.display = 'none';
        }

        super(
            prepareDOM,
            processFile,
            clearDom
        );
    }

}
