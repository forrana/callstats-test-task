import {mergeSort, heapSort, mergeSort1} from '../sort.js';


describe('Calculations.General', function () {

    describe('Sort methods', function () {
        var testArray = [1, 9, 4, 5, 3, 2],
            expectedArray = [1, 2, 3, 4, 5, 9];

        describe('mergeSort', function () {
            it('Should sort array in ascend order', function () {
                expect(mergeSort(testArray)).toEqual(expectedArray);
            });
        });
        describe('mergeSort1', function () {
            it('Should sort array in ascend order', function () {
                expect(mergeSort1(testArray)).toEqual(expectedArray);
            });
        });
        describe('heapSort', function () {
            it('Should sort array in ascend order', function () {
                expect(heapSort(testArray)).toEqual(expectedArray);
            });
        });

    });
});
