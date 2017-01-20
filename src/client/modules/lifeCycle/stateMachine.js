import Step0 from 'step0';
import Step1 from 'step1';
import Step2 from 'step2';
import Step3 from 'step3';

export default class StateMachine{
    constructor() {

    }

    start() {
        let step0 = new Step0();

        step0.fire().then(
            result => {
                let step1 = new Step1(result);

                step1.fire().then(
                    result => {
                        let step2 = new Step2(result);

                        step2.fire().then(
                            result => {
                                let step3 = new Step3(result);

                                step3.fire();
                            }
                        )
                    }
                )
            }
        )
    }
}
