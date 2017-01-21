import Step from 'step';
import utils from 'utils';

export default class Step1 extends Step {
    constructor(data) {
        let button = document.querySelector('.button'),
            onKeyEnterClickFunction;

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
                    Proceed
                </button>
            `
        }

        let waitingForStart = (resolve) => {

            let onClickFunction = (event) => {
                let input = document.querySelector('#step_1_input__frame-size');

                    input.value &&
                    resolve({
                        frameSize: input.value,
                        file: data
                    });
            }

            onKeyEnterClickFunction = (event) => {
                event.keyCode === 13 && onClickFunction(event);
            }

            document.querySelector('.step_1_button__proceed')
                    .addEventListener('click', onClickFunction);

            window.addEventListener('keypress', onKeyEnterClickFunction);
        }

        let clearDom = () => {
            button.innerHTML = '';
            window.removeEventListener('keypress', onKeyEnterClickFunction);
        }

        super(
            prepareDOM,
            waitingForStart,
            clearDom
        );
    }
}
