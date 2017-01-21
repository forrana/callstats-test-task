import Step from 'step';

export default class Step4 extends Step {
    constructor(file) {
        let button = document.querySelector('.button'),
            onClickFunction,
            resultLink = document.querySelector('#resultLink');

        let prepareDOM = () => {
            resultLink.download = 'results.csv';
            resultLink.href = window.URL.createObjectURL(file);
            button.classList.add('step4_button');
            button.classList.add('pulse');
        }

        let endStep = (resolve) => {
            onClickFunction = () => {
                setTimeout(
                    () => resolve(true),
                    100
                )
            }
            resultLink.addEventListener('click', onClickFunction);
        }

        let clearDom = () => {
            button.classList.remove('step4_button');
            button.classList.remove('pulse');
            resultLink.removeEventListener('click', onClickFunction);
            resultLink.removeAttribute('download');
            resultLink.href = '#';
        }

        super(
            prepareDOM,
            endStep,
            clearDom
        );
    }
}
