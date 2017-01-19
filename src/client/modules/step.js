export default class Step {
    constructor(
        inputParams,
        beforeFunction,
        actionFunction,
        afterFunction
    ) {
        this.inputParams = inputParams;
        this.outputParams = '';
        this.beforePromise = new Promise(beforeFunction);
        this.actionPromise = new Promise(actionFunction);
        this.afterPromise = new Promise(afterFunction);
    }

    fire() {
    return
        this.beforePromise()
            .then(
                result => {
                    this.actionPromise()
                        .then(
                            result => {
                                this.afterPromise()
                                    .then(
                                        result => this.outputParams;
                                    )
                                    .catch(
                                        error => this.error(error);
                                    )
                            }
                        )
                        .catch(
                            error => this.error(error);
                        )
                }
            )
            .catch(
                error => this.error(error);
            )
    }

    error(error) {
        throw `error: ${error}`
    }
}
