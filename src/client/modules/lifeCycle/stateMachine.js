import Step0 from 'step0';
import Step1 from 'step1';
import Step2 from 'step2';
import Step3 from 'step3';
import Step4 from 'step4';

export default class StateMachine{
    constructor() {
        this.steps = [
            Step0,
            Step1,
            Step2,
            Step3,
            Step4
        ];

        this.instantiate = async function (constructor, params) {
                                   let instance = new constructor(params),
                                       result = await instance.fire();

                                   return result;
                                }
    }

    async start() {
        let prevResult = null,
            currentResult = null;

        while(this.steps.length > 0) {
            currentResult = await this.instantiate(this.steps.shift(), prevResult);
            prevResult = currentResult;
        }

        return currentResult;
    }
}
