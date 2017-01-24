import sort from './sort';

let median = array => {
    let middle;

    if (array.length <= 1) {
        return -1;
    }

    middle = (array.length + 1) / 2;
    array = sort.defaultSort(array);

    return (array.length % 2)
        ? array[middle - 1]
        : (array[middle - 1.5] + array[middle - 0.5]) / 2;
};

export default median;
