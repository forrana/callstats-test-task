export default class Step {
    constructor(
        beforeFunction = () => true,
        actionFunction = () => true,
        afterFunction = () => true,
        inputParams
    ) {
        this.beforeAction = beforeFunction;
        this.actionPromise = new Promise(actionFunction);
        this.afterAction = afterFunction;
    }

    fire() {
        this.beforeAction();

        return this.actionPromise
                .then(
                    result => {
                        this.afterAction();
                        return result;
                    }
                )
                .catch(
                    error => this.error(error)
                )
    }

    error(error) {
        throw `error: ${error}`
    }
}
