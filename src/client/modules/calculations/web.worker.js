import DataProcessor from 'dataProcessor';

onmessage = function messageHandler(event) {
    if(event.data) {
        let dataProcessor = new DataProcessor(
                                    event.data.array,
                                    event.data.size
                                ),
            processedData = dataProcessor.process();

        let blob = new Blob([processedData.join('\r\n')], {type: 'text/csv'});

        postMessage({
          id: '',
          file: blob
        });

        close();
    } else {
        postMessage('error');
    }
};
