import Step from 'step';

export default class Step0 extends Step {
    constructor() {
        let button = document.querySelector('.button');

        let prepareDOM = () => {
            button.className = "button";
            button.innerHTML =
                        `Upload
                        <input type="file" name="file" id="fileUploder">`;
        }

        let waitingForFile = (resolve) => {
            let fileUploader = document.querySelector('#fileUploder');

            fileUploder.addEventListener('change',
                event => {
                    resolve(event.target.files[0])
                }
            )
        }

        let clearDom = () => {
            button.innerHTML = ``;
        }

        super(
            prepareDOM,
            waitingForFile,
            clearDom
        );
    }

}
