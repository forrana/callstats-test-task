import Step from 'step';

export default class Step1 extends Step {
    constructor(file) {
        let button = document.querySelector('.button'),
            onClickFunction,
            resultLink = document.querySelector('#resultLink');

        let prepareDOM = () => {
            resultLink.download = 'results.csv';
            resultLink.href = window.URL.createObjectURL(file);
            button.classList.add('button_download');
            button.classList.add('pulse');
        }

        let endStep = (resolve) => {
            resolve(false);
        }

        super(
            prepareDOM,
            endStep
        );
    }
}
