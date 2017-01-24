import Step0 from 'step.initial';
import Step1 from 'step.frame-size';
import Step2 from 'step.start-processing';
import Step3 from 'step.processing';
import Step4 from 'step.finish';

/**
 * Represents the heart of our app. Manage steps, handle errors.
 * @class StateMachine
 */
export default class StateMachine{
    constructor() {
        this.steps = [
            Step0, // Initial state with upload button
            Step1, // Frame size input
            Step2, // Just Start button
            Step3, // Processing data step
            Step4  // Finish step
        ];

        this.fireStep = async function (constructor, params) {
                                   let instance = new constructor(params),
                                       result = await instance.fire();

                                   return result;
                                }
    }

    /**
     * start - Start life cycle.
     *
     * @return {boolean}  true - if everything was fine,
     *                    false - if there was something wrong
     */
    async start() {
        let prevResult = null,
            currentResult = null;

        while(this.steps.length > 0) {
            try {
                currentResult = await this.fireStep(this.steps.shift(), prevResult);
            } catch (err) {
                console.error(err);
                break;
            }
            prevResult = currentResult;
        }

        return currentResult;
    }
}
