import Step from 'step';

/**
 * Representing the start processing step. Initialize DOM, waiting for pressing start.
 * @param {file} file The result csv file from previous step.
 * @class StepFinish
 * @extends Step
 */
export default class StepFinish extends Step {
    constructor(file) {
        let button = document.querySelector('.button');

        /**
         * prepareDOM - Add step-class and pulse class on main button,
         *  Add 'download' and 'upload another' buttons to DOM
         *
         */
        let prepareDOM = () => {
            let timer = document.querySelector('#timer');

            button.classList.add('step4_button');
            button.classList.add('pulse');
            timer.removeAttribute('id');
            timer.classList.add('step_4_timer');

            button.insertAdjacentHTML('afterbegin',
            `
                <button type="button" role="button" class="step_4_button__return">
                    RESTART
                </button>
            `
            );
            button.insertAdjacentHTML('beforeend',
            `
                <a  role="button"
                    class="step_4_button__download"
                    href=${window.URL.createObjectURL(file)}
                    download="results.csv"
                >
                    DOWNLOAD
                </a>
            `
            );
        };

        /**
         * finalize - Add listeners on  button, waiting for pressing
         * @param {function} resolve finish step, pass data to next step.
         */
        let finalize = (resolve) => {
            let onClickFunction = () => {
                setTimeout(
                    () => resolve(true),
                    100
                );
            };

            document.querySelector('.step_4_button__return')
                    .addEventListener('click', onClickFunction);
        };

        /**
         * clearDom - Remove step-class from main button,
         *  Remove Start text from DOM
         *  Remove listeners
         */
        let clearDom = () => {
            button.classList.remove('step4_button');
            button.classList.remove('pulse');
            button.innerHTML = '';
        };

        super(
            prepareDOM,
            finalize,
            clearDom
        );
    }
}
