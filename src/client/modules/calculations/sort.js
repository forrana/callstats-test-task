/**
     * Merges two sublists back together.
     * Shift either left or right onto
     * the result depending on which is
     * lower (assuming both exist), and simply
     * pushes on a list if the other doesn't
     * exist.
     *
     * @param {Array} left The left hand sublist
     * @param {Array} right The right hand sublist
     */
let merge = (left, right) => {
    var result = [],
        leftPosition = 0,
        rightPosition = 0,
        leftLength = left.length,
        rightLength = right.length;

    while ((leftPosition < leftLength) && (rightPosition < rightLength)) {
        if (left[leftPosition] <= right[rightPosition]) {
            result.push(left[leftPosition]);
            leftPosition++;
        } else {
            result.push(right[rightPosition]);
            rightPosition++;
        }
    }

    while (leftPosition < leftLength) {
        result.push(left[leftPosition]);
        leftPosition++;
    }

    while (rightPosition < rightLength) {
        result.push(right[rightPosition]);
        rightPosition++;
    }

    return result;
};

/**
  * Sorts the array by breaking it down
  * into smaller chunks.
  *
  * @param {Array} array The array to sort
  */
let mergeSortFunction = (arr) => {

    if (arr.length < 2) {
        return arr;
    }
    var middle = parseInt(arr.length / 2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle, arr.length);

    return merge(mergeSort(left), mergeSort(right));
};

var heapSortFunction = (function () {
    function heapify(array, index, heapSize) {
        var left = 2 * index + 1,
            right = 2 * index + 2,
            largest = index;

        if (left < heapSize && array[left] > array[index])
            largest = left;

        if (right < heapSize && array[right] > array[largest])
            largest = right;

        if (largest !== index) {
            var temp = array[index];
            array[index] = array[largest];
            array[largest] = temp;
            heapify(array, largest, heapSize);
        }
    }

    function buildMaxHeap(array) {
        for (var i = Math.floor(array.length / 2); i >= 0; i -= 1) {
            heapify(array, i, array.length);
        }
        return array;
    }

    return function (array) {
        var size = array.length,
            temp;
        buildMaxHeap(array);
        for (var i = array.length - 1; i > 0; i -= 1) {
            temp = array[0];
            array[0] = array[i];
            array[i] = temp;
            size -= 1;
            heapify(array, 0, size);
        }
        return array;
    };
}());

let mergeSort1Function = (function () {
    function merger(array, start, end) {
        if (Math.abs(end - start) <= 1) {
            return [];
        }
        var middle = Math.ceil((start + end) / 2);

        merger(array, start, middle);
        merger(array, middle, end);

        return merge(array, start, middle, end);
    }

    function merge(array, start, middle, end) {
        var left = [],
            right = [],
            leftSize = middle - start,
            rightSize = end - middle,
            maxSize = Math.max(leftSize, rightSize),
            size = end - start,
            i;

        for (i = 0; i < maxSize; i += 1) {
            if (i < leftSize) {
                left[i] = array[start + i];
            }
            if (i < rightSize) {
                right[i] = array[middle + i];
            }
        }
        i = 0;
        while (i < size) {
            if (left.length && right.length) {
                if (left[0] >= right[0]) {
                    array[start + i] = right.shift();
                } else {
                    array[start + i] = left.shift();
                }
            } else if (left.length) {
                array[start + i] = left.shift();
            } else {
                array[start + i] = right.shift();
            }
            i += 1;
        }
        return array;
    }
    return function (array) {
        return merger(array, 0, array.length);
    }

}());

export const defaultSort = array => array.sort((a,b) => a - b);
export const mergeSort1 = mergeSort1Function;
export const heapSort = heapSortFunction;
export const mergeSort = mergeSortFunction;

export default {
    defaultSort,
    mergeSort1,
    heapSort,
    mergeSort
}
