import Median from './median';
import SlidingWindow from './slidingWindow';

export default class dataProcessor {
    constructor(buffer, frameSize) {
        this.slidingWindow = new SlidingWindow(buffer, frameSize);
        this.resultArray = [];
    }

    process() {
        let frame;

        while(frame = this.slidingWindow.nextFrame())
            this.resultArray.push(
               Median.median_1(frame)
            )
            
        return this.resultArray;
    }
}
