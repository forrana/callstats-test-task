import Step0 from 'step0';
import Step1 from 'step1';
import Step2 from 'step2';
import Step3 from 'step3';

export default class StateMachine{
    constructor() {
        this.steps = [
            Step0,
            Step1,
            Step2,
            Step3
        ];

        this.instantiate =
            async function (constructor, params) {
                console.log(params);

               let instance = new constructor(params),
                   result = await instance.fire();

               return result;
            }
    }

    async start() {
        let prevResult = null;//await this.instantiate(this.steps.shift());
        let currentResult = null;

        while(this.steps.length > 0) {
            currentResult = await this.instantiate(this.steps.shift(), prevResult);
            prevResult = currentResult;
            console.log(currentResult);
        }
        // let currentStep = this.instantiate(this.steps.shift()),
        //
        // debugger;
        //
        // while(this.steps.length > 0) {
        //     currentStep.fire().then(
        //         result => {
        //             currentStep = this.instantiate(this.steps.shift(), result);
        //         }
        //     )
        // }

        // step0.fire().then(
        //     result => {
        //         let step1 = new Step1(result);
        //
        //         step1.fire().then(
        //             result => {
        //                 let step2 = new Step2(result);
        //
        //                 step2.fire().then(
        //                     result => {
        //                         let step3 = new Step3(result);
        //
        //                         step3.fire();
        //                     }
        //                 )
        //             }
        //         )
        //     }
        // )
    }
}
