import Step from 'step';

export default class Step1 extends Step {
    constructor(data) {
        let button = document.querySelector('.button'),
            onClickFunction;

        let prepareDOM = () => {
            button.classList.add('button_start');
            button.innerHTML = 'Start';
        }

        let waitingForStart = (resolve) => {
            onClickFunction = () => resolve(data);
            button.addEventListener('click', onClickFunction);
        }

        let clearDom = () => {
            button.innerHTML = '';
            button.classList.remove('button_start');
            button.removeEventListener('click', onClickFunction);
        }

        super(
            prepareDOM,
            waitingForStart,
            clearDom
        );
    }
}
