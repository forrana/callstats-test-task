export default class Step {
    constructor(
        beforeFunction = () => true,
        actionFunction = () => true,
        afterFunction = () => true,
        inputParams
    ) {
        this.beforeAction = beforeFunction;
        this.mainAction = actionFunction;
        this.afterAction = afterFunction;
    }

    fire() {
        this.beforeAction();
        let actionPromise = new Promise(this.mainAction);

        return actionPromise
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
