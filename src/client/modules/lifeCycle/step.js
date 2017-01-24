/**
 * Representing a life cycle's step interface.
 * @param {function} beforeFunction   The function, which fire before action.
 * @param {function} actionFunction   The main async function.
 * @param {function} afterFunction    The function, which fire after action.
 * @param {object} inputParams  The object, which containt additional params.
 * @class Step
 */

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

    /**
     * fire - execute the life cycle's step
     *
     */
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
                );
    }

    /**
     * error - the Error handling function
     *
     * @param  {type} error description
     * @throws <description>
     */
    error(error) {
        throw `error: ${error}`;
    }
}
