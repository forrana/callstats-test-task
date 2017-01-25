import DataProcessor from '../data.processor.js';

describe('Calculations.General', function () {

    describe('Data processor, positive', function () {
        var dataProcessor,
            testArray = [100, 102, 101, 110, 120, 115],
            testFrameSize = 3,
            expectedArray = [-1, 101, 101, 102, 110, 115];


        beforeEach(function () {
            dataProcessor = new DataProcessor(testArray, testFrameSize);
        });

        describe('constructor(buffer, frameSize)', function () {
            it('Create instance with passed parameters', function () {
                expect(dataProcessor.slidingWindow).toBeDefined();
            });
        });

        describe('process()', function () {
            it('First call should return 1 index', function () {
                expect(dataProcessor.process()).toBe(1);
            });

            it('After <Array.length> calls should return expected array', function () {
                let processedData = 0;
                while (!processedData.length) {
                    processedData = dataProcessor.process();
                }
                expect(processedData).toEqual(expectedArray);
            });
        });

        describe('getMedian()', function () {
            it('Should return expected array', function () {
                let processedData = dataProcessor.getMedian();

                expect(processedData).toEqual(expectedArray);
            });
        });
    });

    describe('Data processor, negative', function () {
        var dataProcessor,
            testArray = ['x', 102, 101, 110, 120, 115],
            testFrameSize = 3,
            expectedArray = [-1, 101, 101, 102, 110, 115];


        beforeEach(function () {
            dataProcessor = new DataProcessor(testArray, testFrameSize);
        });

        describe('constructor(buffer, frameSize)', function () {
            it('Create instance with passed parameters', function () {
                expect(dataProcessor.slidingWindow).toBeDefined();
            });
        });

        describe('process()', function () {
            it('First call should throw calculation error', function () {
                expect(function() {
                    let processedData = 0;
                    while (!processedData.length) {
                        processedData = dataProcessor.process();
                    }
                }).toThrow(new Error("Calculation error"));
            });
        });

        describe('getMedian()', function () {
            it('First call should throw calculation error', function () {
                expect(function() {
                    let processedData = dataProcessor.getMedian();
                }).toThrow(new Error("Calculation error"));
            });
        });
    });
});
