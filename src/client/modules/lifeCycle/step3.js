import Step from 'step';
import Worker from 'web.worker';
import Utils from 'utils';

export default class Step3 extends Step {
    constructor(data) {

        let button = document.querySelector('.button'),
            loader = document.querySelector('#loader'),
            utils = new Utils(),
            currentProgress = 0;

        let startWorker = (inputFile, resolve) => {
            let worker = new Worker;

            worker.postMessage({
                                    size: data.frameSize,
                                    array: inputFile
                                });

            worker.onmessage = function(event) {
                if(event.data.file) {
                    utils.finish(event.data.file, resolve);
                } else {
                    currentProgress = utils.showProgress(event.data.progress);
                }
            }
        }

        let prepareDOM = () => {
            button.classList.add('step3_button');
            button.classList.add('progress-circle');
            button.innerHTML = '<span id="timer"></span>';
            loader.style.display = 'block';
        }

        let processFile = (resolve) => {
            let fr = new FileReader();

            fr.onload = function(e) {
                let inputArray = utils.convertStringToDataArray(e.target.result);

                startWorker(inputArray, resolve);
                utils.startTimer();
            };
            fr.readAsText(data.file);
        }

        let clearDom = () => {
            button.classList.remove('step3_button');
            button.classList.remove('progress-circle');
            button.classList.remove(`progress-${currentProgress}`);
            loader.style.display = 'none';
        }

        super(
            prepareDOM,
            processFile,
            clearDom
        );
    }

}
