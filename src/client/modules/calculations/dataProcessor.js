import Median from './median';
import SlidingWindow from './slidingWindow';

export default class dataProcessor {
    constructor(buffer, frameSize) {
        this.slidingWindow = new SlidingWindow(buffer, frameSize);
        this.resultArray = [];
    }

    process() {
        let frame;

        if (frame = this.slidingWindow.nextFrame()) {
            let result = Median.median_2(frame.chunk);
            if(!Number.isNaN(result)) {
                this.resultArray.push(result)
            } else {
                throw 'Calculation error';
            }
            return frame.complete;
        }

        return this.resultArray;
    }
}
