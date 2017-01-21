import Step from 'step';

export default class Step2 extends Step {
    constructor(data) {

        let button = document.querySelector('.button'),
            onClickFunction,
            onKeyEnterClickFunction;

        let prepareDOM = () => {
            button.classList.add('step2_button');
            button.innerHTML = 'Start';
        }

        let waitingForStart = (resolve) => {
            onClickFunction = () => resolve(data);
            button.addEventListener('click', onClickFunction);

            onKeyEnterClickFunction = (event) => {
                event.keyCode === 13 && onClickFunction(event);
            }

            window.addEventListener('keypress', onKeyEnterClickFunction);
        }

        let clearDom = () => {
            button.innerHTML = '';
            button.classList.remove('step2_button');
            button.removeEventListener('click', onClickFunction);
            window.removeEventListener('keypress', onKeyEnterClickFunction);
        }

        super(
            prepareDOM,
            waitingForStart,
            clearDom
        );
    }
}
