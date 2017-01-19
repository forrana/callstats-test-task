export default class SlidingWindow {
    constructor(buffer, frameSize) {
        this.frame = frame(
                        buffer,
                        iterator(frameSize, buffer.length)
                     );
    }

    nextFrame() {
        return this.frame.next().value;
    }
}

function* iterator(frameSize, bufferSize) {
    let start = 0,
        end = 0;

    while (end < frameSize) {
        end++;
        yield {start, end}
    }

    while (end >= frameSize && end < bufferSize) {
        start++;
        end++;
        yield {start, end}
    }
}

function* frame(buffer, iterator) {
    let coords,
        array = buffer.slice(0);

    while(coords = iterator.next().value)
        yield array.slice(coords.start, coords.end);
}
