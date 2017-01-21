import Step from 'step';

export default class Step4 extends Step {
    constructor(file) {
        let button = document.querySelector('.button');

        let prepareDOM = () => {
            let timer = document.querySelector('#timer');

            button.classList.add('step4_button');
            button.classList.add('pulse');
            timer.removeAttribute('id');
            timer.classList.add('step_4_timer');

            button.insertAdjacentHTML('afterbegin',
            `
                <button type="button" role="button" class="step_4_button__return">
                    Upload another
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
                    Download
                </a>
            `
            );
        }

        let finalize = (resolve) => {
            let onClickFunction = () => {
                setTimeout(
                    () => resolve(true),
                    100
                )
            }
            document.querySelector('.step_4_button__return')
                    .addEventListener('click', onClickFunction);
        }

        let clearDom = () => {
            button.classList.remove('step4_button');
            button.classList.remove('pulse');
            button.innerHTML = '';
        }

        super(
            prepareDOM,
            finalize,
            clearDom
        );
    }
}
