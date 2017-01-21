import Step from 'step';
import utils from 'utils';

export default class Step3 extends Step {
    constructor(data) {

        let button = document.querySelector('.button'),
            loader = document.querySelector('#loader');

        let prepareDOM = () => {
            button.classList.add('step3_button');
            button.classList.add('progress-circle');
            button.innerHTML = '<span id="timer"></span>';
            loader.style.display = 'block';
        }

        let processFile = (resolve, reject) => {
            let fr = new FileReader();

            fr.onload = function(e) {
                let inputArray = utils.convertStringToDataArray(e.target.result);

                utils.startWorker(inputArray, data.frameSize, resolve, reject);
                utils.startTimer();
            };
            fr.readAsText(data.file);
        }

        let clearDom = () => {
            button.classList = 'button';
            loader.style.display = 'none';
        }

        super(
            prepareDOM,
            processFile,
            clearDom
        );
    }

}
