import DataProcessor from 'data.processor';

/**
 * messageHandler - Entry point of a data processing WebWorker, contains full life cycle
 *
 * @param  {object} event - generyc JS webworker event, contains passed from window data
 */
self.onmessage = function messageHandler(event) {
    if (event.data) {
        let dataProcessor = new DataProcessor(event.data.array, event.data.size),
            processedData = 0,
            currentProgress = 0,
            percents = 0;

        const STEP = 5,
            ONE_STEP_OF_DATA = event.data.array.length * STEP / 100;

        while (!processedData.length) {
            try {
                processedData = dataProcessor.process();
            } catch (error) {
                postMessage({ id: '', error: error });
            }

            if (processedData - currentProgress > ONE_STEP_OF_DATA) {
                percents += STEP;
                currentProgress += ONE_STEP_OF_DATA;
                postMessage({ id: '', progress: percents });
            }
        }

        let blob = new Blob([processedData.join('\r\n')], { type: 'text/csv' });

        postMessage({ id: '', file: blob });
        close();
    } else {
        postMessage('error');
    }
};
