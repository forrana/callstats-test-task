import Step0 from 'step0';
import Step1 from 'step1';
import Step2 from 'step2';
import Step3 from 'step3';
import Step4 from 'step4';

export default class StateMachine{
    constructor() {
        this.steps = [
            Step0, // Initial state with upload button
            Step1, // Frame size input
            Step2, // Just Start button
            Step3, // Processing data step
            Step4  // Finish step
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
            try {
                currentResult = await this.instantiate(this.steps.shift(), prevResult);
            } catch (err) {
                console.error(err);
                break;
            }
            prevResult = currentResult;
        }

        return currentResult;
    }
}
