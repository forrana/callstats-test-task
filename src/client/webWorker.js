import DataProcessor from 'dataProcessor';

onmessage = function messageHandler(event) {
    if(event.data) {
        let dataProcessor = new DataProcessor(
                                    event.data.array,
                                    event.data.size
                                ),
            processedData = dataProcessor.process();
        //    var blob = new Blob(byteArrays, {type: contentType});

        postMessage({
          id: '',
          data: processedData
        });

        close();
    } else {
        postMessage('error');
    }
};
