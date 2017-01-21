export default {
    median_1: array => {
        let values = array.slice(0); // create a copy

        if (values.length <= 1) return -1;

        values.sort((a, b) => a - b);
        return (values[(values.length - 1) >> 1] + values[values.length >> 1]) / 2
    },
    median_2: array => {
        let values = array.slice(0),
            middle;

        if (values.length <= 1) return -1;

        middle = (values.length + 1) / 2,
        values = values.sort((a, b) => a - b);
        return (values.length % 2) ? values[middle - 1] :
                (values[middle - 1.5] + values[middle - 0.5]) / 2;
    }
}
