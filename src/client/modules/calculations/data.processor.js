import median2 from './median';
import SlidingWindow from './sliding.window';

/**
 * Representing a data processing class.
 * @param  {number[]} buffer    A Array or a piece of Array with processing data.
 * @param  {number} frameSize A size of sliding window's frame
 * @class dataProcessor
 */
export default class dataProcessor {
    constructor(buffer, frameSize) {
        this.slidingWindow = new SlidingWindow(buffer, frameSize);
        this.resultArray = [];
    }

    /**
     * process - start data processing
     *
     * @return {number|number[]}  current position or processed data array
     */
    process() {
        let frame;

        if (frame = this.slidingWindow.nextFrame()) {
            let result = median2(frame.chunk);

            if (!Number.isNaN(result)) {
                this.resultArray.push(result)
            } else {
                throw new Error('Calculation error');
            }
            return frame.complete;
        }

        return this.resultArray;
    }

    /**
     * getMedian - return calculated median array
     *
     * @return {number[]}  processed data array
     */
    getMedian() {
        let frame;

        while (frame = this.slidingWindow.nextFrame()) {
            let result = median2(frame.chunk);

            if (!Number.isNaN(result)) {
                this.resultArray.push(result)
            } else {
                throw new Error('Calculation error');
            }
        }

        return this.resultArray;
    }
}
