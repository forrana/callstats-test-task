/**
 * iterator - The generator function, calculate end and start coords
 *  for sliding window with defined parameters.
 *
 * @param  {number} frameSize  The size of one frame.
 * @param  {number} bufferSize The size of input data array.
 * @return {object}            The Object, with end and start frame coords
 */
function* iterator(frameSize, bufferSize) {
    let start = 0,
        end = 0;

    while (end < frameSize) {
        end++;
        yield { start, end };
    }

    while (end >= frameSize && end < bufferSize) {
        start++;
        end++;
        yield { start, end };
    }
}

/**
 * frame - The generator function, slice from input array a predefined frame
 * of data.
 *
 * @param  {number} buffer  The input data array.
 * @param  {number} iterator The predefined iterator.
 * @return {object}          The object with slice of input data array
 * and current position
 */
function* frame(buffer, coordsIterator) {
    let coords;

    while (coords = coordsIterator.next().value) {
        yield {
            chunk: buffer.slice(coords.start, coords.end),
            complete: coords.end
        };
    }
}

/**
 * Representing the sliding window concept container.
 * @param  {number[]} buffer    The Array or a piece of Array with processing data.
 * @param  {number} frameSize   The size of sliding window's frame
 * @class SlidingWindow
 */

export default class SlidingWindow {
    constructor(buffer, frameSize) {
        this.frame = frame(
                        buffer,
                        iterator(frameSize, buffer.length)
                     );
    }

    /**
     * nextFrame - just return a new frame
     *
     * @return {number[]}    return a frame of input Buffer with defined size
     */
    nextFrame() {
        return this.frame.next().value;
    }
}
