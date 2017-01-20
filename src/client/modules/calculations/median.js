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
        sorted = math.sort(values);
        return (sorted.length % 2) ? sorted[middle - 1] :
                (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2;
    }
}
