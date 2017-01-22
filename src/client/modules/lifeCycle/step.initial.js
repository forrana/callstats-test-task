import Step from 'step';

/**
 * Representing the initial step. Initialize DOM, waiting for file uploading.
 * @class StepInitial
 * @extends Step
 */
export default class StepInitial extends Step {

    /**
     * constructor - create initial step of our application
     * @constructor
     */
    constructor() {
        let button = document.querySelector('.button');

        /**
         * prepareDOM - Add step-class on main button,
         *  Add file uploader to DOM
         *
         */
        let prepareDOM = () => {
            button.classList.add('step_1_button--upload');
            button.innerHTML =
                        `Upload
                        <input type="file" name="file" id="fileUploder">`;
        };

        /**
         * waitingForFile - Add listener to file uploader, waiting for upload file
         * @param {function} resolve finish step, pass data to next step.
         */
        let waitingForFile = (resolve) => {
            document.querySelector('#fileUploder')
                    .addEventListener('change',
                        event => {
                            resolve(event.target.files[0]);
                        }
                    );
        };

        /**
         * clearDom - Remove step-class from main button,
         *  Remove file uploader from DOM
         *
         */
        let clearDom = () => {
            button.classList.remove('step_1_button--upload');
            button.innerHTML = '';
        };

        super(
            prepareDOM,
            waitingForFile,
            clearDom
        );
    }

}
