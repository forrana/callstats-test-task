import Step from 'step';
import utils from 'utils';

/**
 * Representing the processing step. Initialize DOM, processing data, pass it to next step.
 * @class StepProcessing
 * @extends Step
 */
export default class StepProcessing extends Step {

    /**
     * constructor - create processing step
     * @constructor
     */
    constructor(data) {

        let button = document.querySelector('.button'),
            loader = document.querySelector('#loader');

        /**
         * prepareDOM - Add step-class, progress circle class on main button,
         *  Add timer element
         *  Reveal loader
         *
         */
        let prepareDOM = () => {
            button.classList.add('step3_button');
            button.classList.add('progress-circle');
            button.innerHTML = '<span id="timer"></span>';
            loader.style.display = 'block';
        };

        /**
         * processFile - Pass data to webWorker, waiting for result, pass it.
         * @param {function} resolve finish step, pass data to next step.
         * @param {function} reject finish step, pass data to super class error catcher.
         */

        let processFile = (resolve, reject) => {
            let fr = new FileReader();

            fr.onload = function (e) {
                let inputArray = utils.convertStringToDataArray(e.target.result);

                utils.startWorker(inputArray, data.frameSize, resolve, reject);
                utils.startTimer();
            };
            fr.readAsText(data.file);
        };

        /**
         * clearDom - Remove all extra classes from main button,
         *  Hide loader
         *  Reset progress bar
         */
        let clearDom = () => {
            utils.clearProgress();
            button.classList = 'button';
            loader.style.display = 'none';
        };

        super(prepareDOM, processFile, clearDom);
    }

}
