import Step from 'step';

export default class Step2 extends Step {
    constructor(data) {

        let button = document.querySelector('.button'),
            onClickFunction;

        let prepareDOM = () => {
            button.classList.add('step2_button');
            button.innerHTML = 'Start';
        }

        let waitingForStart = (resolve) => {
            onClickFunction = () => resolve(data);
            button.addEventListener('click', onClickFunction);
        }

        let clearDom = () => {
            button.innerHTML = '';
            button.classList.remove('step2_button');
            button.removeEventListener('click', onClickFunction);
        }

        super(
            prepareDOM,
            waitingForStart,
            clearDom
        );
    }
}
