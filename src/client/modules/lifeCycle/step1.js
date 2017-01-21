import Step from 'step';

export default class Step1 extends Step {
    constructor(data) {
        let button = document.querySelector('.button'),
            onClickFunction,
            input,
            frameSize;

        let detectFrameSize = (size) => {
            let expectedSize,
                numberLength = size.toString().length;

            if(numberLength > 2) {
                expectedSize = +`10e${numberLength - 3}`;
            } else {
                expectedSize = 3;
            }

            return expectedSize;
        }

        let prepareDOM = () => {
            button.innerHTML = `
                <input type="number"
                        placeholder="Enter size, press Enter"
                        alt="Enter size, press Enter"
                        id="frameSize"
                        step="1"
                        value=${detectFrameSize(data.size)}
                        autofocus
                        >
            `
        }

        let waitingForStart = (resolve) => {
            input = document.querySelector('#frameSize');

            onClickFunction = (event) => {
                let key = event.which || event.keyCode;
                if (key === 13 && input.value) {
                    resolve({
                        frameSize: input.value,
                        file: data
                    });
                }
            }

            window.addEventListener('keypress', onClickFunction);
        }

        let clearDom = () => {
            button.innerHTML = '';
            window.removeEventListener('click', onClickFunction);
        }

        super(
            prepareDOM,
            waitingForStart,
            clearDom
        );
    }
}
