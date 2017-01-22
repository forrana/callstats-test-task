import Step from 'step';
import utils from 'utils';

/**
 * Representing the input frame size step. Initialize DOM,
 * waiting for approving calculated frame size.
 * @class StepInputFrameSize
 * @extends Step
 */
export default class StepInputFrameSize extends Step {

    /**
     * constructor - create start processing step
     * @constructor
     */
    constructor(data) {
        let button = document.querySelector('.button'),
            onKeyEnterClickFunction;

        /**
         * prepareDOM - Add input with pre detected frame size,
         *  Add proceed button to DOM
         *
         */
        let prepareDOM = () => {
            button.innerHTML = `
                <input type="number"
                        placeholder="Enter size, press Enter"
                        alt="Enter size, press Enter"
                        id="step_1_input__frame-size"
                        step="1"
                        value=${utils.detectFrameSize(data.size)}
                        autofocus
                        >
                <button type="button" role="button" class="step_1_button__proceed">
                    PROCEED
                </button>
            `;
        };

        /**
         * waitingForApprove - Add listener to button and window, waiting for upprove
         * @param {function} resolve finish step, pass data to next step.
         */
        let waitingForApprove = (resolve) => {

            let onClickFunction = () => {
                let input = document.querySelector('#step_1_input__frame-size');

                input.value && resolve({ frameSize: input.value, file: data });
            };

            onKeyEnterClickFunction = (event) => {
                event.keyCode === 13 && onClickFunction(event);
            };

            document.querySelector('.step_1_button__proceed').addEventListener('click', onClickFunction);
            window.addEventListener('keypress', onKeyEnterClickFunction);
        };

        /**
         * clearDom - Remove all elements from innerHTML,
         *  Remove event listener from window
         *
         */
        let clearDom = () => {
            button.innerHTML = '';
            window.removeEventListener('keypress', onKeyEnterClickFunction);
        };

        super(
            prepareDOM,
            waitingForApprove,
            clearDom
        );
    }
}
