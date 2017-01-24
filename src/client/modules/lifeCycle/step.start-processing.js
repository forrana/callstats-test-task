import Step from 'step';

/**
 * Representing the start processing step. Initialize DOM, waiting for pressing start.
 * @class StepStartProcessing
 * @extends Step
 */
export default class StepStartProcessing extends Step {
    constructor(data) {
        let button = document.querySelector('.button'),
            onClickFunction,
            onKeyEnterClickFunction;

        /**
         * prepareDOM - Add step-class on main button,
         *  Add Start text to DOM
         *
         */
        let prepareDOM = () => {
            button.classList.add('step2_button');
            button.innerHTML = 'START';
        };

        /**
         * waitingForStart - Add listener on window and button, waiting for pressing
         * @param {function} resolve finish step, pass data to next step.
         */
        let waitingForStart = (resolve) => {
            onClickFunction = () => resolve(data);
            button.addEventListener('click', onClickFunction);

            onKeyEnterClickFunction = (event) => {
                event.keyCode === 13 && onClickFunction(event);
            };

            window.addEventListener('keypress', onKeyEnterClickFunction);
        };

        /**
         * clearDom - Remove step-class from main button,
         *  Remove Start text from DOM
         *  Remove listeners
         */
        let clearDom = () => {
            button.innerHTML = '';
            button.classList.remove('step2_button');
            button.removeEventListener('click', onClickFunction);
            window.removeEventListener('keypress', onKeyEnterClickFunction);
        };

        super(prepareDOM, waitingForStart, clearDom);
    }
}
